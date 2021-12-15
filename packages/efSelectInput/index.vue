<template>
  <el-input size="small" :value="value.input" placeholder="请输入" class="input-select-value" @input="handleInput" clearable>
    <el-select :value="value.key" slot="prepend" style="width: 100px" @change="selectChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-input>
</template>
<script>
/*
 ** 使用说明：
 ** searchVal 必选：双向绑定的searchVal是一个对象，默认值 ：
    searchVal: {
        input: '',
        key: ''
      },
 ** options 必选： select的值。
 ** eg:
 **  <ef-input v-model="searchVal" :options="options"></ef-input>
 */
export default {
  name: 'EfSelectInput',
  props: {
    /**
      value： v-model绑定的变量。
      返回一个对象，{
      input: '',
      key: ''
    }
    input为输入框的值=。key为下拉框的值
    */
    value: {
      type: Object,
      default: () => {}
    },
    /**
      options 必选： 传入的下拉框数组。
    */
    options: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    const obj = {
      input: this.value.input,
      key: this.options[0].value
    }
    this.$emit('input', obj)
  },
  methods: {
    handleInput($event) {
      const obj = {
        input: $event,
        key: this.value.key
      }
      this.$emit('input', obj)
    },
    selectChange(key) {
      const obj = {
        input: '',
        key: key
      }
      this.$emit('input', obj)
    }
  }
}
</script>
<style lang="less">
.input-select-value {
  width: 280px;
}
.input-select-value .el-input {
  width: 100px;
}
</style>
