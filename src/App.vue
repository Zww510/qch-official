<template>
  <div id="app">
    <Header/>
    <div style="width:100%;height:60px"></div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import "./assets/css/common.css";
@import "./assets/css/style.css";
@import "./assets/css/style1.css";
@import "./assets/css/style2.css";
@import "./assets/css/responsiveslides.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #525252;
}

</style>
