<template>
  <div>
    <!-- TODO: 1. 包装器 将table和分页包起来
    当table加载完成汇报给包装器ref绑好了
    然后更新回到顶部的问题
    2.分页绑定的方法太多 用包装器获取到VNode后把绑定的塞进去
    provider？inject？context mixins 上下文获取方法
    pagination单独封装起来 用mixins

    -->
    <asdasd :searchTable="searchTable"> </asdasd>
    <div class="search">
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm">
        <el-form-item label="订单编号：" prop="id">
          <el-input v-model="searchForm.id" clearable />
        </el-form-item>
        <el-form-item label="查询时间：" prop="date">
          <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTable.handleSearch(searchForm)" icon="el-icon-search"> 搜索 </el-button>
          <el-button type="primary" @click="reset" plain icon="el-icon-refresh-right"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="searchTable.dataList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sort"
        :max-height="scrollHeight"
        :row-key="getRowKeys"
        stripe
      >
        <el-table-checkbox v-model="selected" />

        <!-- <el-table-column type="selection" :reserve-selection="true"> </el-table-column> -->
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
            <el-button type="text">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="确认删除这条订单吗？" @onConfirm="delCur(scope.row)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="确认审核通过吗？" @onConfirm="delCur(scope.row)">
              <el-button slot="reference" type="text">审核</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import TyImagePreview from '@tuya-fe/ty-image-preview'
import TySpan from '@tuya-fe/ty-span'
import ElTableCheckbox from '../../components/el-table-checkbox/index.vue'
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import Mock from 'mockjs'

const data = {
  'list|1000': [
    {
      date: '@natural(1523622008016,1542622789016)',
      orderName: '@cword(3,6)',
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      orderId: '@natural(1231231232,9786723424)',
      status: '@integer(0,1)',
      switch: '@boolean()',
      address: '@city(10,20)' + '@cword(10)' + '有限公司'
    }
  ]
}
const result = Mock.mock(data).list
async function getData({ currentPage, pageSize, id }) {
  const index = currentPage
  const size = pageSize
  let filtered = result
  if (id) {
    filtered = result.filter((item) => item.orderName.includes(id))
  }
  const newDataList = index > 1 ? filtered.slice((index - 1) * size, index * size) : filtered.slice(0, index * size)

  await new Promise((resolve) => setTimeout(resolve, 2000))
  return {
    status: 200,
    message: 'success',
    data: {
      pageIndex: index,
      pageSize: size,
      content: newDataList,
      total: filtered.length
    }
  }
}

function makeSearchTableData(options) {
  const { fetchFn } = options
  const ret = Vue.observable({
    loading: false,
    dataList: [],
    currentPage: 1,
    total: 0,
    formValues: {},
    pageSize: 5,
    // 用来汇报ref可不可以获得了
    connect() {},
    setState: (state) => {
      Object.assign(ret, state)
    },
    handleSizeChange: (val) => {
      console.log(`每页 ${val} 条`)
      const params = {
        pageSize: val,
        currentPage: ret.currentPage,
        ...ret.formValues
      }

      fetchFn(params, ret.setState)
      // this.toggleSelection()
      // 翻页回到表格顶部
      Vue.nextTick(() => {
        // this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
    },
    handleCurrentChange: (val) => {
      const params = {
        currentPage: val,
        pageSize: ret.pageSize,

        ...ret.formValues
      }

      fetchFn(params, ret.setState)
      // this.toggleSelection()
      // 翻页回到表格顶部
      Vue.nextTick(() => {
        // this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
    },
    handleSearch: (formValues) => {
      ret.formValues = cloneDeep(formValues)
      ret.currentPage = 1
      const params = {
        currentPage: ret.currentPage,
        pageSize: ret.pageSize,
        ...ret.formValues
      }

      fetchFn(params, ret.setState)
    },
    init: () => {
      const params = {
        currentPage: ret.currentPage,
        pageSize: ret.pageSize,
        ...ret.formValues
      }

      fetchFn(params, ret.setState)
    }
  })

  return ret
}

export default {
  name: 'searchPage',
  components: {
    TyImagePreview,
    TySpan,
    ElTableCheckbox
  },

  data() {
    return {
      searchTable: makeSearchTableData({
        fetchFn: this.init
      }),
      multipleSelection: [],
      selectedData: [],
      searchForm: {
        date: '',
        billArea: 'AZ',
        times: '',
        id: '',
        searchVal: '',
        searchKey: 'userName'
      },
      selected: [],
      clientHeight: document.body.clientHeight,
      scrollHeight: document.body.clientHeight
    }
  },
  mounted() {
    this.searchTable.init()
  },

  methods: {
    init(params, setState) {
      // console.log(params)
      getData(params).then((res) => {
        this.searchTable.dataList = res.data.content
        this.searchTable.total = res.data.total
      })
    },
    // 重置
    reset() {
      this.$refs.searchForm.resetFields()
    },
    // 反选参数
    getRowKeys(row) {
      return row.orderId
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
    }
  }
}
</script>
<style scoped lang="less"></style>
