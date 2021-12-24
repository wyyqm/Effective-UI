<template>
  <div>
    <!-- TODO: 1.disabled
               2.点击行选中
               3.性能优化getkey
               4.全选复选+disabled
               5.暴露出一些事件（参考elementUI）
               6.错误处理细化
      -->
    <el-table :data="sell" size="mini" stripe row-key="id" @row-click="onRowClick">
      <ef-table-checkbox v-model="selected" disabledKey="disabled" @selectChange="selectChange" @allSelectChange="allSelectChange" />
      <el-table-column label="商品 ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="价格" prop="price" />
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import EfTableCheckbox from '../ef-table-checkbox/index'

function searchTable(xxxx, xxx) {}
export default {
  components: {
    EfTableCheckbox
  },
  data() {
    return {
      selected: [],
      pageSize: 5,
      currentPage: 1,
      total: 10,
      cart: [],
      sell: [
        { id: 1, name: '空调', price: 1400 },
        { id: 2, name: '冰箱', price: 2000 },
        { id: 3, name: '洗衣机', price: 900 },
        { id: 4, name: '电视', price: 1200 }
      ]
    }
  },
  computed: {
    table() {
      return searchTable({
        fetchFn: this.getData
      })
    }
  },
  created() {
    for (let i = 5; i < 1000; i++) {
      this.sell.push({ id: i, name: '空调', price: Math.ceil(Math.random() * 2000) })
    }
  },
  methods: {
    getData() {},
    disabled() {},
    selectChange(row) {
      // console.log(this.selected)
    },
    allSelectChange() {
      // console.log(this.selected)
    },
    onRowClick(row) {
      const isSelected = !!this.selected.find((item) => item.id === row.id)
      if (isSelected) {
        this.selected = this.selected.filter((item) => item.id !== row.id)
      } else if (!row.disabled) {
        this.selected.push(row)
      }
    },
    disabledData() {
      const arr = this.sell.filter((item) => {
        return item.price > 1800
      })
      return arr
    }
  }
}
</script>
<style scoped lang="less">
.table {
  .el-table td,
  .el-table th {
    padding: 8px 0;
    color: #666;
  }
  .el-table thead tr th {
    background-color: #f7f7f7;
  }
}
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
