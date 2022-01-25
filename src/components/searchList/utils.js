export const searchListProvideKey = 'EfSearchListContext'

export const injectSearchListMixin = {
  inject: {
    [searchListProvideKey]: {
      from: searchListProvideKey,
      default: null,
    }
  },
  computed: {
    searchList() {
      return this[searchListProvideKey]?.searchList
    }
  }
}
