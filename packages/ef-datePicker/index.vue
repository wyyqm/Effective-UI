<template>
  <div>
    <el-date-picker
      clearable
      :value="displayValue"
      :type="dateType"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :class="getStyles()"
      @input="timeChange"
      :picker-options="pickerOptions"
      :placeholder="'请选择'"
    >
    </el-date-picker>
  </div>
</template>
<script>
import moment from 'moment'

/*
 ** 使用说明：
 ** timeFormat 必选：true返回时间戳 FALSE返回国际时间
 ** pickerOptions 可选： 可以是快捷日期选择，或者不可选日期设置
 ** dateType: 必选：日期类型。可能是年月日或者range
 ** placeholder: 可选：可以传入，默认显示“请选择”
 ** eg:
 ** <ef-datePicker v-model="times"  :timeFormat="true" :dateType="'daterange'" ></ef-datePicker>
 */
export default {
  name: 'EfDatePicker',
  props: {
    /**
     * 必选：v-model绑定的变量
     */
    value: {
      type: [Array, Date],
      default: () => [],
      required: true
    },
    /**
     * 必选：默认为true返回时间戳 false返回国际时间
     */
    timeFormat: {
      type: Boolean,
      default: true,
      required: true
    },
    /**
     * 非必选：可以是快捷日期选择，或者不可选日期设置
     */
    pickerOptions: {
      type: Object,
      default: () => {},
      required: false
    },

    /**
     * 必选：日期类型。可能是年月日或者周期等，具体参数（可参考elementUI）有：year/month/date/dates/ week/datetimerange/datetime/ daterange/monthrange。但是本组件只针对常用的类型如：year/month/daterange/datetimerange做了格式化处理，其他类型timeFormat请传false，自行转换。
     */
    dateType: {
      type: String,
      default: 'daterange',
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    // 将父组件的值传进来 反格式化转成标准时间显示
    displayValue() {
      if (!this.timeFormat) {
        return this.value
      }
      let formatedTime = []
      switch (this.dateType) {
        case 'month':
          if (this.value) {
            formatedTime = moment(parseInt(this.value[0]))
          }
          return formatedTime
        case 'year':
          if (this.value) {
            console.log(this.value)
            formatedTime = moment(parseInt(this.value[0]))
          }
          return formatedTime
        case 'daterange':
          if (this.value.length > 0) {
            formatedTime[0] = moment(parseInt(this.value[0]))
            formatedTime[1] = moment(parseInt(this.value[1]))
          }
          return formatedTime
        case 'datetimerange':
          if (this.value.length > 0) {
            formatedTime[0] = moment(parseInt(this.value[0]))
            formatedTime[1] = moment(parseInt(this.value[1]))
          }
          if (this.startTime && this.endTime) {
            formatedTime[0] = moment(parseInt(this.startTime))
            formatedTime[1] = moment(parseInt(this.endTime))
          }

          return formatedTime
        default:
          return this.value
      }
    }
  },
  methods: {
    // 样式处理
    getStyles() {
      if (this.dateType === 'datetimerange') {
        return 'long'
      } else if (this.dateType === 'month' || this.dateType === 'year' || this.dateType === 'week') {
        return 'small'
      } else {
        return 'normal'
      }
    },
    // 格式化成时间戳 返给父组件
    formatTime(times) {
      const formatedTime = []
      switch (this.dateType) {
        case 'month':
          if (times) {
            formatedTime[0] = moment(times).subtract(1, 'month').endOf('month').valueOf() + 1000
            formatedTime[1] = moment(times).add(1, 'months').startOf('month').valueOf() - 1000
          }
          return formatedTime
        case 'year':
          if (times) {
            formatedTime[0] = moment(times).startOf('year').valueOf()
            formatedTime[1] = moment(times).endOf('year').valueOf()
          }
          return formatedTime
        case 'daterange':
          if (times) {
            formatedTime[0] = times[0].getTime()
            formatedTime[1] = times[1].getTime()
          }
          return formatedTime
        case 'datetimerange':
          if (times) {
            formatedTime[0] = times[0].getTime()
            formatedTime[1] = times[1].getTime()
          }
          return formatedTime
        default:
          return this.value
      }
    },

    timeChange($event) {
      const times = this.timeFormat ? this.formatTime($event) : $event
      this.$emit('input', times)
    }
  }
}
</script>
<style lang="less" scoped>
.long {
  width: 400px !important;
}
.normal {
  width: 250px !important;
}
.small {
  width: 180px !important;
}
</style>
