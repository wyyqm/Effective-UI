<script>
import { Button } from 'element-ui'
import { dialogAsService } from '@/components/float'
import EfConfirmDialog from './dialog'
import Vue from 'vue'

import Popover from './popover'
import { getTextFromTextVNode } from '@/utils/vnode'
import addListener from '@/utils/addListener'
import { innerProps } from '@/components/confirm/utils'

const dialogService = dialogAsService(EfConfirmDialog)

const innerPropKeys = Object.keys(innerProps)

let PopoverConstructor = Vue.extend(Popover)

export default {
  name: 'ef-confirm',
  props: {
    ...Button.props,
    ...innerProps,
    title: {
      type: String
    },
    dialog: {
      type: Boolean
    }
  },
  data() {
    return {
      instance: null,
    }
  },
  computed: {
    buttonProps() {
      const { dialog, title, ...rest } = this.$props
      return rest
    },
  },
  methods: {
    getInnerProps() {
      const props = {
        content: this.$slots.content,
        reference: this.$refs.reference._isVue ? this.$refs.reference.$el : this.$refs.reference
      }

      for (const key of innerPropKeys) {
        props[key] = this.$props[key]
      }

      return props
    },
    updateInnerProps() {
      const props = this.getInnerProps()
      if (this.instance) {
        for (const key in props) {
          this.$set(this.instance, key, props[key])
        }
      }
    },
    openDialog() {
      const promise = dialogService.summon({}, this.getInnerProps())
      this.instance = dialogService.current
      promise.then(({type}) => {
        this.$emit(type)
        this.instance = null
      })
    },
    openPopover() {
      const instance = new PopoverConstructor({
        propsData: this.getInnerProps(),
        mounted() {
          this.$nextTick(() => {
            instance.innerVisible = true
          })
        }
      })

      const promise = instance.closedPromise()

      promise.then(({ type }) => {
        instance.$destroy()
        this.$emit(type)
        this.instance = null
      })

      instance.$mount()

      this.instance = instance
    },
    open() {
      if (this.dialog) {
        this.openDialog()
      } else {
        this.openPopover()
      }
    },
    renderVnode(vnodes) {
      const child = vnodes[0]

      if (!child.data) {
        child.data = {};
      }

      if (!child.data.on) {
        child.data.on = {}
      }

      child.context = this._self
      child.data.ref = 'reference'

      addListener(child.data.on, 'click', this.open)
      return [child]
    }
  },
  beforeUpdate() {
    this.updateInnerProps()
  },
  render(h) {
    let text = '执行'

    if (this.$slots.default) {
      const maybeText = getTextFromTextVNode(this.$slots.default)
      if (maybeText === false) {
        return this.renderVnode(this.$slots.default)
      } else {
        text = maybeText
      }
    }

    return h(Button, { on: { click: this.open }, props: this.buttonProps, ref: 'reference' }, text)
  },
}
</script>

