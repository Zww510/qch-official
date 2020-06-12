<template>
  <div class="shop_cntent">
    <div class="shop_top">
      <div class="thumb-example">
        <!-- swiper1 -->
        <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
          <swiper-slide v-for="(item,index) in data.thumb" :key="index">
            <img :src="item" alt />
          </swiper-slide>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
          <swiper-slide v-for="(item1,index1) in data.thumb" :key="index1">
            <img :src="item1" alt />
          </swiper-slide>
        </swiper>
      </div>
      <div class="shop_details">
        <h1>{{data.title}}</h1>
        <h2>{{data.introduce}}</h2>
        <div class="shop_buy flex">
          <span class="buy_button">立即购买</span>
          <span v-for="(item,index) in data.links" :key="index">
            <a :href="item.link" target="_blank">
              <img :src="'http://admin.colorfulyun.cn' + item.img" alt />
            </a>
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
        <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
          <swiper-slide v-for="(item,index) in data.thumb" :key="index">
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
        slideToClickedSlide: true
      },
      id: 0,
      data: [],
      swiperShow: false,
      mask: false,
      howShow: false,
      parameter: [],
      // parameterText: [
      //   "产品型号",
      //   "操作系统",
      //   "处理器",
      //   "主频",
      //   "显示芯片",
      //   "内存",
      //   "存储",
      //   "存储扩展",
      //   "屏幕尺寸",
      //   "屏幕类型",
      //   "屏幕分辨率",
      //   "wifi",
      //   "蓝牙",
      //   "摄像头",
      //   "HDMI",
      //   "USB",
      //   "其他接口",
      //   "扬声器",
      //   "电池",
      //   "电源",
      //   "尺寸",
      //   "重量"
      // ]
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
    this.getProductList();
    this.getParam();
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
          this.data.links = zip(
            this.data.link,
            this.data.linkImg
          ).map(([link, img]) => ({ link, img }));
        }
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
    }
  }
};
</script>

<style lang="less" scoped>
.shop {
  margin-top: 0 !important;
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
  .Parameter {
    width: 100%;
    height: 100px;
    text-align: center;
    background-color: #f8f8f8;
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
    height: 480px;
    width: 560px;
    margin-left: 20px;
    margin-bottom: 40px;
    // background-color: $black;
  }
  .shop_top {
    margin: 20px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    .shop_details {
      margin: 120px 0 0 130px;
      width: 30%;
      h1 {
        color: #ff8e4a;
      }
      h2 {
        margin-top: 20px;
        color: #ffffff;
        font-size: 14px;
        padding-right: 50px;
        word-break: break-all;
      }
      .shop_buy {
        color: #ffffff;
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
          font-size: 14px;
          font-weight: 300;
          width: 100%;
          line-height: 40px;
          font-family: 微软雅黑;
          text-shadow: 0.01em 0.01em 0.01em #000000!important;
          letter-spacing: 2px;
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
      h2 {
        margin-top: 20px;
        color: #ffffff;
        font-size: 14px;
        padding-right: 50px;
        word-break: break-all;
      }
      .shop_buy {
        color: #ffffff;
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
</style>
