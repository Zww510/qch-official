<template>
  <header class="jgy-header">
    <section class="main">
      <a href class="logo">
        <img :src="logo" />
      </a>
      <nav>
        <ul class="PCNenuMain">
          <li class="mn">
            <router-link to="/">首页</router-link>
          </li>
          <li class="mn">
            <router-link to="/Product">产品中心</router-link>
            <!-- <i class="icon-eed7"></i> -->
            <ul class="sonClass">
              <li v-for="(item,index) in series" :key="item.id">
                <router-link
                  active-class="active"
                  :to="{path:'/Product', query:{productId:item.id,proIndex:index}}"
                  class="serv"
                >
                  <span>{{item.series}}</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="mn">
            <router-link to="/Solution">解决方案</router-link>
            <!-- <i class="icon-eed7"></i> -->
            <ul class="sonClass">
              <li v-for="item in solut" :key="item.id">
                <router-link
                  active-class="active"
                  :to="{path:'/scheme', query:{content: item.content}}"
                  class="serv"
                >
                  <span>{{item.classify}}</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="mn">
            <router-link to="/NewList">新闻资讯</router-link>
          </li>
          <li class="mn">
            <router-link to="/Download">下载与服务</router-link>
            <!-- <i class="icon-eed7"></i> -->
            <ul class="sonClass">
              <li>
                <router-link to="/Download" class="serv" active-class="active">
                  <span>驱动下载</span>
                </router-link>
              </li>
              <li>
                <a @click="Warranty(1)" class="serv">
                  <span>保修政策</span>
                </a>
              </li>
              <li>
                <a @click="Warranty(2)" class="serv">
                  <span>经销商服务</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="mn">
            <router-link to="/about">关于我们</router-link>
          </li>
          <!-- <li class="mn">
            <a @click="linkDownload('https://partner.jiaoguanyi.com')">合作伙伴平台</a>
          </li> -->
        </ul>
        <div class="menu" id="menuOpen" @click="showMenu">
          <i class="icon-eee7"></i>
        </div>
        <div class="MNenuMain" id="MNenuMain" v-show="menus">
          <div class="mnName">
            <h1>快速导航</h1>
            <div class="menuClose" id="menuClose" @click="showMenu">
              <i class="icon-ee86"></i>
            </div>
          </div>
          <ul class="navmain">
            <div class="login">
              <a class="waplogo">
                <img src="../assets/image/logo.png" />
              </a>
              <div class="search">
                <input type="text" class="serachKey" placeholder="请输入关键词" id="serachKey" />
                <input type="submit" class="button" value="搜索" />
              </div>
            </div>

            <li class="son">
              <a class="mbut" @click="showProduct(0)">
                <span>产品中心</span>
                <em>Product</em>
              </a>
                <ul class="SonContent" v-show="products == 0">
                  <li v-for="(item,index) in series" :key="item.id">
                    <router-link
                      active-class="active"
                      :to="{path:'/Product', query:{productId:item.id,proIndex:index}}"
                      class="serv"
                    >
                      <span>{{item.series}}</span>
                    </router-link>
                  </li>
                </ul>
            </li>
            <li class="son">
              <a class="mbut" @click="showProduct(1)">
                <span>解决方案</span>
                <em>Solution</em>
              </a>
              <ul class="SonContent" v-show="products == 1">
                <li v-for="item in solut" :key="item.id">
                  <router-link
                    :to="{path:'/scheme', query:{content: item.content}}"
                  >{{item.classify}}</router-link>
                </li>
              </ul>
            </li>
            <li class="son">
              <a class="mbut" @click="showProduct(2)">
                <span>新闻资讯</span>
                <em>News</em>
              </a>
              <ul class="SonContent" v-show="products == 2">
                <li>
                  <router-link to="/NewList">公司新闻</router-link>
                </li>
              </ul>
            </li>
            <li class="son">
              <a class="mbut" @click="showProduct(3)">
                <span>下载与服务</span>
                <em>Download</em>
              </a>
              <ul class="SonContent" v-show="products == 3">
                <li>
                  <router-link to="/Download">驱动下载</router-link>
                </li>
                <li>
                  <a @click="Warranty(1)">保修政策</a>
                </li>
                <li>
                  <a @click="Warranty(2)">经销商服务</a>
                </li>
              </ul>
            </li>

            <li class="son">
              <a class="mbut" @click="showProduct(4)">
                <span>关于我们</span>
                <em>About</em>
              </a>
              <ul class="SonContent" v-show="products == 4">
                <li>
                  <router-link to="/about">公司简介</router-link>
                </li>
              </ul>
            </li>
            <!-- <li class="son">
              <a  @click="linkDownload('https://partner.jiaoguanyi.com')" class="mbut">
                <span>合作伙伴平台</span>
                <em>Application</em>
              </a>
            </li> -->
          </ul>
        </div>
      </nav>
    </section>
  </header>
</template>

<script>
export default {
  data() {
    return {
      logo: "",
      menus: false,
      products: 0,
      solut: [],
      series: []
    };
  },
  watch: {
    $route(to, from) {
      this.menus = false;
    }
  },
  created() {
    this.getLogo();
  },
  methods: {
    async getLogo() {
      let { data: res } = await this.$axios.get("Homepage");
      if (res.code == 200) {
        this.logo = res.data.logo;
      }
      let { data: result } = await this.$axios.get("Solution");
      if (result.code == 200) {
        console.log('------------解决方案',result)
        this.solut = result.data;
      }
      let { data: date } = await this.$axios.post("Product/getSeries", {type: 2});
      if (date.code == 200) {
        this.series = date.data;
      }
    },
    showMenu() {
      this.menus = !this.menus;
    },
    showProduct(index) {
      this.products = index;
    },
    linkDownload(url) {
      window.open(url, "_blank");
    },
    async Warranty(type) {
      // let {data: res} = await this.$axios.post('Diversity',{type: type});
      // console.log('-----------首页',res)
      // if(res.code == 200) {
      //   this.$router.push({path: '/ShopDetail',query: {content: res.data.content}})
      // }
      this.$router.push({path: '/ShopDetail',query: {content: type}})
    }
  }
};
</script>

<style lang="less" scoped>
@media (min-width: 1020px) {
  .PCNenuMain .mn .sonClasss {
    width: 100%;
    height: 0;
    overflow: hidden;
    position: absolute;
    top: 60px;
    left: 0px;
    transition-duration: 0.2s;
    z-index: 9999;
    padding: 0px 0;
    // background: rgba(255, 255, 255, 0.7);
    background-color: #525252;
  }
}
@media (max-width: 1200px) {
  header .main{
    width: 85%;
  }
}
@media (max-width: 1500px) {
  header .main{
    width: 85%;
  }
}


</style>