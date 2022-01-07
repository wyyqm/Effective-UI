<template>
  <div class="table">
    <el-table
      ref="tableList"
      :row-key="rowKey"
      :data="searchTable.dataList"
      tooltip-effect="dark"
      @sort-change="sort"
      v-loading="searchTable.loading"
      :max-height="searchTable.scrollHeight"
      stripe
    >
      <slot></slot>
    </el-table>
    <ef-pagination
      @sizeChange="handleSizeChange"
      @pageChange="handleCurrentChange"
      :pagesizeOptions="pagesizeOptions"
      :layout="layout"
    ></ef-pagination>
  </div>
</template>
<script>
import EfPagination from '../../components/ef-pagination/index.vue'
import searchValueMixin from '../../../src/mixins/searchValue-mixin.js'
export default {
  inject: ['searchTable'],
  components: {
    EfPagination
  },
  props: {
    rowKey: {
      type: String,
      value: 'id'
    },
    pagesizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      selected: []
    }
  },
  computed: {
    bodyWrapper() {
      return this.$refs.tableList
    }
  },
  mounted() {
    this.searchTable.connect(this.bodyWrapper)
    window.onresize = () => {
      return (() => {
        const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
        const scrollHeight = document.body.clientHeight - searchHeight - 125
        this.searchTable.windowResize(scrollHeight)
      })()
    }
  },
  methods: {
    sort(val) {
      // console.log(val)
      this.$emit('sortChange', val)
    },
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('pageChange', val)
    }
  }
}
</script>
<style lang="less"></style>
