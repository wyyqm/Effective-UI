<template>
  <div class="ef-pagination clearfix">
    <slot></slot>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
  },

  // 吐出size和page,change的方法，适用于分页状态改变影响到的业务逻辑
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
      this.searchTable.handleSizeChange(val)
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
      this.searchTable.handleCurrentChange(val)
    }
  }
}
</script>
<style lang="less">
.ef-pagination {
  padding: 5px 30px;
  box-sizing: border-box;
  background: #fff;
  z-index: 100;
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #fff;
    border: 1px solid #dcdfe6;
  }
  .clearfix {
    clear: both;
    *zoom: 1;
  }
  .clearfix:after {
    display: block;
    clear: both;
    content: '\0020';
    visibility: hidden;
    height: 0;
  }
}
</style>
