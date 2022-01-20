<template>
  <el-table
    ref="innerTable"
    :row-key="rowKey"
    :data="searchTable.dataList"
    tooltip-effect="dark"
    @sort-change="sort"
    v-loading="searchTable.loading"
    :height="computedHeight"
    stripe
  >
    <slot></slot>
  </el-table>
</template>
<script>
import debounce from 'lodash/debounce'
import { observeDocumentMutation } from '../../utils/observer'

export default {
  inject: ['searchTable'],
  components: {},
  props: {
    rowKey: {
      type: String,
      value: 'id'
    },
    height: {
      type: String,
      default: 'full'
    }
  },
  data() {
    return {
      selected: [],
      marginHeight: 0
    }
  },
  // computed: {
  //   bodyWrapper() {
  //     return this.$refs.tableList
  //   }
  // },
  computed: {
    computedHeight() {
      if (this.height === 'full') {
        return this.marginHeight ? `calc(100% - ${this.marginHeight}px)` : '100%'
      }
      return this.height
    }
  },
  mounted() {
    this.updateHeight()
    const callback = debounce(this.updateHeight(), 50)
    const disconnect = observeDocumentMutation(callback)
    this.$once('hook:beforeDestroy', disconnect)
  },

  watch: {
    'searchTable.searchHeight'(value) {
      this.updateHeight()
      const callback = debounce(this.updateHeight(), 50)
      const disconnect = observeDocumentMutation(callback)
      this.$once('hook:beforeDestroy', disconnect)
    }
    // 'searchList.loading'(value) {
    //   while (this.loadingInstances.length > 0) {
    //     const instance = this.loadingInstances.pop()
    //     if (instance) {
    //       instance.close()
    //     }
    //   }
    //   if (value && this.$refs.innerTable?.$el) {
    //     this.loadingInstances.push(
    //       Loading.service({
    //         target: this.$refs.innerTable.$el
    //       })
    //     )
    //   }
    // }
  },
  methods: {
    updateHeight() {
      this.$nextTick(() => {
        const el = this.$refs.innerTable.$el
        const style = window.getComputedStyle(el)
        const scrollHeight = this.searchTable.expend()
        this.marginHeight = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10) + scrollHeight
      })
    },
    sort(val) {
      // console.log(val)
      this.$emit('sortChange', val)
    }
  }
}
</script>
<style lang="less"></style>
