<template>
  <!-- input输入框 -->
  <div class="all">
    <h2>常用<b>输入框</b>合集</h2>
    <div class="search">
      <div class="search_input">
        <el-form :inline="true" size="small" :model="searchForm">
          <el-form-item label="默认：">
            <el-input v-model="searchForm.id" clearable placeholder="请输入" />
          </el-form-item>
          <el-form-item label="禁用：">
            <el-input placeholder="请输入内容" size="small" v-model="searchForm.input" :disabled="true"> </el-input>
          </el-form-item>
          <el-form-item label="文本框：">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="searchForm.textarea"
              maxlength="1000"
              show-word-limit
              style="width: 200px"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inputUnion',
  data() {
    return {
      searchForm: {
        input: '',
        id: '',
        textarea: ''
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
