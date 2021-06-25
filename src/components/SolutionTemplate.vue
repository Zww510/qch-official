<template>
  <div>
    <!-- <div class="mian-cur-position">
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
    </div> -->

    <div class="ny_mcont">
      <ul class="ul solutions_list">
        <li v-for="item in solutionDate" :key="item.id">
          <div class="leftbox">
            <div class="imagebox">
              <router-link :to="{path:'/scheme', query:{content: item.content}}">
                <img :src="item.image" alt />
              </router-link>
            </div>
            <router-link
              :to="{path:'/scheme', query:{content: item.content}}"
              class="title"
              :title="item.classify"
            >{{item.classify}}</router-link>
          </div>
          <div class="descbox">
            <p class="p desc">{{item.introduction}}</p>
            <router-link
              :to="{path:'/scheme', query:{content: item.content}}"
              class="more"
            >了解详情></router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      solutionDate: []
    };
  },
  created() {
    this.getSolution();
  },
  methods: {
    getSolution() {
      this.$axios.get("Solution").then(res => {
        console.log("数据", this.solutionDate);
        if (res.data.code == 200) {
          this.solutionDate = res.data.data;
          console.log("数据", this.solutionDate);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ny_mcont {
  padding: 35px 0 80px;
  min-height: 500px;
  width: 1200px;
  margin: 0 auto;
  .solutions_list {
    overflow: hidden;
    li {
      overflow: hidden;
      width: 552px;
      height: 265px;
      float: left;
      margin-bottom: 26px;
      background: #f8f8f8;
      box-sizing: border-box;
      padding: 45px 0 35px;
      cursor: pointer;
      .leftbox {
        float: left;
        background: url(../assets/image/solution_bg.png) right 8px no-repeat;
        width: 250px;
        position: relative;
        height: 180px;
        .imagebox {
          width: 131px;
          height: 131px;
          border-radius: 50%;
          position: relative;
          top: 13px;
          left: 30px;
          overflow: hidden;
          img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
          }
        }
        .title {
          color: #000000;
          font-size: 18px;
          font-weight: bold;
          width: 193px;
          text-align: center;
          display: block;
          margin-top: 25px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    li:nth-of-type(2n) {
      float: right;
    }
    li:hover {
      background: #2475db;
    }
    li:hover .descbox .more {
      color: #fff;
    }
    li .descbox .more:hover {
      color: #ffc602;
    }
    li:hover .descbox .desc {
      color: #ffffff;
    }
    li:hover .leftbox .title {
      color: #ffffff;
    }
    .descbox {
      float: left;
      width: 270px;
      margin-left: 11px;
      .desc {
        line-height: 30px;
        font-size: 14px;
        color: #747577;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-indent: 2em;
      }
      .more {
        color: #2475db;
        font-size: 15px;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        display: block;
      }
    }
  }
}
.solution_header{
  margin-bottom: 30px;
  ul{
    display: flex;
    justify-content: center;
    li{
      width: 180px;
      height: 65px;
      line-height: 65px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #ffffff;
      font-size: 18px;
      text-align: center;
      margin-right: 5px;
    }
    .active {
      background-color: #2475db;
    }
  }
}
@media all and (max-width: 1020px) {
  .ny_mcont {
    width: 100%;
    padding: 20px 0;
    .solutions_list {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        width: 48%;
        height: auto;
        padding: 20px 0;
        .leftbox {
          background: none;
          width: 100%;
        }
      }
      li:hover {
      background: #7bb2f6;
    }
      .leftbox {
        .imagebox {
          position: static!important;
        }
        .title {
          font-size: 14px;
          white-space: normal;
          width: 100%;
        }
      }
      .descbox {
        display: none;
      }
    }
  }
}
</style>