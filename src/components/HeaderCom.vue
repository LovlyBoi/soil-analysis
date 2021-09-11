<template>
  <div class="wrapper">
    <div v-if="!shareState.isLogin">
      <a
        href="javascript:;"
        id="logina"
        @click="showLogin"
        :class="{
          active: shareState.currEl === -1,
        }"
        >登录</a
      >
      <a
        href="javascript:;"
        id="zhucea"
        @click="showRegister"
        :class="{
          active: shareState.currEl === -2,
        }"
        
        >注册</a
      >
    </div>

    <div v-else class="showHello">
      <a href="javascript:;" style="cursor: auto">你好{{ "，" + username }}</a>

      <h1 style="letter-spacing: 1.5px; transform: scale(1.2)">土壤成分分析</h1>

      <a href="javascript:;" id="exit" @click="exitLogin">退出登录</a>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
export default {
  name: "Header",
  data() {
    return {
      // 引入 store
      shareState: store.state,
    };
  },
  methods: {
    // 登录点击事件
    showLogin() {
      // 修改当前高亮元素
      store.setCurrEl(-1);
      // 跳转到用户登录界面
      this.$router.push("/login").catch((e) => e);
    },

    // 退出登录
    exitLogin() {
      store.setLogin(false);
    },

    // 注册点击事件
    showRegister(){
      // 修改当前高亮元素
      store.setCurrEl(-2);
      // 跳转到用户登录界面
      this.$router.push("/register").catch((e) => e);
    }
  },
  computed: {
    // 用户名
    username() {
      // 优先去本地存储中找名字，没有再去 store 找，再没有返回 “用户”
      return (
        window.localStorage.getItem("username") ||
        this.shareState.userInfo.username ||
        "尊敬的客户"
      );
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

#logina, #zhuce{
  margin: 0 10px;
}

#logina:hover,#zhucea:hover {
  transition: all 150ms;
  color: #409eff;
}

/* 高亮时变蓝色 */
.active {
  color: #409eff;
}

#exit {
  margin-right: 30px;
}

#exit:hover {
  color: #409eff;
  text-decoration: underline;
}

.showHello {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>