import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

export function makeSearchTableData(options) {
  const { fetchFn } = options
  const ret = Vue.observable({
    loading: false,
    dataList: [],
    currentPage: 1,
    total: 0,
    formValues: {},
    pageSize: 10,
    scrollHeight: document.body.clientHeight,
    tableRef: null,
    // 用来汇报ref可不可以获得了
    connect: (ref) => {
      ret.tableRef = ref
    },
    // 用来汇报窗口大小变化
    windowResize: (height) => {
      ret.scrollHeight = height
    },
    setState: (state) => {
      // Object.assign(ret, state)
      ret.currentPage = state.currentPage
      ret.pageSize = state.pageSize
      ret.formValues = state.formValues
    },
    // 展开收起
    expend() {
      // 展开收起的时候 表格高度要自适应可视区域
      const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
      ret.scrollHeight = document.body.clientHeight - searchHeight - 125
    },
    handleSizeChange: (val) => {
      ret.loading = true

      ret.currentPage = 1
      const params = {
        pageSize: val,
        currentPage: ret.currentPage,
        ...ret.formValues
      }

      fetchFn(params, ret.setState(params))
      // 翻页回到表格顶部
      Vue.nextTick(() => {
        ret.tableRef.bodyWrapper.scrollTop = 0
      })
    },
    handleCurrentChange: (val) => {
      ret.loading = true

      const params = {
        currentPage: val,
        pageSize: ret.pageSize,
        ...ret.formValues
      }

      fetchFn(params, ret.setState(params))
      // 翻页回到表格顶部
      Vue.nextTick(() => {
        ret.tableRef.bodyWrapper.scrollTop = 0
      })
    },
    handleSearch: (formValues) => {
      ret.loading = true

      ret.formValues = cloneDeep(formValues)
      ret.currentPage = 1
      const params = {
        currentPage: ret.currentPage,
        pageSize: ret.pageSize,
        ...ret.formValues
      }

      fetchFn(params, ret.setState(params))
    },
    init: () => {
      ret.loading = true
      const params = {
        currentPage: ret.currentPage,
        pageSize: ret.pageSize,
        ...ret.formValues
      }
      fetchFn(params, ret.setState(params))
    }
  })

  return ret
}
