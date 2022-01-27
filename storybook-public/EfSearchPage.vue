<template>
  <ef-search-list-container :searchList="searchTable" initOnMounted>
    <section>
      <ef-search :model="searchForm" @expend="searchTable.expend" @search="searchTable.init(searchForm)">
        <el-form-item label="订单名称：" prop="name">
          <el-input v-model="searchForm.name" clearable />
        </el-form-item>
        <el-form-item prop="searchVal">
          <ef-input v-model="searchForm.searchVal" :options="options"></ef-input>
        </el-form-item>
        <el-form-item label="查询日期：" prop="times">
          <ef-datePicker v-model="searchForm.datetime" :timeFormat="false" :dateType="'datetime'"></ef-datePicker>
        </el-form-item>
        <el-form-item label="查询月：" prop="months">
          <ef-datePicker v-model="searchForm.months" timeFormat :dateType="'month'"></ef-datePicker>
        </el-form-item>
      </ef-search>
      <el-button type="primary"> 新建</el-button>
    </section>

    <main>
      <ef-table-container @sortChange="sort" rowKey="id" :height="500">
        <ef-table-checkbox v-model="selected" @input="selectObj" />
        <el-table-column label="单行文本" prop="orderName"> </el-table-column>
        <el-table-column label="图片列" prop="orderId">
          <template slot-scope="scope">
            <div v-if="scope.row.src">
              <ty-image-preview :src="scope.row.src" style="width: 100px" />
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
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
          <el-button-group>
            <ty-confirm content="确定删除吗?" type="text" btn-text="删除" @confirm="confirm(row)" @cancel="cancel" />
            <el-button type="text" icon="el-icon-video-pause"> 停用 </el-button>
            <el-button type="text" icon="el-icon-edit"> 编辑 </el-button>
          </el-button-group>
        </el-table-column>
      </ef-table-container>
    </main>

    <footer>
      <el-button type="primary">下载</el-button>
      <el-button type="primary" plain> 导出</el-button>
      <ef-pagination> </ef-pagination>
    </footer>
  </ef-search-list-container>
</template>

<script>
import { makeSearchTableData } from '../../examples/utils/common-search-methods'
import EfPagination from '../../examples/components/ef-pagination'
import EfSearch from '../../examples/components/ef-search'
import EfSearchListContainer from '../../examples/pages/ef-search-list-container'
import Mock from 'mockjs'
import EfDatePicker from '../../examples/components/ef-datePicker/index'
import TyImagePreview from '@tuya-fe/ty-image-preview'
import { TySpan, TyTimeSpan } from '@tuya-fe/ty-span'
import EfTableCheckbox from '../../examples/components/ef-table-checkbox/index.vue'
import EfInput from '../../examples/components/ef-selectInput/index'
import EfTableContainer from '../../examples/pages/ef-table-container'
import TyConfirm from '@tuya-fe/ty-confirm'
import '@tuya-fe/ty-confirm/dist/TyConfirm.css'
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
  name: 'searchlist',
  components: {
    EfPagination,
    EfSearch,
    EfSearchListContainer,
    EfInput,
    EfDatePicker,
    EfTableCheckbox,
    TySpan,
    TyImagePreview,
    TyTimeSpan,
    EfTableContainer,
    TyConfirm
  },
  provide() {
    return {
      searchTable: this.searchTable
    }
  },
  data() {
    return {
      searchTable: makeSearchTableData({
        fetchFn: this.init
      }),
      searchForm: {
        startT: 0,
        endT: 0,
        date: '',
        billArea: 'AZ',
        times: [],
        datetime: '',
        months: [],
        name: '123',
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
    // console.log(this.searchTable)
    this.searchTable.init(this.searchForm)
  },
  methods: {
    init(params) {
      params.datetime = params.datetime ? new Date(params.datetime).getTime() : ''
      getData(params).then((res) => {
        this.searchTable.dataList = res.data.content
        this.searchTable.currentPage = res.data.pageIndex
        this.searchTable.total = res.data.total
        this.searchTable.loading = false
        // this.searchTable.dataList.forEach((item) => {
        //   return item.id > 60000000 ? this.selected.push(item) : null
        // })
      })
    },
    disabledBy(value, index, array) {
      return value.id > 34000000
    },
    sort() {},
    selectObj() {},
    cancel() {},
    confirm() {},
    delCur(value) {}
  }
}
</script>
<style scoped></style>
