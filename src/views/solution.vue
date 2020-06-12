
<template>
  <div>
    <!--<div class="headerTOPH"></div>-->
    <div class="headerTOPH2"></div>
    <div class="callbacks_container">
      <Swipers />
    </div>

    <div class="mian-cur-position">
      <div class="mcp-frim maxw">
        <div class="title">
          <h2>解决方案</h2>
          <i>/</i>
          <em>THE SOLUTION</em>
        </div>
        <div class="curpor">
          <a href="index.html">首页</a>
          <i class="icon-eec7"></i>
          <a href>解决方案</a>
        </div>
      </div>
    </div>

    <div class="solution-main maxw">
      <router-link :to="{path:'/ShopDetail', query:{content: item.content}}" class="sol-item" v-for="item in solutionDate" :key="item.id">
        <span></span>
        <h2>{{item.classify}}</h2>
        <em>查看详情</em>
        <img :src="item.image" alt />
      </router-link>
    </div>
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
      solutionDate: []
    }
  },
  created() {
    this.getSolution()
  },
  methods: {
    getSolution() {
      this.$axios.get('Solution').then(res => {
        if(res.data.code == 200) {
          this.solutionDate = res.data.data
        }
      })
    }
  }
}
</script>