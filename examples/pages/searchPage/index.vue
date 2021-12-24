<template>
  <div>
    <!-- TODO: 1. 包装器 将table和分页包起来
    当table加载完成汇报给包装器ref绑好了
    然后更新回到顶部的问题
    2.分页绑定的方法太多 用包装器获取到VNode后把绑定的塞进去
    provider？inject？context mixins 上下文获取方法
    pagination单独封装起来 用mixins

    -->
    <ef-search :model="searchForm" @expend="searchTable.expend" @search="searchTable.handleSearch(searchForm)">
      <template v-slot:searchConditon>
        <el-form-item label="订单名称：" prop="name">
          <el-input v-model="searchForm.name" clearable />
        </el-form-item>
        <el-form-item label="查询月：" prop="months">
          <ef-datePicker v-model="searchForm.months" :timeFormat="true" :dateType="'month'"></ef-datePicker>
        </el-form-item>
        <el-form-item prop="searchVal">
          <ef-input v-model="searchForm.searchVal" :options="options"></ef-input>
        </el-form-item>
        <el-form-item label="查询日期：" prop="times">
          <ef-datePicker v-model="searchForm.times" :timeFormat="true" :dateType="'daterange'"></ef-datePicker>
        </el-form-item>
      </template>
    </ef-search>
    <ef-table-container @sortChange="sort" rowKey="id">
      <ef-table-checkbox v-model="selected" @input="selectObj" :disabledData="disabledData" />
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
      <el-table-column label="时间列" prop="date" sortable="custom">
        <template slot-scope="scope">
          <ty-time-span block :value="scope.row.date" />
        </template>
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
    </ef-table-container>
  </div>
</template>
<script>
import EfSearch from '../../components/ef-search/index.vue'
import EfDatePicker from '../../components/ef-datePicker/index'
import TyImagePreview from '@tuya-fe/ty-image-preview'
import { TySpan, TyTimeSpan } from '@tuya-fe/ty-span'
import EfTableCheckbox from '../../components/ef-table-checkbox/index.vue'
import Mock from 'mockjs'
import searchValueMixin from '../../../src/mixins/searchValue-mixin.js'
import EfTableContainer from '../el-table-container/index.vue'
import EfInput from '../../components/ef-selectInput/index'
const data = {
  'list|1000': [
    {
      id: '@natural(10,99999999)',
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
async function getData({ currentPage, pageSize, name }) {
  const index = currentPage
  const size = pageSize
  let filtered = result
  if (name) {
    filtered = result.filter((item) => item.orderName.includes(name))
  }
  const newDataList = index > 1 ? filtered.slice((index - 1) * size, index * size) : filtered.slice(0, index * size)

  await new Promise((resolve) => setTimeout(resolve, 500))
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

export default {
  mixins: [searchValueMixin],
  name: 'searchPage',
  components: {
    EfSearch,
    EfDatePicker,
    EfTableContainer,
    TyImagePreview,
    TySpan,
    TyTimeSpan,
    EfInput,
    EfTableCheckbox
  },
  provide() {
    return {
      searchTable: this.searchTable
    }
  },
  data() {
    return {
      searchTable: this.makeSearchTableData({
        fetchFn: this.init
      }),
      searchForm: {
        date: '',
        billArea: 'AZ',
        times: [],
        months: [],
        name: '',
        searchVal: {},
        billAreaValue: ''
      },
      options: [
        { label: '合同名称', value: 'contractName' },
        { label: '账单名称', value: 'accountName' }
      ],
      selected: []
    }
  },
  created() {
    this.searchTable.init()
  },

  methods: {
    init(params) {
      // 如果需要对查询参数处理，就对params处理即可
      getData(params).then((res) => {
        this.searchTable.dataList = res.data.content
        this.searchTable.currentPage = res.data.pageIndex
        this.searchTable.total = res.data.total
      })
      console.log(this.searchTable.dataList)
    },
    selectObj() {
      console.log(this.selected)
    },
    delCur(val) {
      console.log(val)
      // to do sth
    },
    disabledData() {
      console.log(this.searchTable.dataList)
      const arr = this.searchTable.dataList.filter((item) => {
        return item.id > 44000000
      })
      return arr
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
