<template>
  <div class="ef-search-list-container">
    <slot />
  </div>
</template>
<script>
import { searchListProvideKey } from './utils'

export default {
  name: 'ef-search-list-container',
  props: {
    fetchOnMounted: {
      type: Boolean,
    },
    searchList: {
      type: Object
    }
  },
  computed: {
    provideData() {
      return {
        searchList: this.searchList
      }
    }
  },
  provide() {
    return {
      [searchListProvideKey]: this.provideData
    }
  },
  mounted() {
    if (this.searchList && this.fetchOnMounted) {
      this.searchList.init()
    }
  }
}
</script>

<style>
.ef-search-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ef-search-list-container > section {
  display: flex;
  align-items: flex-start;
}

.ef-search-list-container > main {
  flex-grow: 1;
  overflow: hidden;
}

.ef-search-list-container > footer {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  align-items: center;
}

.ef-search-list-container > footer > .ef-pagination {
  flex-grow: 1;
  text-align: right;
}
</style>
