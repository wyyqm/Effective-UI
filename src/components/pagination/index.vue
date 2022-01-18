<script>
import { injectSearchListMixin } from '@/components/searchList/utils'
import { Pagination as BasePagination } from 'element-ui'
import normalizeSlots from '@/utils/normalizeSlots'

export default {
  name: 'ef-pagination',
  mixins: [injectSearchListMixin],
  props: BasePagination.props,
  methods: {
    updateCurrentPage(...args) {
      if (this.searchList) {
        this.searchList.handleCurrentChange(...args)
      }
      this.$emit('update:currentPage', ...args)
    },
    updatePageSize(...args) {
      if (this.searchList) {
        this.searchList.handleSizeChange(...args)
      }
      this.$emit('update:pageSize', ...args)
    }
  },
  render(h) {
    let { pageSize, currentPage, total } = this.$props
    const searchList = this.searchList
    const { propsData } = this.$options

    if (searchList) {
      if (propsData.pageSize === undefined) {
        pageSize = searchList.pageSize
      }

      if (propsData.currentPage === undefined) {
        currentPage = searchList.currentPage
      }

      if (propsData.total === undefined) {
        total = searchList.total
      }
    }

    const slots = normalizeSlots(this.$slots, this._self)

    return h('div',
        { class: { 'ef-pagination': true }, },
        [
          h(BasePagination, {
            props: {
              ...this.$props,
              total,
              pageSize,
              currentPage,
            },
            on: {
              ...this.$listeners,
              'update:currentPage': this.updateCurrentPage,
              'update:pageSize': this.updatePageSize,
            }
          }, slots)
        ]
    )
  }
}
</script>

<style>
.ef-pagination {

}
</style>
