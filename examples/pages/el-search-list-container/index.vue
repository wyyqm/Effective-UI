<template>
  <div class="search-list" ref="list">
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
  },
  created() {},
  mounted() {
    this.searchTable.connect(this.bodyWrapper)
    window.onresize = () => {
      return (() => {
        const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
        const scrollHeight = document.body.clientHeight - searchHeight - 125
        this.searchTable.windowResize(scrollHeight)
      })()
    }
  }
}
</script>
<style lang="less">
.search-list {
  .el-table td,
  .el-table th {
    padding: 8px 0;
    color: #666;
  }
  .el-table thead tr th {
    background-color: #f7f7f7;
  }
}
</style>
