/*
 * @Author: your name
 * @Date: 2020-05-22 14:16:15
 * @LastEditTime: 2020-06-04 18:18:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wxappf:\Demo\vue-official\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import ShopDetail from '../views/shop-details.vue'


const routes = [
  // { path: '/', redirect: '/' },
  { path: '*', component: () => import('../views/Home.vue'), meta: { title: '七彩虹平板官网-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制' } },
  {
    path: '/', component: () => import('../views/Home.vue'), meta: { title: '七彩虹平板官网-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制' }
  },
  {
    path: '/about', name: 'About', component: () => import('../views/About.vue'), meta: { title: '关于我们-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制' }
  },
  {
    path: '/product', name: 'product', component: () => import('../views/productCenter.vue'), meta: { title: '产品中心-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制', keepAlive: true }
  },
  {
    path: '/Solution', name: 'Solution', component: () => import('../views/solution.vue'), meta: { title: '解决方案-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制' }
  },
  {
    path: '/NewList', name: 'NewList', component: () => import('../views/news-list.vue'), meta: { title: '新闻资讯-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制' }
  },
  { path: '/NewListDetail', component: () => import('../views/new-list-detail.vue') },
  {
    path: '/ShopDetail', name: 'ShopDetail', component: () => import('../views/shop-details.vue')
  },
  {
    path: '/scheme', name: 'scheme', component: () => import('../views/scheme.vue')
  },
  {
    path: '/Shop', name: 'Shop', component: () => import('../views/shop.vue')
  },
  {
    path: '/Download', name: 'Download', component: () => import('../views/download.vue'), meta: { title: '下载-智慧互动课堂-学生教育平板-学习平板行业厂家-电子书包-七彩虹平板定制' }
  }
]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',  //去掉url中的#
  routes
})


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// router.beforeEach((to,from,next) => {
//   let m = function(e) {
//     e.preventDefault();
//   };
//   document.body.style.overflow = ""; //出现滚动条
//   document.removeEventListener("touchmove", m, { passive: true });
//   next()
// })



export default router
