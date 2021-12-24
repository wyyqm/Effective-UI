import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

export default {
  data() {
    return {}
  },
  mounted() {
    // const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
    // // 滚动高度 = 可视高度-搜索条件高度-（翻页高度+边距+表头）
    // // const clientHeight = document.body.clientHeight
    // this.scrollHeight = this.clientHeight - searchHeight - 125
    // console.log('this.scrollHeight', this.scrollHeight)
    // const that = this
    // 大、小屏幕切换，页面自适应
  },
  methods: {
    makeSearchTableData(options) {
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
          console.log(state)
          ret.total = state.total
          ret.dataList = state.dataList
          ret.currentPage = state.currentPage
        },
        // 展开收起
        expend() {
          // 展开收起的时候 表格高度要自适应可视区域
          const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
          ret.scrollHeight = document.body.clientHeight - searchHeight - 125
        },
        handleSizeChange: (val) => {
          const params = {
            pageSize: val,
            currentPage: ret.currentPage,
            ...ret.formValues
          }

          fetchFn(params, ret.setState)
          // 翻页回到表格顶部

          Vue.nextTick(() => {
            ret.tableRef.bodyWrapper.scrollTop = 0
          })
        },
        handleCurrentChange: (val) => {
          const params = {
            currentPage: val,
            pageSize: ret.pageSize,

            ...ret.formValues
          }

          fetchFn(params, ret.setState)
          // 翻页回到表格顶部
          Vue.nextTick(() => {
            ret.tableRef.bodyWrapper.scrollTop = 0
          })
        },
        handleSearch: (formValues) => {
          ret.formValues = cloneDeep(formValues)
          ret.currentPage = 1
          const params = {
            currentPage: 1,
            pageSize: ret.pageSize,
            ...ret.formValues
          }

          fetchFn(params, ret.setState)
        },
        init: () => {
          const params = {
            currentPage: ret.currentPage,
            pageSize: ret.pageSize,
            ...ret.formValues
          }
          fetchFn(params, ret.setState)
        }
      })

      return ret
    }
  }
}
