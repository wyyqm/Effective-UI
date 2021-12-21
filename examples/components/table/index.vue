<template>
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
import moment from 'moment'
import TyImagePreview from '@tuya-fe/ty-image-preview'
import TySpan from '@tuya-fe/ty-span'
import EfTableOperate from '../ef-table-operate/index.vue'
export default {
  name: 'searchRow',
  components: {
    // EfTableOperate,
    TyImagePreview,
    TySpan
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    params: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchForm: {
        date: '',
        billArea: 'AZ',
        times: '',
        id: '',
        searchVal: '',
        searchKey: 'userName'
      },
      currentPage: 1,
      pageSize: 5,
      loading: false,
      // tableData: [],
      multipleSelection: [],
      selectedData: [],
      // currentPage: 1,
      // total: 0,

      // pageSize: 5,
      selected: []
    }
  },

  mounted() {
    const params = {
      // currentPage: this.currentPage,
      // pageSize: this.pageSize,
      ...this.params
    }

    this.init(params)
  },

  methods: {
    init(params) {
      this.loading = true
      // mock.js
      // this.$axios({
      //   url: '/parameter/query',
      //   method: 'get',
      //   params: {
      //     // pageIndex: params.currentPage,
      //     // pageSize: params.pageSize
      //     ...this.params
      //   }
      // }).then((res) => {
      //   this.loading = false

      //   this.tableData = res.data.data.content
      //   this.currentPage = res.data.data.pageIndex
      //   this.total = res.data.data.total
      // })
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
    },
    handleSizeChange(val) {
      const params = {
        pageSize: val,
        ...this.params
      }
      this.$emit('update:pageSize', val)
      this.$emit('tableDataChange')
      this.init(params)
      this.toggleSelection()
      // 翻页回到表格顶部
      this.$nextTick(() => {
        console.log(this.$refs.multipleTable)
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
    },
    handleCurrentChange(val) {
      const params = {
        currentPage: val,
        ...this.params
      }
      this.$emit('update:currentPage', val)
      this.$emit('tableDataChange')

      this.init(params)
      this.toggleSelection()
      // 翻页回到表格顶部
      this.$nextTick(() => {
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      })
    }
  }
}
</script>
<style scoped lang="less"></style>
