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
  },
  created() {},
  mounted() {
    // this.searchTable.connect(this.bodyWrapper)
    // window.onresize = () => {
    //   return (() => {
    //     const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
    //     const scrollHeight = document.body.clientHeight - searchHeight - 125
    //     this.searchTable.windowResize(scrollHeight)
    //   })()
    // }
    // const searchHeight = document.querySelectorAll('.el-search')[0].offsetHeight
    // const ctHeight = document.body.clientHeight - searchHeight - 60
    // document.querySelectorAll('.search-list')[0].setAttribute('style', `height:${ctHeight}px;overflow-y:auto`)
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
