import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

export default function makeSearchListState(options) {
  const {
    data = [],
    fetchFn,
    currentPage = 1,
    pageSize = 10,
    total = 0,
    initialSearchParams = {},
    loading = false,
  } = options

  let _initialSearchParams = cloneDeep(initialSearchParams)

  function setInitialParams(initialSearchParams) {
    _initialSearchParams = initialSearchParams
  }

  const state = Vue.observable({
    innerCurrentPage: currentPage,
    innerPageSize: pageSize,
    data,
    total,
    loading,
    searchParams: cloneDeep(_initialSearchParams)
  })

  function setState(newState) {
    if (newState.currentPage != null) {
      state.innerCurrentPage = newState.currentPage
    }

    if (newState.pageSize != null) {
      state.innerPageSize = newState.pageSize
    }

    if (Array.isArray(newState.data)) {
      state.data = newState.data
    }

    if (newState.total != null) {
      state.total = newState.total
    }

    if (newState.searchParams != null) {
      state.searchParams = cloneDeep(newState.searchParams)
    }
  }

  async function refresh() {
    try {
      state.loading = true

      const result = await new Promise((resolve, reject) => {
        try {
          const ret = fetchFn({
            pageSize: state.innerPageSize,
            currentPage: state.currentPage,
            total: state.total,
          }, { ...state.searchParams }, resolve, reject)

          // 如果返回的是 promise，则取其结果
          if (typeof ret?.then === 'function') {
            ret.then(resolve, reject)
            return
          }

          // 直接返回了数据，那就使用它
          if (Array.isArray(ret?.data)) {
            resolve(ret)
          }

        } catch (e) {
          reject(e)
        }
      })

      setState(result)

    } finally {
      state.loading = false
    }
  }

  function handleSizeChange(size) {
    if (state.innerPageSize === size) {
      return
    }
    state.innerPageSize = size
    refresh()
  }

  function handleCurrentChange(page) {
    if (state.innerCurrentPage === page) {
      return
    }
    state.innerCurrentPage = page
    refresh()
  }

  function handleSearch(searchParams) {
    state.searchParams = cloneDeep(searchParams)
    state.innerCurrentPage = 1
    refresh()
  }

  function handleReset() {
    state.searchParams = cloneDeep(_initialSearchParams)
    state.innerCurrentPage = 1
    refresh()
    return cloneDeep(_initialSearchParams)
  }

  Object.defineProperties(state, {
    currentPage: {
      get() {
        return state.innerCurrentPage
      },
      set: handleCurrentChange,
    },
    pageSize: {
      get() {
        return state.innerPageSize
      },
      set: handleSizeChange,
    }
  })

  state.init = refresh
  state.refresh = refresh
  state.handleSizeChange = handleSizeChange
  state.handleCurrentChange = handleCurrentChange
  state.handleSearch = handleSearch
  state.handleReset = handleReset
  state.setState = setState
  state.setInitialParams = setInitialParams

  return state
}
