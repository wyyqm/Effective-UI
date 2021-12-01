<template>
  <div>
    <div class="search">
      <el-form :inline="true" size="small" :model="searchForm">
        <el-form-item label="订单编号：">
          <el-input v-model="searchForm.id" clearable />
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
          <el-button type="primary" @click="reset" plain icon="el-icon-refresh-right"> 重置 </el-button>
          <el-button type="primary" @click="add" icon="el-icon-plus"> 新建 </el-button>
          <el-button type="primary" @click="educed" :loading="exportLoading" plain icon="el-icon-download"> 导出 </el-button>

          <el-button type="primary" @click="dialogVisible = true" plain> 批量删除 </el-button>
          <el-button type="text" v-if="hasMore" @click="toggleExpend"> {{ expend ? '展开' : '收起' }} </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Table :height="scrollHeight"></Table>
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
export default {
  name: 'searchRow',
  components: {
    // Pagination,
    Table
  },
  data() {
    return {
      expend: false,
      hasMore: false,
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
      loading: false,
      clientHeight: document.body.clientHeight,
      scrollHeight: document.body.clientHeight
    }
  },

  mounted() {
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
    // 展开收起
    toggleExpend() {
      this.expend = !this.expend
      const searchItem = document.querySelectorAll('.el-form-item--small')
      if (searchItem.length > 4) {
        // 搜索条件小于等于三个不展示展开收起
        this.hasMore = true
        searchItem.forEach((ele, i) => {
          if (i > 2 && i < searchItem.length - 1) {
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
