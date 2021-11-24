<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="sort"
      :max-height="scrollHeight"
      stripe
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="单行文本" prop="orderName"> </el-table-column>
      <el-table-column label="图片列" prop="orderId">
        <template slot-scope="scope">
          <div v-if="scope.row.src">
            <ty-image-preview :src="scope.row.src" @open="onOpen" @close="onClose" style="width: 160px" />
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <!--远程排序 @sort-change-->
      <el-table-column label="时间列" prop="date" sortable="custom" :formatter="(row) => formatTime(row.date, 'YYYY-MM-DD HH:mm:ss')">
      </el-table-column>
      <el-table-column label="状态列">
        <template slot-scope="scope">
          <span style="color: #f56c6c" v-if="scope.row.status === '0'">未支付</span>
          <span style="color: #67c23a" v-else>已支付</span>
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
          <el-button type="text" @click="editVisible = true">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确认删除这条订单吗？" @onConfirm="delCur(scope.row)">
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editVisible = true">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑可以尝试用抽屉 -->
    <el-drawer title="编辑订单" :visible.sync="editVisible" :direction="'rtl'" :wrapperClosable="false" size="600px">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import TyImagePreview from '@tuya-fe/ty-image-preview'
export default {
  name: 'searchRow',
  components: {
    TyImagePreview
  },
  props: {
    params: {
      type: Object,
      default: () => {}
    },
    height: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollHeight: null,

      multipleSelection: [],
      editVisible: false
    }
  },

  watch: {
    height(newVal) {
      this.scrollHeight = newVal
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
