<template>
  <div>
    <div class="search">
      <el-form :inline="true" size="small" :model="searchForm">
        <el-form-item label="订单编号：">
          <el-input v-model="searchForm.id" clearable />
        </el-form-item>
        <el-form-item label="订单编号：">
          <el-input v-model="searchForm.id" clearable />
        </el-form-item>
        <el-form-item label="订单编号：">
          <el-input v-model="searchForm.id" clearable />
        </el-form-item>
        <el-form-item label="订单编号：">
          <el-input v-model="searchForm.id" clearable />
        </el-form-item>
        <el-form-item label="查询时间：">
          <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
        </el-form-item>
        <el-form-item label="查询时间：">
          <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
        </el-form-item>
        <el-form-item label="查询时间：">
          <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
        </el-form-item>
        <el-form-item label="查询时间：">
          <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            clearable
            v-model="searchForm.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 250px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单地区：">
          <el-select size="small" placeholder="请选择" v-model="searchForm.billArea">
            <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="searchForm.searchVal" placeholder="请输入" class="input-select-value" clearable>
            <el-select v-model="searchForm.searchKey" slot="prepend" style="width: 100px" @change="selectChange">
              <el-option label="签约方账号" value="userName"></el-option>
              <el-option label="合同编号" value="servedId"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search"> 搜索 </el-button>
          <el-button type="primary" @click="handleSearch" plain icon="el-icon-refresh-right"> 重置 </el-button>
          <!-- :disabled="!total" -->
          <el-button type="primary" @click="add" icon="el-icon-plus"> 新建 </el-button>
          <el-button type="primary" @click="educed" :loading="exportLoading" plain icon="el-icon-download"> 导出 </el-button>

          <el-button type="primary" @click="dialogVisible = true" plain> 批量删除 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Table
      :height="scrollHeight"
      :params="params"
      :tableData="tableData"
      :loading="loading"
      :total="total"
      @loadingChange="loadingChange"
      @tableDataChange="tableDataChange"
    ></Table>
    <div>
      <Pagination />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span> <i class="el-icon-warning" style="color: orange; margin-right: 5px"></i>确认批量删除所选内容吗？ </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/pagination/index.vue'
import Table from '../../components/table/index.vue'
export default {
  name: 'searchRow',
  components: {
    Pagination,
    Table
  },
  data() {
    return {
      scrollHeight: 0,
      searchForm: {
        date: '',
        billArea: 'AZ',
        times: '',
        id: '',
        searchVal: '',
        searchKey: 'userName'
      },
      total: 0,
      exportLoading: false,
      delLoading: false,
      dialogVisible: false,
      expend: false,
      tableData: [
        {
          date: '1624422008016',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '0',
          switch: false,
          address: '上海市普陀区金沙江路 1518 弄wwwwwwwww',
          src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },

        {
          date: '1622332005416',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '1',
          switch: false,
          address: '上海市普陀区金沙江路 1518 弄erewr东风二二',
          src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },

        {
          date: '1542622008016',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '0',
          switch: true,
          address: '上海市普陀区金沙江路 1518 弄搜房网二辅导费都发给我而为',
          src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },

        {
          date: '1623422008016',
          orderName: '王小虎',
          orderId: 'FW123456789',
          status: '1',
          switch: true,
          address: '上海市普陀区金沙江路 1518 弄的烦都烦死范围'
        }
      ],
      billArea: [
        {
          label: '美国区',
          value: 'AZ'
        },
        {
          label: '中欧区',
          value: 'EU'
        },
        {
          label: '印度区',
          value: 'IN'
        },
        {
          label: '美东区',
          value: 'UE'
        },
        {
          label: '西欧区',
          value: 'WE'
        }
      ],
      loading: false
    }
  },

  mounted() {
    const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
    // console.log(searchHeight)

    this.scrollHeight = document.body.clientHeight - searchHeight - 80 - 45

    // window.onresize = () => {
    //   return (() => {
    //     console.log(this.scrollHeight, searchHeight)
    //   })()

    // this.scrollHeight = document.body.clientHeight - searchHeight - 130 - 45
    // }
  },
  methods: {
    // 搜索
    handleSearch() {
      console.log(this.searchForm)
    },
    // 搜索条件change
    selectChange() {
      this.searchForm.searchVal = ''
    },
    loadingChange(val) {
      this.loading = val
    },
    billDataChange(val) {
      this.billData = val
    },
    // 新建
    add() {},
    // 导出
    educed() {
      this.exportLoading = true
      setTimeout(() => {
        this.exportLoading = false
      }, 2000)
    },
    confirm() {}
  }
}
</script>
