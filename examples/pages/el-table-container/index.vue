<template>
  <div class="table">
    <el-table ref="tableList" :data="searchTable.dataList" tooltip-effect="dark" @sort-change="sort" :max-height="searchTable.scrollHeight" stripe>
      <slot></slot>
    </el-table>
    <ef-pagination></ef-pagination>
  </div>
</template>
<script>
import EfSearch from '../../components/ef-search/index.vue'
import EfDatePicker from '../../components/ef-datePicker/index'
import TyImagePreview from '@tuya-fe/ty-image-preview'
import { TySpan, TyTimeSpan } from '@tuya-fe/ty-span'
import EfTableCheckbox from '../../components/ef-table-checkbox/index.vue'
import EfPagination from '../../components/ef-pagination/index.vue'
import Mock from 'mockjs'
import searchValueMixin from '../../../src/mixins/searchValue-mixin.js'
export default {
  mixins: [searchValueMixin],
  inject: ['searchTable'],
  components: {
    // TySpan,
    // TyTimeSpan,
    // TyImagePreview,
    // EfTableCheckbox,
    EfPagination
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
  },
  methods: {
    delCur(val) {
      console.log(val)
      // to do sth
    },

    sort(val) {
      // console.log(val)
      this.$emit('sortChange', val)
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
<style lang="less"></style>
