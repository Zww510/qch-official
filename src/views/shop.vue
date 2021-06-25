<template>
  <div class="shop_cntent">
    <div class="header_nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Product' }">产品中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="shop_top">
      <div
        class="thumb-example"
        @mouseenter="onMouseOver"
        @mouseleave="onMouseout"
        
      >
        <!-- swiper1 -->
        <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop" v-if="swiperArray">
          <swiper-slide v-for="(item,index) in swiperData" :key="index">
            <img :src="item" alt />
          </swiper-slide>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
            :class="swiperArrows ? 'show' : 'hidden'"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
            :class="swiperArrows ? 'show' : 'hidden'"
          ></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper
          class="swiper gallery-thumbs"
          :options="swiperOptionThumbs"
          ref="swiperThumbs"
          v-if="swiperArray"
        >
          <swiper-slide v-for="(item1,index1) in swiperData" :key="index1">
            <img :src="item1" alt />
          </swiper-slide>
        </swiper>
      </div>
      <div class="shop_details">
        <h1>{{data.title}}</h1>
        <!-- <h2>{{data.introduce}}</h2> -->
        <div class="shop_h2">
          <h2 v-for="(item1,index1) in data.introduce" :key="index1">{{item1}}</h2>
        </div>
        <div class="shop_buy flex">
          <span class="buy_button">立即购买</span>
          <span v-if="data.links != ''" style="width: 100%;display: flex">
            <span v-for="(item,index) in data.links" :key="index">
              <a :href="item.link" target="_blank">
                <img :src="'http://admin.colorfulyun.cn' + item.img" alt />
              </a>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="shop_bottom">
      <div class="Parameter">
        <span>|</span>
        <a href="#cpImg">产品综述</a>
        <span>|</span>
        <a href="javascript:void(0)" @click="showSwiper('how')">详细参数</a>
        <span>|</span>
        <a href="javascript:void(0)" @click="showSwiper('swiper')">美图欣赏</a>
        <span>|</span>
      </div>
      <div class="shop">
        <div v-html="data.content" class="shop_content" id="cpImg"></div>
      </div>
    </div>
    <!-- swiper3 Thumbs -->
    <div class="swiper_mask @touchmove.prevent" v-if="swiperShow">
      <div class="swiper_show_mask">
        <swiper class="swiper swiper_details" :options="swiperOptionTop" ref="swiperTop">
          <swiper-slide v-for="(item,index) in swiperData" :key="index">
            <img :src="item" alt />
          </swiper-slide>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
      </div>
    </div>
    <!-- 详细参数mask -->
    <div class="howdetailed" v-if="howShow">
      <h1>平板详细参数</h1>
      <div class="howCentent">
        <ul>
          <li v-for="(item,index) in parameter" :key="index">
            <div class="model">{{item.key}}</div>
            <div class="text">{{item.value}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- mask蒙版 -->
    <div class="mask" @click="hiddenSwiper" v-if="mask"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        initialSlide: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        initialSlide: 0
      },
      id: 0,
      title: "",
      data: [],
      swiperShow: false,
      mask: false,
      howShow: false,
      parameter: [],
      swiperArrows: false,
      swiperArray: false,//控制swiper联动
      swiperData: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.title = this.$route.query.title;
  },
  mounted() {
    this.getProductList();
    this.getParam();
  },
  watch: {
    swiperData(value,name) {
      if(value == null) return []
      this.$nextTick(() => {//初始化联动 Swiper
          const swiperTop = this.$refs.swiperTop.$swiper;
          const swiperThumbs = this.$refs.swiperThumbs.$swiper;
          swiperTop.controller.control = swiperThumbs;
          swiperThumbs.controller.control = swiperTop;
        });
    }
  },
  methods: {
    async getProductList() {
      let { data: res } = await this.$axios.post("Product/ProductList", {
        id: this.id
      });
      if (res.code == 200) {
        this.data = res.data[0];
        if (this.data.link.length > 1) {
          const zip = ([x, ...xs], [y, ...ys]) => {
            if (x === undefined || y === undefined) return [];
            return [[x, y], ...zip(xs, ys)];
          };
          this.data.links = zip( this.data.link, this.data.linkImg ).map(([link, img]) => ({ link, img }));
        }
        this.data.introduce = String(res.data[0].introduce).split("#");//进行分段
        this.swiperArray = true;//swiper联动显示，否则默认显示最后一张
        this.data.content = this.data.content.replace(/<br>/g,' ')//去除全局的 br 标签
        this.swiperData = this.data.thumb
        //console.log('swiper联动数据',this.data.thumb)
      } else {
        console.log("失败", res);
      }
    },
    async getParam() {
      let { data: res } = await this.$axios.post("Product/getProductParam", {
        productId: this.id
      });
      if (res.code == 200) {
        let data = res.data;
        for (let i in data) {
          let key = i;
          let value = data[i];
          this.parameter.push({ key: key, value: value });
        }
      } else {
        console.log("失败", res);
      }
    },
    showSwiper(type) {
      if (type == "how") {
        this.howShow = true;
      } else {
        this.swiperShow = true;
      }
      this.mask = true;
      //禁止滚动条
      // let m = function(e) {
      //   e.preventDefault();
      // };
      // document.body.style.overflow = "hidden";
      // document.addEventListener("touchmove", m, { passive: false });
    },
    hiddenSwiper() {
      this.mask = false;
      this.swiperShow = false;
      this.howShow = false;
      let m = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", m, { passive: true });
    },
    onMouseOver() {
      this.swiperArrows = true;
    },
    onMouseout() {
      this.swiperArrows = false;
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
}
.header_nav {
  width: 75%;
  margin: 0 auto;
}
.hidden {
  opacity: 0;
}
.show {
  opacity: 1;
}
.shop {
  margin-top: 0 !important;
  width: 75% !important;
}
.mask {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  -webkit-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}

.shop_bottom {
  background-color: #f8f8f8;
  .Parameter {
    width: 100%;
    height: 100px;
    text-align: center;
    background-color: #f2f2f2;
    color: #6a6a6a;
    line-height: 100px;
    span {
      margin: 0 20px;
      color: #cccccc;
    }
    a {
      font-size: 16px;
      color: #6a6a6a;
    }
  }
}
.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  &.swiper_details {
    height: 100%;
    width: 100%;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    margin-top: 20px;
    //   padding: $gap 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
@media (min-width: 1020px) {
  .shop_cntent {
    img {
      height: 100%;
      width: 100%;
    }
  }
  .thumb-example {
    height: 500px;
    width: 400px;
    margin-left: 20px;
    margin-bottom: 40px;
    // background-color: $black;
  }
  .shop_top {
    margin-top: 40px;
    margin: 0 auto;
    width: 75%;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    // -webkit-box-pack: center;
    // -moz-justify-content: center;
    // -webkit-justify-content: center;
    // justify-content: center;
    .shop_details {
      margin: 120px 0 0 160px;
      width: 30%;
      h1 {
        color: #ff8e4a;
      }
      .shop_h2 {
        margin-top: 20px;
      }
      h2 {
        margin-top: 5px;
        font-size: 14px;
        padding-right: 50px;
        word-break: break-all;
      }
      .shop_buy {
        margin-top: 40px;
        -webkit-box-align: center;
        -moz-align-items: center;
        -webkit-align-items: center;
        align-items: center;
        .buy_button {
          display: block;
          width: 120px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ff8e4a;
          border-radius: 10px;
          background-color: #ff8e4a;
          color: #fff;
          text-align: center;
          font-weight: 500;
        }
        span {
          margin-right: 20px;
          height: 66px;
          width: 66px;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
  .howdetailed {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    z-index: 1001;
    background-color: #ffffff;
    width: 60%;
    h1 {
      text-align: center;
      color: #000000;
      margin: 20px 0;
    }
    .howCentent {
      margin: 10px 60px 40px 60px;
      ul {
        background-color: #ffffff;
        li {
          line-height: 40px;
          font-size: 15px;
          width: 100%;
          line-height: 40px;
          //font-family: 微软雅黑;
          //text-shadow: 0.01em 0.01em 0.01em #000000!important;
          letter-spacing: 2px;
          color: #000000;
          font-weight: lighter;
          text-shadow: 0 0 1.5px #ccc !important;
          .model {
            border-bottom: 1px solid #ccc;
            float: left;
            width: 100px;
            text-align: center;
          }
          .text {
            margin-left: 120px;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
  .swiper_mask {
    .swiper_show_mask {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -46%);
      width: 800px;
      height: 800px;
      z-index: 1001;
    }
  }
}
@media (max-width: 1020px) {
  .shop_cntent {
    img {
      height: 100%;
      width: 100%;
    }
  }
  .thumb-example {
    height: 480px;
    width: 560px;
    margin: 0 auto;
    // background-color: $black;
  }
  .shop_top {
    .shop_details {
      margin: 120px 0 20px 130px;
      h1 {
        color: #ff8e4a;
      }
      .shop_h2 {
        margin-top: 20px;
      }
      h2 {
        font-size: 14px;
        padding-right: 50px;
        word-break: break-all;
      }
      .shop_buy {
        margin-top: 40px;
        -webkit-box-align: center;
        -moz-align-items: center;
        -webkit-align-items: center;
        align-items: center;
        .buy_button {
          display: block;
          width: 120px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ff8e4a;
          border-radius: 10px;
          background-color: #ff8e4a;
          color: #fff;
          text-align: center;
          font-weight: 500;
        }
        span {
          margin-right: 10px;
        }
      }
    }
  }
  .howdetailed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -35%);
    z-index: 1001;
    background-color: #ffffff;
    width: 95%;
    h1 {
      text-align: center;
      color: #000000;
      margin: 20px 0;
    }
    .howCentent {
      margin: 10px;
      ul {
        li {
          line-height: 40px;
          font-size: 14px;
          color: #000000;
          font-weight: 300;
          width: 100%;
          line-height: 40px;
          text-shadow: 0 0 1.5px #ccc !important;
          .model {
            border-bottom: 1px solid #ccc;
            float: left;
            width: 100px;
            text-align: center;
          }
          .text {
            margin-left: 120px;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
  .swiper_mask {
    .swiper_show_mask {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -35%);
      width: 560px;
      height: 480px;
      z-index: 1001;
    }
  }
}
@media (max-width: 650px) {
  .shop_cntent {
    img {
      height: 100%;
      width: 100%;
    }
  }
  .thumb-example {
    height: 480px;
    width: 100%;
  }
  .swiper_mask {
    .swiper_show_mask {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -35%);
      width: 100%;
      height: 480px;
      z-index: 1001;
    }
  }
}

.flex {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
}
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
