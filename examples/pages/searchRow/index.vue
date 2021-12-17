<template>
  <div>
    <ef-search :model="formData" @search="handleSearch">
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
    <Table
      :height="scrollHeight"
      :tableData="tableData"
      :params="searchForm"
      :total="total"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      @tableDataChange="tableDataChange"
    ></Table>
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
// import Pagination from '../../components/pagination/index.vue'
import Table from '../../components/table/index.vue'
import EfSearch from '../../components/ef-search/index.vue'
import EfDatePicker from '../../components/ef-datePicker/index'
import EfInput from '../../components/ef-selectInput/index'
export default {
  name: 'searchRow',
  components: {
    // Pagination,
    EfSearch,
    EfDatePicker,
    EfInput,
    Table
  },
  data() {
    return {
      expend: false,
      hasMore: false,
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
      total: 10,
      currentPage: 1,
      pageSize: 5,
      exportLoading: false,
      delLoading: false,
      dialogVisible: false,
      tableData: [],
      loading: false,
      clientHeight: document.body.clientHeight,
      scrollHeight: document.body.clientHeight
    }
  },

  mounted() {
    this.init()
    this.toggleExpend()
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
  watch: {
    expend() {
      // 展开收起的时候 表格高度要自适应可视区域
      const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
      // 表格滚动高度 = 可视高度-搜索条件高度-（翻页高度+边距+表头）
      this.scrollHeight = this.clientHeight - searchHeight - 125
    }
  },
  methods: {
    init() {
      this.$axios({
        url: '/parameter/query',
        method: 'get',
        params: {
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          ...this.params
        }
      }).then((res) => {
        // this.loading = false
        this.tableData = res.data.data.content
        this.currentPage = res.data.data.pageIndex
        this.total = res.data.data.total
      })
    },
    tableDataChange() {
      this.init()
    },
    // 展开收起
    toggleExpend() {
      this.expend = !this.expend
      const searchItem = document.querySelectorAll('.el-form-item--small')
      if (searchItem.length > 3) {
        // 搜索条件小于等于三个不展示展开收起
        this.hasMore = true
        searchItem.forEach((ele, i) => {
          if (i > 2 && i < searchItem.length) {
            if (this.expend) {
              ele.setAttribute('style', 'display: none')
            } else {
              ele.setAttribute('style', 'display: inline-block')
            }
          }
        })
      }
    },
    // 搜索
    handleSearch() {
      this.init()
      console.log(this.searchForm)
    },
    // 重置
    reset() {},
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
