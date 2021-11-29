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
      selectForm: {
        billArea: 'AZ'
      },
      options: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海'
            },
            {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '其他城市',
          options: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      billArea: [
        {
          label: '美国区',
          value: 'AZ'
        },
        {
          label: '中欧区',
          value: 'EU'
        },
        {
          label: '印度区',
          value: 'IN'
        },
        {
          label: '美东区',
          value: 'UE'
        },
        {
          label: '西欧区',
          value: 'WE'
        }
      ],
      multipleOpt: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped></style>
