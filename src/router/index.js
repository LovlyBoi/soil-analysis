import Vue from 'vue'
import VueRouter from 'vue-router'
import userLogin from '../components/pages/UserLogin'
import fun1 from '../components/pages/Fun1'
import fun2 from '../components/pages/Fun2'
import register from '../components/pages/Register'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect: '/fun1'
    },
    {
      path:'/fun1',
      component: fun1
    },
    {
      path:'/fun2',
      component: fun2
    },
    {
      path:'/login',
      component: userLogin
    },
    {
      path:'/register',
      component: register
    }
  ]
})

// router.beforeEach((to, from, next)=>{
//   console.log(to, from);
//   next()
// })

export default router
