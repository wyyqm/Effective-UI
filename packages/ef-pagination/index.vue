<template>
  <div class="ef-pagination clearfix">
    <slot></slot>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizeOptions"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
/*
 ** 使用说明：
 ** pagesizeOptions 可选： 分页条数
 ** layout 可选： 分页功能
 ** eg:
 ** <ef-datePicker @sizeChange="sizeChange" @currentChange="currentChange"></ef-datePicker>
 */
export default {
  name: 'ef-pagination',
  inject: ['searchTable'],

  props: {
    /**
     * 必选：当前页码
     */
    currentPage: {
      type: Number,
      default: 10
    },
    /**
     * 必选：当前页条数
     */
    pageSize: {
      type: Number,
      default: 10
    },
    /**
     * 必选：总共多少条
     */
    total: {
      type: Number,
      default: 100
    },
    /**
     * 可选： 分页条数 --> default:[10, 20, 50, 100]
     */
    pagesizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    /**
     * 可选： 分页功能 --> default: 'total, sizes, prev, pager, next, jumper'
     */
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
      /**
       *每页条数变化
       */
      this.$emit('size-change', val)
      this.searchTable.handleSizeChange(val)
    },
    handleCurrentChange(val) {
      /**
       *当前页码改变
       */
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
