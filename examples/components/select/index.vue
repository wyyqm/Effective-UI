<template>
  <div>
    <h3>选择框、 输入框合集</h3>
    <el-input v-model="input" clearable />
    <el-input placeholder="请输入内容" v-model="input" :disabled="true">
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
<style scoped lang="less"></style>
