<template>
  <div class="details">
    <div class="journalism">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/NewList' }">新闻资讯</el-breadcrumb-item>
        <el-breadcrumb-item>{{newList.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="shop" id="shop_detail">
      <div class="new_title">
        <h1>{{newList.title}}</h1>
        <div class="title_date">
          <span class="date">{{newList.createtime | newDate}}</span>
          <span>
            作者:
            <span class="name">{{newList.author}}</span>
          </span>
        </div>
      </div>
      <div v-html="newList.content" class="shop_content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newId: 0,
      newList: {}
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.Id != from.query.Id) {
      }
    }
  },
  created() {
    this.newId = this.$route.query.Id;
    this.GetNews(this.newId);
  },
  methods: {
    GetNews(id) {
      this.$axios.post("News/idGetNews", { newsId: id }).then(res => {
        if (res.data.code == 200) {
          this.newList = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#shop_detail {
  width: 1200px !important;
  text-indent: 2em;
  text-align: justify!important;
  .shop_content h1 {
    text-align: justify !important;
  }
}
.new_title {
  text-align: center;
  margin-top: 66px;
  h1 {
    color: #070004;
  }
  .title_date {
    color: #9e9e9e;
    .date {
      margin-right: 10px;
    }
    .name {
      color: #3e4c73;
    }
  }
}
.journalism {
  width: 75%;
  margin: 0 auto;
  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
  }
}
</style>