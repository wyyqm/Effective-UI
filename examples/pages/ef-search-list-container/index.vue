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

.el-button-group .el-button.el-button--text:not(:last-child) {
  margin-right: 1em;
}
.el-button-group > .ty-confirm:not(:last-child) .ty-confirm__btn {
  margin-right: 1em !important;
}

.el-button-group .el-button--text:not(:last-child):after,
.el-button-group > .ty-confirm:not(:last-child) .ty-confirm__btn::after {
  display: inline;
  white-space: pre;
  content: ' ';
  color: transparent;

  /* absolute 可以保证按钮的文本结尾，如果有空白，那个空白不占空间 */
  position: absolute;
  margin-right: 0.4em;
  margin-left: 0.4em;

  /* 模拟一条竖线 */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 35%,
    rgba(220, 223, 230, 1) 35%,
    rgba(220, 223, 230, 1) 65%,
    rgba(0, 0, 0, 0) 65%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
