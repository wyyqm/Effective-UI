<template>
  <!-- 常用按钮合集 -->
  <div class="search">
    <h2>常用<b>按钮</b>合集</h2>
    <div class="search_input">
      <el-form :inline="true" size="small">
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
          <el-popconfirm
            confirmButtonText="是的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="pink"
            title="请确认是否审批通过？"
            @onConfirm="confirm"
            @onCancel="cancel"
          >
            <el-button slot="reference" type="primary" plain>审批通过</el-button>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'buttonUnion',
  data() {
    return {
      loading: false
    }
  },
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
<style lang="less" scoped></style>
