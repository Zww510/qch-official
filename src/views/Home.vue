<template>
  <div class="home">
    <div class="headerTOPH2"></div>
    <div class="callbacks_container">
      <Swipers />
      <!-- <span class="swiText" v-if="commodity">{{imgIndex}}/{{commodity.length}}</span> -->
    </div>

    <!--about start-->
    <div class="index-title maxw" style="margin-top:40px;">
      <h2>公司简介</h2>
      <i>/</i>
      <em>Company profile</em>
    </div>
    <section class="index-about-us maxw">
      <!--company-info start-->
      <div class="company-info">
        <div class="info">
          <h1>深圳市七彩宏云网络科技有限公司</h1>
          <p>{{homeDate.company_profile}}</p>
        </div>
        <img :src="homeDate.company" />
      </div>
    </section>
    <!--about end-->

    <!--product start-->
    <div class="index-title maxw">
      <h2>产品展示</h2>
      <i>/</i>
      <em>Product display</em>
    </div>
    <section class="index-product maxw">
      <div class="pro-item" v-for="item in product" :key="item.id">
        <div class="info">
          <h2></h2>
          <h3>{{item.title}}</h3>
          <router-link :to="{path:'/Shop', query:{id: item.id}}">查看详情</router-link>
        </div>
        <img :src="item.image" />
      </div>
    </section>
    <router-link to="/Product" class="commonMoreBut">查看更多</router-link>
    <!--product end-->

    <!--news start-->
    <div class="index-title maxw">
      <h2>新闻资讯</h2>
      <i>/</i>
      <em>News and information</em>
    </div>
    <section class="index-news">
      <div class="news-item" v-for="item in news" :key="item.id">
        <div class="time">
          <span>
            <em>{{item.createtime | dayDate}}</em>
            <dl>日</dl>
          </span>
          <h2>{{item.createtime | yearDate}}</h2>
        </div>
        <router-link :to="{path: '/ShopDetail', query:{content: item.content}}" class="info">
          <h2 class="title_hidden">{{item.title}}</h2>
          <div v-html="item.intro" class="text_hidden"></div>
        </router-link>
      </div>
    </section>
    <router-link to="/NewList" class="commonMoreBut">查看更多</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Swipers from "@/components/swipers.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Swipers
  },

  data() {
    const that = this;
    return {
      product: [],
      homeDate: [],
      news: []
    };
  },
  created() {
    this.getHomepage();
  },
  methods: {
    async getHomepage() {
      let { data: res } = await this.$axios.get("Homepage");
      if (res.code == 200) {
        this.homeDate = res.data;
        localStorage.setItem("home", JSON.stringify(res.data));
      }
      let { data: result } = await this.$axios.get("Product");
      if (result.code == 200) {
        this.product = result.data;
      }
      let { data: data } = await this.$axios.post("News");
      if (data.code == 200) {
        this.news = data.data;
      }
    }
  }
};
</script>

<style>
.home_banner img {
  height: 100%;
  width: 100%;
}
.text_hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 60px;
}
.title_hidden{
  display: -webkit-box!important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden!important;
}
.news-item{
  background-color: #ffffff!important;
}
</style>