<template>
  <div class="search">
    <el-form :inline="true" size="small" :model="model" ref="searchForm">
      <slot name="searchConditon"></slot>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" icon="el-icon-search"> 搜索 </el-button>
        <el-button type="primary" @click="reset" plain icon="el-icon-refresh-right"> 重置 </el-button>
        <slot name="handleBtn"></slot>
        <el-button type="text" v-if="hasMore" @click="toggleExpend"> {{ expend ? '展开' : '收起' }} </el-button>
      </el-form-item>
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
      quickOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本周',
            onClick(picker) {
              const now = new Date()
              const WeekFirstDay = new Date(now - (now.getDay() - 1) * 86400000)
              const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000)
              picker.$emit('pick', [WeekFirstDay, WeekLastDay])
            }
          },
          {
            text: '本月',
            onClick(picker) {
              console.log(new Date().getYear())

              const now = new Date()
              const MonthFirstDay = new Date(now.getFullYear(), now.getMonth(), 1)
              const MonthNextFirstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1)
              const MonthLastDay = new Date(MonthNextFirstDay - 86400000)
              picker.$emit('pick', [MonthFirstDay, MonthLastDay])
            }
          }
        ]
      },
      searchForm: {},
      options: [
        { label: '今天签约吧账号梦', value: 'today' },
        { label: 'ming天', value: 'tomorrow' }
      ]
    }
  },
  mounted() {
    this.toggleExpend()
    // this.handleSearch()
    // const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
    // // 滚动高度 = 可视高度-搜索条件高度-（翻页高度+边距+表头）
    // this.scrollHeight = this.clientHeight - searchHeight - 125
    // const that = this
    // // 大、小屏幕切换，页面自适应
    // window.onresize = () => {
    //   return (() => {
    //     const searchHeight = document.querySelectorAll('.search')[0].offsetHeight
    //     window.clientHeight = document.body.clientHeight
    //     that.clientHeight = window.clientHeight
    //     this.scrollHeight = that.clientHeight - searchHeight - 80 - 45
    //   })()
    // }
  },

  methods: {
    handleSearch() {
      // console.log(this.model)
      this.$emit('search', this.model)
    },
    // 展开收起
    toggleExpend() {
      this.expend = !this.expend
      const searchItem = document.querySelectorAll('.el-form-item--small')
      if (searchItem.length > 4) {
        // 搜索条件小于等于三个不展示展开收起
        this.hasMore = true
        searchItem.forEach((ele, i) => {
          if (i > 2 && i < searchItem.length - 1) {
            if (this.expend) {
              ele.setAttribute('style', 'display: none')
            } else {
              ele.setAttribute('style', 'display: inline-block')
            }
          }
        })
      }
    },
    reset() {
      // console.log(this.$refs.searchForm)
      this.$refs.searchForm.resetFields()
      // for (const item in this.searchForm) {
      //   console.log(this.searchForm[item])
      //   // if()
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  display: flex;
  flex-wrap: wrap;
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
