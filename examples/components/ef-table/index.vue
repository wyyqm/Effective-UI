<template>
  <div>
    <!-- TODO: 1.disabled
               2.点击行选中
               3.性能优化getkey
               4.全选复选+disabled
               5.暴露出一些事件（参考elementUI）
               6.错误处理细化
               7.分页绑定事件？分页如何封装
      -->
    <!-- <ty-selection-logic class="table" v-model="cart" key-by="id" :list="sell"> -->
    <!-- <template slot-scope="{ isSelected, all, toggle }"> -->
    <el-table :data="sell" size="mini" @row-click="toggle($event.id)" stripe row-key="id" :ref="table.ref">
      <Test v-model="selected" />
      <el-table-column label="商品 ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="价格" prop="price" />
    </el-table>
    <div>
      购物车
      <el-tag size="small" v-for="d in cart" :key="d.id" closable @close="cart = cart.filter((v) => v.id !== d.id)">{{ d.name }}</el-tag>
    </div>
    <div>共计 {{ cart.reduce((a, d) => a + d.price, 0) }}</div>
    <!-- </template> -->
    <!-- </ty-selection-logic> -->
    <div class="pagination">
      <el-pagination
        :ref="table.pagination.ref"
        v-bind="table.pagination"
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
import { TySelectionLogic } from '@tuya-fe/ty-logic'
import Test from '../el-test/index'

function searchTable(xxxx, xxx) {}
export default {
  components: {
    TySelectionLogic,
    Test
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
  methods: {
    getData() {}
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
