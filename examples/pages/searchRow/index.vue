<template>
  <div>
    <ef-search :model="formData" @search="handleSearch" @expend="expend">
      <template v-slot:searchConditon>
        <el-form-item label="订单编号：" prop="id">
          <el-input v-model="formData.id" clearable />
        </el-form-item>
        <el-form-item label="订单地区：" prop="billAreaValue">
          <el-select size="small" placeholder="请选择" v-model="formData.billAreaValue">
            <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="searchVal">
          <ef-input v-model="formData.searchVal" :options="options"></ef-input>
        </el-form-item>
        <el-form-item label="查询月：" prop="months">
          <ef-datePicker v-model="formData.months" :timeFormat="true" :dateType="'month'"></ef-datePicker>
        </el-form-item>
        <el-form-item label="查询日期：" prop="times">
          <ef-datePicker v-model="formData.times" :timeFormat="true" :dateType="'daterange'"></ef-datePicker>
        </el-form-item>
      </template>
    </ef-search>
    <!-- <Table
      :height="scrollHeight"
      :tableData="tableData"
      :total="totals"
      :pageIndex.sync="pageIndex"
      :pageSize.sync="pageSize"
      @tableDataChange="tableDataChange"
    ></Table> -->
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sort"
        :max-height="height ? height : 500"
        :row-key="getRowKeys"
        stripe
      >
        <el-table-column type="selection" :reserve-selection="true"> </el-table-column>
        <el-table-column label="单行文本" prop="orderName"> </el-table-column>
        <el-table-column label="图片列" prop="orderId">
          <template slot-scope="scope">
            <div v-if="scope.row.src">
              <ty-image-preview :src="scope.row.src" @open="onOpen" @close="onClose" style="width: 100px" />
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <!--远程排序 @sort-change-->
        <el-table-column label="时间列" prop="date" sortable="custom" :formatter="(row) => formatTime(row.date, 'YYYY-MM-DD HH:mm:ss')">
        </el-table-column>
        <el-table-column label="状态列">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">
              <ty-span color="#f56c6c">未支付</ty-span>
            </span>
            <span v-else><ty-span color="#67c23a">已支付</ty-span></span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="多行文本" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="switch" label="开关">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.switch"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template slot-scope="scope">
            <!-- <ef-table-operate>
            <template v-slot:tableOperate> -->
            <el-button type="text">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="确认删除这条订单吗？" @onConfirm="delCur(scope.row)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="确认审核通过吗？" @onConfirm="delCur(scope.row)">
              <el-button slot="reference" type="text">审核</el-button>
            </el-popconfirm>
            <!-- </template>
          </ef-table-operate> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '../../components/pagination/index.vue'
import Table from '../../components/table/index.vue'
import EfSearch from '../../components/ef-search/index.vue'
import EfDatePicker from '../../components/ef-datePicker/index'
import EfInput from '../../components/ef-selectInput/index'
import moment from 'moment'
import TyImagePreview from '@tuya-fe/ty-image-preview'
import TySpan from '@tuya-fe/ty-span'
export default {
  name: 'searchRow',
  components: {
    // Pagination,
    EfSearch,
    EfDatePicker,
    EfInput,
    TySpan,
    TyImagePreview
  },
  data() {
    return {
      hasMore: false,
      height: '',
      formData: {
        times: [],
        months: [],
        id: '',
        searchVal: {
          input: '',
          key: ''
        },
        billAreaValue: ''
      },
      options: [
        { label: '今天签约吧账号梦', value: 'today' },
        { label: 'ming天', value: 'tomorrow' }
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
      totals: 10,
      pageIndex: 1,
      pageSize: 5,
      exportLoading: false,
      delLoading: false,
      dialogVisible: false,
      tableData: [],
      total: 0,
      loading: false,
      clientHeight: document.body.clientHeight,
      scrollHeight: document.body.clientHeight
    }
  },

  mounted() {
    const params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    this.handleSearch(params)
    const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
    // 滚动高度 = 可视高度-搜索条件高度-（翻页高度+边距+表头）
    this.scrollHeight = this.clientHeight - searchHeight - 125
    const that = this
    // 大、小屏幕切换，页面自适应
    window.onresize = () => {
      return (() => {
        const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
        window.clientHeight = document.body.clientHeight
        that.clientHeight = window.clientHeight
        this.scrollHeight = that.clientHeight - searchHeight - 80 - 45
      })()
    }
  },

  methods: {
    handleSearch(params) {
      this.$axios({
        url: '/parameter/query',
        method: 'get',
        params: {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize
          // ...this.params
        }
      }).then((res) => {
        this.loading = false

        this.tableData = res.data.data.content
        this.pageIndex = res.data.data.pageIndex
        this.total = res.data.data.total
      })
    },
    expend() {
      // 展开收起的时候 表格高度要自适应可视区域
      const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
      // 表格滚动高度 = 可视高度-搜索条件高度-（翻页高度+边距+表头）
      console.log(searchHeight)
      this.scrollHeight = this.clientHeight - searchHeight - 145
    },
    // 反选参数
    getRowKeys(row) {
      return row.id
    },

    // 分页选中
    toggleSelection() {
      this.tableData.forEach((item) => {
        this.selectedData.forEach((ele) => {
          if (item.orderId === ele.orderId) {
            this.$refs.multipleTable.toggleRowSelection(item)
          }
        })
      })
    },
    // 当前页选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.selectedData = []
      if (val) {
        val.forEach((row) => {
          if (row) {
            this.selectedData.push(val[0])
          }
        })
      }
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
    },
    onOpen() {
      console.log('open')
    },
    onClose() {
      console.log('close')
    },
    handleSizeChange(val) {
      this.pageSize = val
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }

      this.handleSearch(params)
      this.toggleSelection()
      // 翻页回到表格顶部
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }

      this.handleSearch(params)
      this.toggleSelection()
      // 翻页回到表格顶部
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
    }
  }
}
</script>
