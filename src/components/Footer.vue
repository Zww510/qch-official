<template>
  <!--footer start-->
  <footer>
    <div class="maxw main footer_main">
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
          <li v-for="(item) in solution" :key="item.id">
            <router-link active-class="active" :to="{path:'/scheme', query:{content: item.content}}">{{item.classify}}</router-link>
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
          <li>
            <a :href="colorFul.type == 1 ? colorFul.addr : 'javascript:void(0)'" :target="colorFul.type == 1 ? '_blank' : ''">关于七彩虹集团</a>
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
      series: [],
      colorFul: []
    }
  },
  created() {
    this.getCompany()
  },
  methods: {
    async getCompany() {
      console.log("请求")
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
      let {data: data} = await this.$axios.post('Jump/getJumpInfo',{name: '关于七彩虹集团'});
      if(data.code == 200) {
        data.data.type == 2
        this.colorFul = data.data
      }
    },
    async Warranty(type) {
      // let {data: res} = await this.$axios.post('Diversity',{type: type});
      // if(res.code == 200) {
      //   console.log('数据',res.data)
      //   this.$router.push({path: '/ShopDetail',query: {content: res.data.content}})
      // }
      this.$router.push({path: '/ShopDetail',query: {content: type}})
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  background-color: #2E2E2E!important;
}
@media (min-width: 1020px){
  .footer_main {
    max-width: 1400px;
}
}
</style>