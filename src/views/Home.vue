<template>
  <div class="home">
    <div class="headerTOPH2"></div>
    <div class="callbacks_container">
      <HomeSwipers />
      <!-- <span class="swiText" v-if="commodity">{{imgIndex}}/{{commodity.length}}</span> -->
    </div>

    <!--product start-->
    <div class="index-title maxw home_title">
      <div class="title_left">
        <h2>HOT</h2>
        <div class="titel_size">
          <span>PRODUCT</span>
          <i>/</i>
          <b>热卖产品</b>
        </div>
      </div>
      <div class="more">
        <router-link to="/Product">
          MORE
          <i class="icon-eec7"></i>
        </router-link>
      </div>
    </div>
    <section class="index-product maxw product_maxw">
      <div class="pro-item" v-for="item in product" :key="item.id">
        <div class="info">
          <!-- <h2></h2> -->
          <h3>{{item.title}}</h3>
          <router-link :to="{path:'/Shop', query:{id: item.id, title: item.title}}">查看详情</router-link>
        </div>
        <div class="pro-image">
          <img :src="item.image" />
        </div>
      </div>
    </section>
    <!--product end-->

    <!--news start-->
    <div class="news">
      <div class="index-title maxw home_title">
        <div class="title_left">
          <h2>NEWS</h2>
          <div class="titel_size">
            <span>DYNAMIC</span>
            <i>/</i>
            <b>新闻动态</b>
          </div>
        </div>
        <div class="more">
          <router-link to="/NewList">
            MORE
            <i class="icon-eec7"></i>
          </router-link>
        </div>
      </div>
      <div class="news-main" v-for="item in news" :key="item.id">
        <!--item start-->
        <div class="news-item">
          <router-link :to="{path: '/NewListDetail', query:{Id: item.id}}" class="pic">
            <img :src="item.img" alt />
          </router-link>
          <div class="info">
            <router-link
              :to="{path: '/NewListDetail', query:{Id: item.id}}"
              class="title"
            >{{item.title}}</router-link>
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
    <!--news start-->

    <!--about start-->
    <div class="index-title maxw home_title">
      <div class="title_left">
        <h2>COMPANY</h2>
        <div class="titel_size">
          <span>PROFILE</span>
          <i>/</i>
          <b>关于我们</b>
        </div>
      </div>
      <div class="more">
        <router-link to="/about">
          MORE
          <i class="icon-eec7"></i>
        </router-link>
      </div>
    </div>
    <section class="index-about-us maxw">
      <!--company-info start-->
      <!-- <div class="company-info">
        <div class="info">
          <h1 style="text-align: center">深圳市七彩宏云网络科技有限公司</h1>
          <p
            v-for="(item,index) in homeDate.company_profile"
            :key="index"
            style="margin: 0 auto"
          >{{item}}</p>
        </div>
        <img :src="homeDate.company" />
      </div>-->
      <div class="about-frame">
        <!--MainContent start-->
        <div class="MainContent">
          <img :src="homeDate.company" />
          <p style="height:20px">&nbsp;</p>
          <p v-for="(item,index) in homeDate.company_profile" :key="index">{{item}}</p>
        </div>
        <!--MainContent end-->
      </div>
    </section>
    <div style="height: 200px;width:100%"></div>
    <!--about end-->
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSwipers from "@/components/homeSwiper.vue";

export default {
  name: "Home",
  components: {
    HomeSwipers
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
    // this.$axios.post("loginAdmin",{username: 123456,password: 12345}).then(res => {
    //     console.log("测试",res)
    //   }).catch(err => {
    //     console.log('请求错误1111111111111',err)
    //   }) 
  },
  methods: {
    async getHomepage() {
      let { data: res } = await this.$axios.get("Homepage");
      if (res.code == 200) {
        let ary = String(res.data.company_profile).split("#");
        res.data.company_profile = ary;
        this.homeDate = res.data;
        localStorage.setItem("home", JSON.stringify(res.data));
      }
      // let { data: result } = await this.$axios.post("Product",{homePage: 1,type: 0});
      // console.log('产品数据',result)
      // if (result.code == 200) {
      //   if (result.data.length >= 8) {
      //     this.product = result.data.splice(0, 8);
      //   }
      // }
      this.$axios.post("Product", { homePage: 1, type: 0 }).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length >= 8) {
            this.product = res.data.data.splice(0, 8);
          }
        }
      });
      let { data: data } = await this.$axios.post("News");
      if (data.code == 200) {
        if (data.data.length >= 2) {
          this.news = data.data.splice(0, 2);
        }
      }
    }
  }
};
</script>

<style>
.text_hiddens {
  text-align: justify;
}
.info p {
  text-align: justify;
  text-indent: 2em;
  letter-spacing: 1px;
}
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
.title_hidden {
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden !important;
}
.news-item {
  background-color: #ffffff !important;
}
@media (max-width: 1020px) {
  .product_maxw {
    max-width: 400px;
  }
}
</style>

<style lang="less" scoped>
.news {
  background-color: #f4f4f4;
  margin: 50px 0;
  padding: 5px 0 20px 0;
}
.title_left {
  width: 50%;
  border-bottom: 1px solid #777777;
  padding-bottom: 10px;
  box-sizing: border-box;
  .titel_size {
    font-size: 16px;
    span {
      color: #006aae;
    }
    i {
      margin: 0 5px;
      color: #787878;
    }
    b {
      color: #787878;
    }
  }
}
.home_title {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  margin-top: 40px;
  .more {
    font-size: 16px;
    color: #373737;
    i {
      font-size: 16px;
    }
  }
}
@media (max-width: 1020px) {
  .pro-item .pro-image {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@media all and (min-width: 1020px) {
  .pro-item {
    margin: 5px 22px;
    .pro-image {
      height: 200px;
      width: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>