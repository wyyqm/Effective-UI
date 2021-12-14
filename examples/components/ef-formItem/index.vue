<template>
  <ef-search :model="formData" @search="handleSearch">
    <template v-slot:searchConditon>
      <el-form-item label="订单编号：" prop="id">
        <el-input v-model="formData.id" clearable />
      </el-form-item>
      <el-form-item label="订单地区：" prop="billAreaValue">
        <el-select size="small" placeholder="请选择" v-model="formData.billAreaValue">
          <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="searchVal">
        <ef-input v-model="formData.searchVal" :options="options"></ef-input>
      </el-form-item>
      <el-form-item label="查询月：" prop="months">
        <ef-datePicker v-model="formData.months" :timeFormat="true" :dateType="'month'"></ef-datePicker>
      </el-form-item>
      <el-form-item label="查询日期：" prop="times">
        <ef-datePicker v-model="formData.times" :timeFormat="true" :dateType="'daterange'"></ef-datePicker>
      </el-form-item>
    </template>
    <template slot="handleBtn">
      <el-button type="primary" @click="dialogVisible = true" plain> 批量删除 </el-button>
    </template>
  </ef-search>
</template>
<script>
import EfSearch from '../ef-search/index.vue'
import EfDatePicker from '../ef-datePicker/index'
import EfInput from '../ef-selectInput/index'

export default {
  components: {
    EfSearch,
    EfDatePicker,
    EfInput
  },
  data() {
    return {
      formData: {
        times: [],
        months: [],
        id: '',
        searchVal: {
          input: '',
          key: ''
        },
        billAreaValue: ''
      },
      options: [
        { label: '今天签约吧账号梦', value: 'today' },
        { label: 'ming天', value: 'tomorrow' }
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
      ]
    }
  },
  methods: {
    monthChange(event) {
      console.log(event)
      // this.months = event
    },
    handleSearch(model) {
      // TODO:请求接口
      console.log(model)
    }
  }
}
</script>
<style lang="less"></style>
