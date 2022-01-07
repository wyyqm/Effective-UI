<template>
  <!-- TODO：重置 搜索 按照 htmlType  form表单事件native事件 -->
  <div class="search">
    <el-form
      :inline="true"
      size="small"
      :model="model"
      ref="searchForm"
      class="searchForm"
      @submit.native.prevent="handleSearch"
      @reset.native.prevent="reset"
    >
      <div>
        <slot></slot>
      </div>
      <div class="searchBtn">
        <el-button type="text" v-if="hasMore" @click.native="toggleExpend"> {{ expend ? '展开' : '收起' }} </el-button>
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

      searchForm: {}
    }
  },
  mounted() {
    this.toggleExpend()
  },

  methods: {
    handleSearch() {
      this.$emit('search', this.model)
    },
    // 展开收起
    toggleExpend() {
      this.expend = !this.expend
      const searchItem = document.querySelectorAll('.el-form-item--small')
      if (searchItem.length > 3) {
        // 搜索条件小于等于三个不展示展开收起
        this.hasMore = true
        searchItem.forEach((ele, i) => {
          if (i > 2 && i < searchItem.length) {
            if (this.expend) {
              ele.setAttribute('style', 'display: none')
            } else {
              ele.setAttribute('style', 'display: inline-block')
            }
          }
        })
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
.search {
  .searchBtn {
    white-space: nowrap;
  }
  .searchForm {
    display: flex;
    justify-content: space-between;
  }
  .el-form {
    text-align: left;
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
