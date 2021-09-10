import axios from 'axios'
import { Message } from 'element-ui';
// import router from '../router/index'


axios.defaults.timeout = 8000;

// 响应拦截器
axios.interceptors.response.use(success => {
  // console.log(success)
  if (success.status && success.status == 200) {
    if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403 || success.data.code == 202) {
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
  // }, error => {
  //   if (error.response.code == 404 || error.response.code == 504) {
  //     Message({
  //       center: true,
  //       message: "哦吼，服务器可能被吃了呢o(╯□╰)o",
  //       type: "error",
  //       duration: 1500
  //     })
  //   }
  //   else if (error.response.code == 403) {
  //     Message({
  //       center: true,
  //       message: "权限不足，请联系管理员",
  //       type: "error",
  //       duration: 1500
  //     })
  //   }
  //   else if (error.response.code == 401) {
  //     Message({
  //       center: true,
  //       message: "还没有登陆哟！",
  //       type: "error",
  //       duration: 1500
  //     })
  //     router.replace('/login')
  //   }
  //   else {
  //     if (error.response.data.message) {
  //       Message({
  //         center: true,
  //         message: error.response.data.message,
  //         type: "error",
  //         duration: 1500
  //       })
  //     }
  //     else {
  //       Message({
  //         center: true,
  //         message: "好像发生了什么不知道的问题呢",
  //         type: "error",
  //         duration: 1500
  //       })
  //     }
  //   }
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

// 登录查询
export function checkUser(userInfo) {
  return axios({
    method: 'POST',
    url: 'http://120.79.189.55:8080/content1-2.0/login',
    data: {
      username: userInfo.username,
      password: userInfo.password,
      rememberMe: userInfo.rememberMe
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
    url: 'http://120.79.189.55:8080/content1-2.0/fun1',
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
    url: 'http://120.79.189.55:8080/content1-2.0/fun2',
    params: {
      mea_Effective_N: MEN,
      mea_Olsen_P: MOP,
      mea_Olsen_K: MOK,
      mea_Organic_matter: MOM,
      cropName: crop,
    }
  })
}
