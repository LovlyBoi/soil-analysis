import axios from 'axios'
import { Message } from 'element-ui';
// import router from '../router/index'


axios.defaults.timeout = 8000;
// axios.defaults.baseURL = "http://120.79.189.55:10086/content1-2.0"
axios.defaults.baseURL = "/api"
// axios.defaults.withCredentials = true;

// 响应拦截器
axios.interceptors.response.use(success => {
  // console.log(success)
  // 检查重复值，不需要弹窗
  if (success.config.url == '/checkRepeatUsername' ||
    success.config.url == '/checkRepeatId_card') {
    return success
  }

  if (success.status && success.status == 200) {

    if (success.data.code == 500 ||
      success.data.code == 400 ||
      success.data.code == 403 ||
      success.data.code == 420 ||
      success.data.code == 421 ||
      success.data.code == 422 ||
      success.data.code == 423 ||
      success.data.code == 202) {
      Message({
        center: true,
        message: success.data.msg,
        type: "error",
        duration: 1500
      })
      return success;
    }
    else if (success.data.msg) {
      Message({
        center: true,
        message: success.data.msg,
        type: "success",
        duration: 1500
      })
    }
  }
  return success;
}, error => {
  console.warn(error);
  if (error.message == 'Network Error') {
    Message({
      center: true,
      message: "网络开小差了┭┮﹏┭┮",
      type: "error",
      duration: 1500
    })
  }
  return Promise.reject(error)
})

// 账号密码登录查询 POST
export function checkUser(userInfo) {
  return axios({
    method: 'POST',
    url: '/login',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      rememberMe: userInfo.rememberMe
    }
  })
}

// 注册
export function register(userInfo) {
  return axios({
    method: 'POST',
    url: '/registerUser',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      id_card: userInfo.ID,
      peasantName: userInfo.peasantName
    }
  })
}

// 自动 Cookie 登录查询
export function checkCookie() {
  return axios({
    method: 'POST',
    url: '/login',
    data: {
      isCookieLogin: true
    }
  })
}

// 检查用户名是否重复
export function checkUsernameRepeat(username) {
  return axios({
    method: 'POST',
    url: '/checkRepeatUsername',
    data: {
      username
    }
  })
}

// 检查身份证号是否重复
export function checkID_Card(ID) {
  return axios({
    method: 'POST',
    url: '/checkRepeatId_card',
    data: {
      "id_card": ID
    }
  })
}

// // 登录查询
// export function checkUser(username, password) {
//   return axios({
//     method: 'GET',
//     url: 'http://120.79.189.55:8080/content1-2.0/login',
//     params: {
//       username,
//       password
//     }
//   })
// }

// fun1查询
export function sendJingWei(jing, wei, crop) {
  return axios({
    methods: 'GET',
    url: '/fun1',
    params: {
      longitude: jing,
      latitude: wei,
      cropName: crop
    }
  })
}

// 发送fun2查询
export function sendInfo(MEN, MOP, MOK, MOM, crop) {
  return axios({
    methods: 'GET',
    url: '/fun2',
    params: {
      mea_Effective_N: MEN,
      mea_Olsen_P: MOP,
      mea_Olsen_K: MOK,
      mea_Organic_matter: MOM,
      cropName: crop,
    }
  })
}
