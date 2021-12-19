<template>
  <!--
  TODO：支持两个字段
 -->
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
 **  <efInput v-model="searchVal" :options="options"></efInput>
 */
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
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
      this.value.input = ''
      const obj = {
        input: this.value.input,
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
