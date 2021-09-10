// 简单的 store 模式，代替 Vuex
const store = {
  state: {
    // 当前高亮的元素
    currEl: 1,
    // 用户信息
    userInfo: {
      username: '',
    },
    // 是否已经登录
    isLogin: false
  },
  // 设置高亮元素接口
  setCurrEl(newVal){
    this.state.currEl = newVal
  },
  // 设置登录接口
  setLogin(state){
    this.state.isLogin = state
  },
  // 提交用户信息接口
  setUserInfo(userinfo){
    this.state.userInfo.username = userinfo.username || ""
    // console.log("userInfo: ",this.state.userInfo)
  }
}

export default store


// 1. 按官网照例子写好store.js

// 2. b组件中import store from 'store.js，
//    b组件中的data中写sharedState: store.state
//    （此处必须这样写，如果写成sharedState: store.state.message则不能同步更新），
//    视图写{{ sharedState.message }}

// 3. a组件中引入import store from 'store.js'，
//    a组件中的事件函数中触发更新state中的值：store.setMessageAction('hello world')，
//    b组件中的message将会自动更新
