<template>
  <div class="pagination">
    <el-pagination
      @size-change="searchTable.handleSizeChange"
      @current-change="searchTable.handleCurrentChange"
      :current-page="searchTable.currentPage"
      :page-sizes="pagesizeOptions"
      :page-size="searchTable.pageSize"
      :layout="layout"
      :total="searchTable.total"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'ef-pagination',
  inject: ['searchTable'],

  props: {
    pagesizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
.pagination {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 5px 30px;
  box-sizing: border-box;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  width: calc(100% - 220px);
  z-index: 100;
  .el-pagination {
    text-align: right;
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #fff;
    border: 1px solid #dcdfe6;
  }
}
</style>
