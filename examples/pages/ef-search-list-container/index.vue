<template>
  <div class="ef-search-list-container" ref="list">
    <slot></slot>
  </div>
</template>
<script>
export default {
  inject: ['searchTable'],
  props: {
    searchList: {
      type: Object,
      default: () => {},
      required: true
    },
    initOnMounted: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {}
  }
}
</script>
<style lang="less">
.ef-search-list-container {
  .el-table td,
  .el-table th {
    padding: 8px 0;
    color: #666;
  }
  .el-table thead tr th {
    background-color: #f7f7f7;
  }
}
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
