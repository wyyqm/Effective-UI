<script>
import { injectSearchListMixin } from '@/components/searchList/utils'
import { Table as BaseTable, Loading } from 'element-ui'
import normalizeSlots from '@/utils/normalizeSlots'
import debounce from 'lodash/debounce'
import { observeDocumentMutation } from '@/utils/observer'

export default {
  name: 'ef-table',
  mixins: [injectSearchListMixin],
  props: BaseTable.props,
  data() {
    return {
      loadingInstances: [],
      marginHeight: 0
    }
  },
  computed: {
    computedHeight() {
      if (this.height === 'full') {
        return this.marginHeight ? `calc(100% - ${this.marginHeight}px)` : '100%'
      }
      return this.height
    }
  },
  mounted() {
    const updateHeight = () => {
      this.$nextTick(() => {
        const el = this.$refs.innerTable.$el
        const style = window.getComputedStyle(el)
        this.marginHeight = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
      })
    }
    updateHeight()
    const callback = debounce(updateHeight, 50)
    const disconnect = observeDocumentMutation(callback)
    this.$once('hook:beforeDestroy', disconnect)
  },
  methods: Object.keys(BaseTable.methods).reduce((acc, name) => {
    acc[name] = function (...args) {
      return this.$refs.innerTable[name](...args)
    }
    return acc
  }, {}),
  watch: {
    'searchList.loading'(value) {
      while (this.loadingInstances.length > 0) {
        const instance = this.loadingInstances.pop()
        if (instance) {
          instance.close()
        }
      }

      if (value && this.$refs.innerTable?.$el) {
        this.loadingInstances.push(Loading.service({
          target: this.$refs.innerTable.$el
        }))
      }
    }
  },
  render(h) {
    let { data } = this.$props
    const searchList = this.searchList
    const { propsData } = this.$options

    if (searchList) {
      if (propsData.data === undefined) {
        data = searchList.data
      }
    }

    const slots = normalizeSlots(this.$slots, this._self)
    return h(BaseTable, {
      ref: 'innerTable',
      on: this.$listeners,
      props: {
        ...this.$props,
        data,
        height: this.computedHeight
      },
      scopedSlots: this.$scopedSlots,
      attrs: this.$attrs
    }, slots)
  }
}
</script>
