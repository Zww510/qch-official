import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import swiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import "./assets/css/iconfont/index.css";
import { Message, MessageBox } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm =  MessageBox

axios.defaults.baseURL = 'http://admin.colorfulyun.cn/api/'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(swiper);

router.beforeEach((to,from,next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.pageYOffset = 0
  next()
});

Vue.filter('dateFormat',function(value) {
  let date = new Date(parseInt(value) * 1000);
      let y = date.getFullYear();
      let m = (date.getMonth() + 1 + '').padStart(2,'');
      let d = (date.getDate() + '').padStart(2,'0');
      let h = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return `${y}-${m}-${d}`
})

Vue.filter('yearDate',function(value) {
  let date = new Date(parseInt(value) * 1000);
  let y = date.getFullYear();
  let m = (date.getMonth() + 1 + '').padStart(2,'');
  return `${y}年${m}月`
})

Vue.filter('dayDate',function(value) {
  let date = new Date(parseInt(value) * 1000);
  let d = (date.getDate() + '').padStart(2,'');
  return `${d}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
