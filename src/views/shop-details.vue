<template>
  <div class="details">
    <div class="shop" id="shop_detail">
      <!-- <img src="../assets/image/shop-detail.jpg" alt /> -->

      <div v-if="banner">
        <img :src="banner" alt="">
      </div>
      <div v-else v-html="content" class="shop_content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        // this.newList = to.query.newList
        this.getDiversity(to.query.content)
      }
    }
  },
  created() {
    console.log('我是页面的created生命周期')
    this.banner = this.$route.query.imgBanner
    this.getDiversity(this.$route.query.content)
  },
  methods: {
    async getDiversity(type) {
      let { data: res } = await this.$axios.post('Diversity', { type: type });
      if (res.code == 200) {
        this.content = res.data.content
      }
       console.log('请求次数', res)
    }
  }
};
</script>

<style>
@media (min-width: 1020px) {
  .shop img {
    width: 100% !important;
    height: 100%;
  }
}
@media (max-width: 1020px) {
  .shop img {
    width: 100% !important;
    height: 100%;
  }
}
.shop_content img {
  display: block;
}
.shop {
  width: 75% !important;
  margin: 0 auto;
}
</style>

<style lang="less" scoped>
#shop_detail {
  width: 1200px !important;
  text-indent: 2em;
  .shop_content h1 p {
    text-align: justify !important;
  }
}
</style>