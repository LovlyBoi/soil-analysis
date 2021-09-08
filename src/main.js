import Vue from 'vue';
import '../public/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from './router/index'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router: VueRouter,
  render: h => h(App)
});