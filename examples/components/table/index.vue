<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="sort"
      stripe
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="订单名称" prop="orderName"> </el-table-column>
      <el-table-column label="订单编号" prop="orderId"> </el-table-column>
      <!--远程排序 @sort-change-->
      <el-table-column
        label="订单时间"
        prop="date"
        sortable="custom"
        :formatter="row => formatTime(row.date, 'YYYY-MM-DD HH:mm:ss')"
      >
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span style="color:#F56C6C" v-if="scope.row.status === '0'"
            >未支付</span
          >
          <span style="color:#67C23A" v-else>已支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="订单地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="handle" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editVisible = true">编辑</el-button>

          <el-popconfirm
            title="确认删除这条订单吗？"
            @onConfirm="delCur(scope.row)"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑可以尝试用抽屉 -->
    <el-drawer
      title="编辑订单"
      :visible.sync="editVisible"
      :direction="'rtl'"
      :wrapperClosable="false"
      size="600px"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'searchRow',
  data() {
    return {
      tableData: [
        {
          date: '1624422008016',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '0',
          address: '上海市普陀区金沙江路 1518 弄'
        },

        {
          date: '1622332005416',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '1',
          address: '上海市普陀区金沙江路 1518 弄'
        },

        {
          date: '1542622008016',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '0',
          address: '上海市普陀区金沙江路 1518 弄'
        },

        {
          date: '1623422008016',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '1',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      editVisible: false
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    delCur(val) {
      console.log(val)
      // to do sth
    },
    formatTime(time) {
      if (time) {
        return moment(Number(time)).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    sort(val) {
      console.log(val)
    }
  }
}
</script>
<style scoped lang="less"></style>
