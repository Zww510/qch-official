<template>
  <!--footer start-->
  <footer>
    <div class="maxw main">
      <!--left-->
      <div class="left">
        <ul>
          <h2>产品中心</h2>
          <li v-for="(item,index) in series" :key="item.id">
            <router-link active-class="active" :to="{path:'/Product', query:{productId:item.id,proIndex:index}}">{{item.series}}</router-link>
          </li>
        </ul>
        <ul>
          <h2>下载与服务</h2>
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
        <ul>
          <h2>解决方案心</h2>
          <li v-for="(item,index) in solution" :key="item.id">
            <router-link active-class="active" :to="{path:'/ShopDetail', query:{content: item.content}}">{{item.classify}}</router-link>
          </li>
        </ul>
        <ul>
          <h2>新闻资讯</h2>
          <li>
            <router-link to="/NewList">公司新闻</router-link>
          </li>
        </ul>
        <ul>
          <h2>关于我们</h2>
          <li>
            <router-link to="/about">公司简介</router-link>
          </li>
        </ul>
      </div>
      <!--left-->
      <!--right-->
      <div class="right">
        <div class="logo">
          <img :src="company.logo" />
        </div>
        <div class="ewm">
          <img :src="company.qrcode" />
        </div>
        <div class="ewmtext">官方公众号</div>
        <div class="teltext">热线电话</div>
        <a href="tel:400-800-5793" class="tel">{{company.phone}}</a>
      </div>
      <!--right-->
    </div>
    <section class="maxw">
      <p>地址：{{company.adress}}</p>
      <p>粤ICP备17133107号</p>
    </section>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      company: {},
      solution: [],
      series: []
    }
  },
  created() {
    this.getCompany()
  },
  methods: {
    async getCompany() {
      let {data: res} = await this.$axios.get('Homepage');
      if(res.code == 200) {
         this.company = res.data
      }
      let {data: result} = await this.$axios.get('Solution');
      if(result.code == 200) {
         this.solution = result.data
      }
      let {data: date} = await this.$axios.post('Product/getSeries',{type: 2});
      if(date.code == 200) {
        this.series = date.data
      }
    },
    async Warranty(type) {
      let {data: res} = await this.$axios.post('Diversity',{type: type});
      if(res.code == 200) {
        console.log('数据',res.data)
        this.$router.push({path: '/ShopDetail',query: {content: res.data.content}})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  background-color: #2E2E2E!important;
}
</style>