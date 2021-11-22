<template>
  <div class="all">
    <h1 style="text-align: center; background-color: #f1f5f7">搜索区域元素合集</h1>
    <!-- input输入框 -->
    <div class="search">
      <h2>常用<b>输入框</b>合集</h2>
      <div class="search_input">
        <el-form :inline="true" size="small" :model="searchForm">
          <el-form-item label="默认：">
            <el-input v-model="searchForm.id" clearable placeholder="请输入" />
          </el-form-item>
          <el-form-item label="禁用：">
            <el-input placeholder="请输入内容" size="small" v-model="searchForm.input" :disabled="true"> </el-input>
          </el-form-item>
          <el-form-item label="文本框：">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="searchForm.textarea" maxlength="1000" show-word-limit style="width: 200px"> </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- select下拉框 -->

    <div class="search">
      <h2>常用<b>下拉框</b>合集</h2>
      <div class="search_input">
        <el-form :inline="true" size="small" :model="selectForm">
          <!-- 默认： -->
          <el-form-item label="默认：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.billArea" clearable>
              <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- 禁用： -->
          <el-form-item label="禁用：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.billArea" clearable disabled>
              <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>

          <!-- 可搜索：  -->

          <el-form-item label="可搜索：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.billArea" clearable filterable>
              <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- 多选：  -->
          <el-form-item label="多选：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.multipleOpt" multiple>
              <el-option v-for="status in multipleOpt" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>

          <!-- 分组：  -->

          <el-form-item label="分组：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.options" clearable>
              <el-option-group v-for="group in options" :key="group.value" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- datepicker日期选择器 -->
    <div class="search">
      <h2>常用<b>日期选择器</b>合集</h2>
      <div class="search_input">
        <!-- 月度选择器 -->
        <el-form :inline="true" size="small" :model="dateForm">
          <el-form-item label="选择月：">
            <el-date-picker clearable v-model="dateForm.month" type="month" placeholder="选择月"> </el-date-picker>
          </el-form-item>
          <!-- 周期选择器 -->
          <el-form-item label="周期：">
            <el-date-picker size="small" v-model="dateForm.dateRange" type="daterange" style="width: 260px" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
    <!-- 常用按钮合集 -->
    <div class="search">
      <h2>常用<b>按钮</b>合集</h2>
      <div class="search_input">
        <el-form :inline="true" size="small" :model="dateForm">
          <!-- 搜索 -->
          <el-form-item label="普通：">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <!-- 上传 -->
            <el-button type="primary" plain><i class="el-icon-upload el-icon--right"></i>上传</el-button>
          </el-form-item>
          <!-- 禁止点击 -->
          <el-form-item label="禁用：">
            <el-button type="primary" disabled>主要按钮</el-button>
          </el-form-item>
          <!-- 带loading -->
          <el-form-item label="带loading：">
            <el-button type="primary" :loading="loading" @click="loadingClick">批量同步</el-button>
          </el-form-item>
          <!-- 气泡确认 -->
          <el-form-item label="气泡确认：">
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="confirm" @onCancel="cancel">
              <el-button slot="reference" type="primary">删除</el-button>
            </el-popconfirm>
          </el-form-item>
          <!-- 自定义气泡确认 -->
          <el-form-item label="自定义气泡确认：">
            <el-popconfirm confirmButtonText="是的" cancelButtonText="不用了" icon="el-icon-info" iconColor="pink" title="请确认是否审批通过？" @onConfirm="confirm" @onCancel="cancel">
              <el-button slot="reference" type="primary" plain>审批通过</el-button>
            </el-popconfirm>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        input: '',
        id: '',
        textarea: ''
      },
      loading: false,
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
      ],
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
      selectForm: {
        billArea: 'AZ',
        options: '',
        multipleOpt: ''
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
  },
  created() {},
  methods: {
    loadingClick() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    confirm() {},
    cancel() {}
  }
}
</script>
<style scoped lang="less">
.all {
  h2 {
    margin-bottom: 10px;
    text-align: left;
    b {
      color: rgb(236, 109, 126);
    }
  }
}

.search_input {
  width: 100%;
  text-align: left;
  font-size: 14px;
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
