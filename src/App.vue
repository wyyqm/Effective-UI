<template>
  <div id="app">
    <el-container class="main-container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>
<!--            <TestPage />-->
            <EditPage />
          </el-main>
<!--          <el-footer>Footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TestPage from '@/pages/ListPage.vue'
import EditPage from '@/pages/EditPage'

export default {
  name: 'App',
  components: {
    EditPage,
    TestPage
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  height: 100%;
}

.main-container {
  height: 100%;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
