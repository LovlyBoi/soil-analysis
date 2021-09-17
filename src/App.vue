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

import store from "./store/index.js";
import { checkCookie } from "./api/api.js";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    // 尝试 cookie 登录
    async cookieLogin() {
      // console.log("正在 cookie 登录...");
      let res = await checkCookie();
      try {
        if (res.data && res.data.code == "202") {
          console.warn("cookie 登陆失败", res.data);

          return;
        } else if (res.data && res.data.code == "201") {
          store.setLogin(true);
          // store.setUserInfo(this.loginForm);
        }
      } catch (e) {
        console.warn("cookie 登录出错", e);
      }
    },
  },
  components: {
    headerCom,
    sideBar,
  },
  mounted() {
    // 页面挂载时尝试 cookie 登录
    this.cookieLogin();
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
  line-height: 18px;
}

body > .el-container {
  margin-bottom: 40px;
}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
} */
</style>
