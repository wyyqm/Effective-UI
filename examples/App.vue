<template>
  <div id="app">
    <el-container class="container">
      <el-header class="header">Header</el-header>
      <el-container>
        <el-aside width="220px" class="aside">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>组件</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"> <router-link :to="{ path: '/input' }">搜索条件合集</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>搜索页面</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"> <router-link :to="{ path: '/search' }">search Page</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">搜索页</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.header {
  /* background-color: rgb(218, 241, 154); */
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #ccc;
}
.aside {
  height: 100%;
  /* background-color: #e7d7e3; */
  border-right: 1px solid #ccc;
}
</style>
