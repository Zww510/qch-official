<template>
  <div id="app">
    <Header />
    <div style="width:100%;height:60px"></div>
    <!-- <router-view/> -->
    <!-- 缓存组件跳转的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 非缓存组件跳转页面 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@import "./assets/css/common.css";
@import "./assets/css/style.css";
@import "./assets/css/style1.css";
@import "./assets/css/style2.css";
@import "./assets/css/responsiveslides.css";
#app {
  font-family: "思源黑体";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-textarea__inner {
  box-sizing: border-box !important;
  border: 1px solid #cecece !important;
  border-radius: 3px !important;
  width: 100% !important;
  padding: 10px 5px !important;
  height: 135px !important;
  font-size: 13px !important;
  background: none !important;
}
</style>
