<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- 头部组件 -->
        <header-com></header-com>
      </el-header>
      <el-container>
        <el-aside width="15%">
          <!-- 侧边栏组件 -->
          <side-bar></side-bar>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 展示面板，一级路由 -->
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerCom from "./components/HeaderCom";
import sideBar from "./components/SideBar";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    headerCom,
    sideBar,
  },
};
</script>

<style>
.el-header {
  background-color: #e9eef3;
  color: #222;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #222;
  text-align: center;
}

.el-main {
  margin-top: 3px;
  background-color: whitesmoke;
  color: #222;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
} */
</style>
