<template>
  <div class="details">
    <div class="shop">
      <!-- <img src="../assets/image/shop-detail.jpg" alt /> -->
      <div v-html="content" class="shop_content"></div>
      <div v-if="banner">
        <img :src="banner" alt="">
      </div>
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
    $route(to,from) {
      if(to.query.content != from.query.content) {
        this.content = to.query.content
      }
    }
  },
  created() {
    this.content = this.$route.query.content;
    this.banner = this.$route.query.imgBanner
  },
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
.shop_content img{
  display: block;
}
.shop_content {
  color: #ffffff;
  margin-bottom: 20px;
}
.shop{
  width: 100%!important;
}
</style>