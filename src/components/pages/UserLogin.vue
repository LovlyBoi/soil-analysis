<template>
  <div class="wrapper">
    <el-form
      v-loading.fullscreen.lock="fullscreenLoading"
      :rules="rules"
      ref="form"
      :model="loginForm"
      label-width="80px"
      class="login-container"
      :disabled="disablebtn"
      label-position="left"
      size="medium"
    >
      <h2 class="title" style="font-weight: 400; letter-spacing: 1.5px">
        系统登录
      </h2>

      <el-form-item label="用户名" prop="username" >
        <el-input v-model.trim="loginForm.username" placeholder="用户名" id="username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model.trim="loginForm.pass"
          autocomplete="off"
          placeholder="密码"
          id="password"
        ></el-input>
      </el-form-item>

      <el-checkbox v-model="remember" style="display: block" class="chkbox" 
        >记住我</el-checkbox
      >

      <el-button type="primary" id="logbtn" @click="submit" :loading="disablebtn">立即登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { checkUser } from "../../api/api.js";
import store from '../../store/index.js'

export default {
  name: "UserLogin",
  data() {
    return {
      loginForm: {
        username: window.localStorage.getItem('username') || "",
        pass: "",
        code: "",
      },
      fullscreenLoading: false,
      remember: false,
      disablebtn: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    async login(userName, passWord) {
      // 开启遮罩层
      this.fullscreenLoading = true
      // 禁用表单
      this.disablebtn = true;
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 10000)
      // api 调用
      let userInfo = {
        username: userName,
        password: passWord,
        rememberMe: this.remember
      }
      let res = await checkUser(userInfo)
      // 关闭遮罩层
      this.fullscreenLoading = false
      this.disablebtn = false;

      // console.log("res-----",res);

      try {
        if (res.data && res.data.code == 202) {
          this.loginForm.pass = ''
        } 
        else if (res.data && res.data.code == 200) {
          // 禁用表单
          this.disablebtn = true;
          // 更改登录信息
          store.setLogin(true)
          // 路由导航到 fun1
          this.$router.replace("/fun1")
          store.setCurrEl(1)
          // 提交用户信息到 store
          store.setUserInfo(this.loginForm)
          // 提交用户信息到 localStorage
          if(window.localStorage){
            let username = this.loginForm.username || ''
            window.localStorage.setItem('username', username)
          }
        }
      } catch (e) {
        this.$message({
          center: true,
          message: "好像哪里出错了呢",
          type: "error",
          duration: 1500,
        });
        // this.loading = false
        console.warn(e);
      }
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disablebtn = true
          // 登录逻辑
          this.login(this.loginForm.username, this.loginForm.pass)
        } else {
          this.$message({
            center: true,
            message: "请完善信息哦",
            type: "error",
            duration: 1500,
          });
          return false
        }
      });
    },
  },
};
</script>

<style scoped>
.wrapper{
  /* background-color: #bfa; */
  margin: 0 auto;
  width: 50%;
}
</style>