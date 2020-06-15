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
import Home from '../views/Home.vue'
import Product from '../views/productCenter.vue'
import Solution from '../views/solution.vue'
import NewList from '../views/news-list.vue'
import ShopDetail from '../views/shop-details.vue'
import Download from '../views/download.vue'
import Shop from '../views/shop.vue'

  const routes = [
  { path: '/', redirect: '/Home' },
  { path: '*', redirect: '/Home' },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/Product',
    name: 'Product',
    component: Product,
    meta: {
      title: '产品中心'
    }
  },
  {
    path: '/Solution',
    name: 'Solution',
    component: Solution,
    meta: {
      title: '解决方案'
    }
  },
  {
    path: '/NewList',
    name: 'NewList',
    component: NewList,
    meta: {
      title: '新闻资讯'
    }
  },
  {
    path: '/ShopDetail',
    name: 'ShopDetail',
    component: ShopDetail
  },{
    path: '/Shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/Download',
    name: 'Download',
    component: Download,
    meta: {
      title: '下载'
    }
  },
]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',  //去掉url中的#
  routes
})

router.beforeEach((to,from,next) => {
  let m = function(e) {
    e.preventDefault();
  };
  document.body.style.overflow = ""; //出现滚动条
  document.removeEventListener("touchmove", m, { passive: true });
  next()
})

export default router
