<template>
  <div>
    <div class="headerTOPH2"></div>
    <div class="callbacks_container">
      <!-- <ul class="rslides" id="slider">
        <li>
          <a href>
            
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/banner-1.jpg" alt />
          </a>
        </li>
      </ul>-->
      <Swipers />
    </div>
    <div class="mian-cur-position">
      <div class="mcp-frim maxw">
        <div class="title">
          <h2>新闻资讯</h2>
          <i>/</i>
          <em>News and information</em>
        </div>
        <div class="curpor">
          <a href="index.html">首页</a>
          <i class="icon-eec7"></i>
          <a href>新闻资讯</a>
        </div>
      </div>
    </div>

    <!-- <div class="mian-cur-nav maxw">
      <a href class="cur">全部</a>
      <a href>公司新闻</a>
      <a href>行业资讯</a>
    </div> -->

    <div class="news-main" v-for="item in news" :key="item.id">
      <!--item start-->
      <div class="news-item">
        <router-link :to="{path: '/NewListDetail', query:{Id: item.id}}" class="pic">
          <img :src="item.img" alt />
        </router-link>
        <div class="info">
          <router-link :to="{path: '/NewListDetail', query:{Id: item.id}}" class="title">{{item.title}}</router-link>
          <div v-html="item.intro" class="text_hiddens"></div>
          <router-link :to="{path: '/NewListDetail', query:{Id: item.id}}" class="see">查看详情</router-link>
          <h3>
            <span>发布时间：{{item.createtime | dateFormat}}</span>
          </h3>
        </div>
      </div>
      <!--item end-->
    </div>
  </div>
</template>

<script>
import Swipers from "@/components/swipers.vue";
export default {
  components: {
    Swipers
  },
  data() {
    return {
      news: []
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.$axios.post("News").then(res => {
        if (res.data.code == 200) {
          this.news = res.data.data;
          console.log('--------',this.news)
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
// .text_hiddens {
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 3;
//   overflow: hidden;
// }
.see{
  margin-top: 10px;
}
</style>