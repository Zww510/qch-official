<!--
 * @Author: your name
 * @Date: 2020-05-22 15:43:45
 * @LastEditTime: 2020-06-04 15:09:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wxappf:\Demo\vue-official\src\views\productCenter.vue
--> 
<template>
  <div>
    <Swipers />
    <div class="mian-cur-position">
      <div class="mcp-frim maxw">
        <div class="title">
          <h2>产品展示</h2>
          <i>/</i>
          <em>Product display</em>
        </div>
        <div class="curpor">
          <a href="index.html">首页</a>
          <i class="icon-eec7"></i>
          <a href>产品中心</a>
        </div>
      </div>
    </div>

    <div class="mian-cur-nav maxw">
      <a
        href="javascript:;"
        v-for="(item,index) in series"
        :key="item.id"
        @click="getProduct(item.id,index)"
        :class="index == cur ? 'cur' : ''"
      >{{item.series}}</a>
    </div>

    <!--product start-->
    <section class="index-product maxw">
      <div class="pro-item" v-for="item in Product" :key="item.id">
        <div class="info">
          <h2></h2>
          <h3>{{item.title}}</h3>
          <router-link :to="{path:'/Shop', query:{id: item.id}}">查看详情</router-link>
        </div>
        <img :src="item.image" />
      </div>
    </section>
    <!-- <a href class="commonMoreBut">查看更多</a> -->
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
      series: [],
      Product: [],
      cur: 0
    };
  },
  watch: {
    $route(to,from) {
      if(to.query.productId != from.query.productId) {
        this.getProduct(to.query.productId,to.query.proIndex + 1);
      }
    }
  },
  created() {
    this.getSeries();
    this.getProduct(0);
  },
  mounted() {
    this.cur = 0;
    if (this.$route.query.productId) {
      this.getProduct(this.$route.query.productId,this.$route.query.proIndex + 1);
    }
  },
  methods: {
    async getSeries() {
      let { data: res } = await this.$axios.post("Product/getSeries", {
        type: 2
      });
      if (res.code == 200) {
        res.data.unshift({ series: "全部" });
        this.series = res.data;
      }
    },
    async getProduct(type, index) {
      this.cur = index;
      let { data: res } = await this.$axios.post("Product", { type: type });
      if (res.code == 200) {
        this.Product = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.index-product {
  padding: 20px 0;
}
</style>