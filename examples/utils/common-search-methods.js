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
    searchHeight: 0,
    tableRef: null,
    // 用来汇报ref可不可以获得了
    connect: (ref) => {
      ret.tableRef = ref
    },
    // 用来汇报窗口大小变化
    // windowResize: (height) => {
    //   ret.searchHeight = height
    // },
    setState: (currentPage, pageSize, formValues) => {
      // Object.assign(ret, state)
      ret.currentPage = currentPage
      ret.pageSize = pageSize
      ret.formValues = formValues
    },
    // 展开收起
    expend() {
      // 展开收起的时候 表格高度要自适应可视区域
      const searchHeight = document.querySelectorAll('.ef-search')[0].offsetHeight
      searchHeight > 50 ? (ret.searchHeight = 1) : (ret.searchHeight = 0)
      return ret.searchHeight
    },
    handleSizeChange: (val) => {
      ret.loading = true
      ret.currentPage = 1
      const params = {
        pageSize: val,
        currentPage: ret.currentPage,
        ...ret.formValues
      }

      const saveParams = {
        currentPage: ret.currentPage,
        pageSize: ret.pageSize,
        formValues: ret.formValues
      }

      fetchFn(params, ret.setState(saveParams))
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
      console.log(params)

      fetchFn(params, ret.setState(ret.currentPage, ret.pageSize, ret.formValues))
      // 翻页回到表格顶部
      Vue.nextTick(() => {
        ret.tableRef.bodyWrapper.scrollTop = 0
      })
    },
    // handleSearch: (formValues) => {
    //   ret.loading = true
    //   ret.formValues = cloneDeep(formValues)
    //   ret.currentPage = 1
    //   const params = {
    //     currentPage: ret.currentPage,
    //     pageSize: ret.pageSize,
    //     ...ret.formValues
    //   }

    //   fetchFn(params, ret.setState(ret.currentPage, ret.pageSize, ret.formValues))
    // },
    init: (formValues) => {
      ret.loading = true
      ret.formValues = cloneDeep(formValues)

      const params = {
        currentPage: ret.currentPage,
        pageSize: ret.pageSize
        // ...ret.formValues
      }
      fetchFn(params, ret.setState(ret.currentPage, ret.pageSize, ret.formValues))
    }
  })

  return ret
}
