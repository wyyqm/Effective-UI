<template>
  <div class="pagination">
    <el-pagination
      @size-change="searchTable.handleSizeChange"
      @current-change="searchTable.handleCurrentChange"
      :current-page="searchTable.currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchTable.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchTable.total"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less"></style>
