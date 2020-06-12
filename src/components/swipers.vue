<template>
  <div>
    <swiper class="swiImgs" :options="swiperOption" v-if="commodity.length!=0">
      <swiper-slide
        v-for="(item, index) in commodity"
        data-index="index"
        :key="index"
        class="item home_banner"
      >
        <img class="swiImg" :src="item.img" @click="goBanner(item.detail)"/>
      </swiper-slide>
      <div class="swiper-pagination" id="pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  //   props: {
  //     commodity: {
  //       type: Array,
  //       default: () => []
  //     }
  //   },
  data() {
    const that = this;
    return {
      commodity: [],
      imgIndex: 1,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，
        //也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        //滑动之后回调函数
        on: {
          slideChangeTransitionStart: function() {
            that.imgIndex = this.realIndex + 1;
            //获取轮播图片下标索引；这里有一个坑，之前网上找到的是用activeIndex，但后来网上说的是这个realIndex，
            //原来activeIndex是swiper2.0的；而realIndex是swiper3.0的，（使用realIndex才实现了下标索引）
          }
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      let that = this;
      that.$axios.get("Banner").then(res => {
        that.commodity = res.data.data;
      });
    },
    goBanner(img) {
      this.$router.push({path:'/ShopDetail', query:{imgBanner: img}})
    }
  }
};
</script>

<style>
.home_banner {
  height:auto;
  width: 100%;
}
.home_banner img {
  height: 100%;
  width: 100%;
}
</style>