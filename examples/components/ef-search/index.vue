<template>
  <div class="ef-search">
    <el-form
      :inline="true"
      size="small"
      :model="model"
      ref="searchForm"
      class="ef-searchForm"
      @submit.native.prevent="handleSearch"
      @reset.native.prevent="reset"
    >
      <div>
        <slot></slot>
      </div>
      <div class="ef-searchBtn">
        <el-button type="text" v-if="hasMore" @click.native="toggleExpend"> {{ !expend ? '展开' : '收起' }} </el-button>
        <slot name="searchBtn">
          <el-button type="primary" native-type="submit" icon="el-icon-search"> 搜索 </el-button>
          <el-button type="primary" native-type="reset" plain icon="el-icon-refresh-right"> 重置 </el-button>
        </slot>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    model: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  name: 'ef-search',
  data() {
    return {
      expend: false,
      hasMore: false,

      searchForm: {},
      searchHeight: 0
    }
  },
  mounted() {
    this.setHeight()
    window.onresize = () => {
      // 每次窗口变化都重置search高度
      document.querySelectorAll('.searchForm')[0].setAttribute('style', 'height:auto')
      return (() => {
        this.setHeight()
      })()
    }
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.model)
    },
    setHeight() {
      this.searchHeight = document.querySelectorAll('.ef-search')[0].clientHeight
      if (this.searchHeight > 50) {
        this.hasMore = true
        document.querySelectorAll('.ef-searchForm')[0].setAttribute('style', 'height:50px;overflow:hidden')
      } else {
        this.hasMore = false
      }
    },
    // 展开收起
    toggleExpend() {
      this.expend = !this.expend
      if (this.expend) {
        document.querySelectorAll('.ef-searchForm')[0].setAttribute('style', `height:${this.searchHeight}px`)
      } else {
        document.querySelectorAll('.ef-searchForm')[0].setAttribute('style', 'height:50px;overflow:hidden')
      }
      this.$emit('expend', this.expend)
    },
    reset() {
      // console.log(this.$refs.searchForm)
      this.$refs.searchForm.resetFields()
      this.$emit('search', this.model)
    }
  }
}
</script>
<style lang="less" scoped>
.ef-search {
  .ef-searchBtn {
    white-space: nowrap;
  }
  .ef-searchForm {
    display: flex;
    justify-content: space-between;
  }
  .el-form {
    text-align: left;
    padding-right: 10px;
  }
  .el-input {
    width: 180px;
  }
  .input-select-value {
    width: 280px;
  }
  .input-select-value .el-input {
    width: 100px;
  }
  .el-date-editor--month {
    // width: 150px;
  }
  .el-form-item__label {
    padding: 0 5px 0 0;
  }
  .el-button [class*='el-icon-'] + span {
    margin-left: 0px;
  }
  .el-tag.el-tag--info {
    background-color: #ecf5ff;
    border-color: #b3d8ff;
    color: #409eff;
  }
  .el-tag.el-tag--info .el-tag__close {
    color: #409eff;
    background-color: #c5daf3;
    border-color: #b3d8ff;
  }
}
</style>
