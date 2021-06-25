
<template>
  <div>
    <!--<div class="headerTOPH"></div>-->
    <div class="headerTOPH2"></div>
    <div class="callbacks_container">
      <Swipers />
    </div>

    <div class="solution_header">
      <ul>
        <li v-for="(item,index) in tabs" :key="item.id">
          <a
            href="javascript:void(0)"
            :class="{active:active==index}"
            @click="goTab(index,item.view,item.text)"
          >{{item.text}}</a>
        </li>
      </ul>
    </div>
    <div class="mian-cur-position">
      <div class="mcp-frim maxw">
        <div class="title">
          <h2>{{title}}</h2>
          <i>/</i>
          <em>THE SOLUTION</em>
        </div>
        <div class="curpor">
          <a href="index.html">首页</a>
          <i class="icon-eec7"></i>
          <a href>{{title}}</a>
        </div>
      </div>
    </div>
    <component :is="currentView"></component>
  </div>
</template> 

<script>
import Swipers from "@/components/swipers.vue";
import solution from "@/components/SolutionTemplate.vue";
import solutionProcess from "@/components/solutionProcess.vue";
import solutionDemand from "@/components/solutionDemand.vue";
import solutionTechnology from "@/components/solutionTechnology.vue";
export default {
  components: {
    Swipers,
    solution,
    solutionProcess,
    solutionDemand,
    solutionTechnology
  },
  data() {
    return {
      currentView: "solution",
      title: "解决方案",
      tabs: [
        { id: 1, text: "解决方案", view: "solution" },
        { id: 2, text: "设计流程", view: "solutionProcess" },
        { id: 3, text: "在线需求", view: "solutionDemand" },
        { id: 4, text: "产品中心", view: "" },
        { id: 5, text: "技术支持", view: "solutionTechnology" }
      ],
      active: 0,
      bd: false
    };
  },
  created() {},
  methods: {
    goTab(index, view, text) {
      console.log('--------',index, view, text)
      if (index == 3)
        return this.$router.push({
          path: "/Product",
          query: { productId: 16, proIndex: index - 1 }
        });
      this.active = index;
      this.currentView = view;
      this.title = text;
    },

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
.solution_header {
  margin-bottom: 30px;
  ul {
    display: flex;
    justify-content: center;
    li {
      margin-right: 5px;
      a {
        display: block;
        width: 180px;
        height: 65px;
        line-height: 65px;
        background: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        font-size: 18px;
        text-align: center;
      }
      a:hover {
        background: #2475db;
      }
    }
    .active {
      background: #2475db !important;
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
          position: static !important;
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