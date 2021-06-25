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
        @click="getProduct(item.id,index,1,'header')"
        :class="index == cur ? 'cur' : ''"
      >{{item.series}}</a>
    </div>

    <!--product start-->
    <section class="index-product maxw product_maxw">
      <div class="pro-item" v-for="item in Product" :key="item.id">
        <div class="info">
          <h2 class="info_title"></h2>
          <h3>{{item.title}}</h3>
          <router-link :to="{path:'/Shop', query:{id: item.id, title: item.title}}">查看详情</router-link>
        </div>
        <div class="pro-image">
          <img :src="item.image" />
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="12"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
      ></el-pagination>
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
      cur: 0,
      scrollTop: 0,
      total:0,//总页数
      type: 0,
      currentPage1: 1
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "Shop") {
      //前往详情页位置缓存
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    } else {
      this.scrollTop = 0;
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.documentElement.scrollTop = vm.scrollTop;
    });
  },
  watch: {
    $route(to, from) {
      if (to.query.productId != from.query.productId) {
        this.getProduct(to.query.productId, to.query.proIndex + 1);
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
      this.getProduct(
        this.$route.query.productId,
        this.$route.query.proIndex + 1,
      );
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
    async getProduct(type, index,homePage=1,header) {
      if(header == 'header'){//点击分类，让页码回1
        this.currentPage1 = 1//自如住的房子合同还有半年，突然告知政府查隔断问题，让搬走，只退押金和租金，属于无责解约，求支招
      }
      this.cur = index;
      this.type = type;
      let { data: res } = await this.$axios.post("Product", {
        type: type,
        homePage: homePage
      });
      console.log("------", res,type);
      if (res.code == 200) {
        this.Product = res.data;
        this.total = res.totalPage
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getProduct(this.type,this.cur,val)
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: right;
  margin-top: 20px;
}
.info {
  .info_title {
    height: auto !important;
  }
}
.index-product {
  padding: 20px 0;
}
@media (max-width: 1020px) {
  .product_maxw {
    max-width: 400px;
  }
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
  .pro-item .pro-image {
    height: 200px;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>