<template>
  <div class="home">
    <el-button @click="editModel = 1">完全编辑</el-button>
    <el-button @click="editModel = 2">部分编辑</el-button>
    <el-button @click="editModel = 3">完全查看</el-button>
    <JsonForm :form-data="formData" :form-item-arr-config="formItemArrConfig"></JsonForm>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      // 编辑模式: 1.完全编辑 2.部分编辑 3.完全查看
      editModel: 1,
      optType: 2,
      formData: {
        name: '',
        hobby: '',
        sex: 1
      }
    }
  },
  computed: {
    formItemArrConfig() {
      const nameValidator = (rule, value, callback) => {
        if (this.optType === 1) {
          if (value === undefined || value === null || value === '') {
            callback(new Error('请输入姓名!'))
            return
          }
        }
        if (value.length > 3) {
          callback(new Error('姓名不能超过3字符!'))
          return
        }
        callback()
      }
      const compNameMap = new Map()
      if (this.editModel === 1) {
        compNameMap.set('name', 'el-input')
        compNameMap.set('hobby', 'pro-select')
        compNameMap.set('sex', 'pro-select')
      } else if (this.editModel === 2) {
        compNameMap.set('name', 'el-input')
        compNameMap.set('hobby', 'pro-select')
        compNameMap.set('sex', 'CommView')
      } else {
        compNameMap.set('name', 'CommView')
        compNameMap.set('hobby', 'CommView')
        compNameMap.set('sex', 'CommView')
      }
      const sexShowValue = (item, formData) => {
        const itemValue = formData.sex
        const idx = item.cusData.findIndex((item) => item.value === itemValue)
        if (idx >= 0) {
          return item.cusData[idx].label
        }
        return itemValue || ''
      }
      return [
        { prop: 'name', compName: compNameMap.get('name'), label: '姓名', rules: [{ required: true, validator: nameValidator }] },
        {
          prop: 'hobby',
          compName: compNameMap.get('hobby'),
          label: '爱好',
          cusData: [
            { label: '篮球', value: 1 },
            { label: '足球', value: 2 }
          ],
          elCompProps: {
            multiple: true
          }
        },
        {
          prop: 'sex',
          compName: compNameMap.get('sex'),
          label: '性别',
          showValue: sexShowValue,
          cusData: [
            { label: '男', value: 1 },
            { label: '女', value: 2 }
          ],
          elCompProps: {}
        }
      ]
    }
  }
}
</script>
