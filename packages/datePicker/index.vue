<template>
  <!-- datepicker日期选择器 -->
  <div class="all">
    <h2>常用<b>日期选择器</b>合集</h2>

    <div class="search">
      <div class="search_input">
        <!-- 月度选择器 -->
        <el-form :inline="true" size="small" :model="dateForm">
          <el-form-item label="选择月：">
            <el-date-picker clearable v-model="dateForm.month" type="month" placeholder="选择月"> </el-date-picker>
          </el-form-item>
          <!-- 周期选择器 -->
          <el-form-item label="周期：">
            <el-date-picker
              size="small"
              v-model="dateForm.dateRange"
              type="daterange"
              style="width: 260px"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 不可选日期： -->
          <el-form-item label="不可选日期：">
            <el-date-picker
              size="small"
              v-model="dateForm.disabledDateRange"
              type="daterange"
              style="width: 260px"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 带快捷选项的  -->
          <el-form-item label="带快捷选项：">
            <el-date-picker
              v-model="dateForm.quickRange"
              style="width: 260px"
              size="small"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="quickOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'datePickerUnion',
  data() {
    return {
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
              const now = new Date()
              const MonthFirstDay = new Date(now.getFullYear(), now.getMonth(), 1)
              const MonthNextFirstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1)
              const MonthLastDay = new Date(MonthNextFirstDay - 86400000)
              picker.$emit('pick', [MonthFirstDay, MonthLastDay])
            }
          }
        ]
      },
      dateForm: {
        month: '',
        dateRange: [],
        disabledDateRange: [],
        quickRange: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
