<template>
  <div>
    <!-- <div class="main-banner">
      <img src="../assets/image/banner-1.jpg" alt />
    </div> -->

    <div class="mian-cur-position">
      <div class="mcp-frim maxw">
        <div class="title">
          <h2>关于我们</h2>
          <i>/</i>
          <em>About us</em>
        </div>
        <div class="curpor">
          <a href="index.html">首页</a>
          <i class="icon-eec7"></i>
          <a href>关于我们</a>
        </div>
      </div>
    </div>

    <div id="show-about"></div>
    <div class="about-title maxw">
      <span>公司简介</span>
      <i></i>
      <em>Company profile</em>
    </div>

    <div class="about-frame">
      <!--MainContent start-->
      <div class="MainContent">
        <img :src="homeDate.company" />
        <p>&nbsp;</p>
        <p>{{homeDate.company_profile}}</p>
      </div>
      <!--MainContent end-->
    </div>

    <div id="show-contact" style="margin-top:30px"></div>
    <div class="about-title maxw">
      <span>联系我们</span>
      <i></i>
      <em>Contact us</em>
    </div>
    <!--百度地图容器-->
    <div id="dituContent"></div>

    <div class="about-contact-info">
      <div class="item">
        <i class="icon-eec5"></i>
        <dl></dl>
        <div class="text tel">
          <h3>联系电话</h3>
          <a>{{homeDate.phone}}</a>
        </div>
      </div>
      <div class="item">
        <i class="icon-edc4"></i>
        <dl></dl>
        <div class="text address">
          <h3>公司地址</h3>
          <a>{{homeDate.adress}}</a>
        </div>
      </div>
      <div class="item">
        <i class="icon-ed24"></i>
        <dl></dl>
        <div class="text tel">
          <h3>邮箱地址</h3>
          <a>{{homeDate.email}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeDate: {}
    };
  },
  mounted() {
    this.dbMap();
    let data = JSON.parse(localStorage.getItem('home'));
    console.log('---------',data)
    if(data) {
      this.homeDate = data
    }
  },
  methods: {
    dbMap() {
      this.createMap(); //创建地图
      this.setMapEvent(); //设置地图事件
      this.addMapControl(); //向地图添加控件
      this.addMarker(); //向地图中添加marker
    },
    createMap() {
      var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
      var point = new BMap.Point(114.043672, 22.64598); //定义一个中心点坐标
      map.centerAndZoom(point, 15); //设定地图的中心点和坐标并将地图显示在地图容器中
      window.map = map; //将map变量存储在全局
    },
    setMapEvent() {
      map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
      //map.enableScrollWheelZoom();//启用地图滚轮放大缩小
      map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
      map.enableKeyboard(); //启用键盘上下左右键移动地图
    },
    addMapControl() {
      //向地图中添加缩放控件
      var ctrl_nav = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
      });
      map.addControl(ctrl_nav);
      //向地图中添加缩略图控件
      var ctrl_ove = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
      });
      map.addControl(ctrl_ove);
      //向地图中添加比例尺控件
      var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
      map.addControl(ctrl_sca);
    },
    addMarker() {
      var marker = new BMap.Marker(new BMap.Point(114.043672, 22.64598));
      //map.addOverlay(marker);
      var opts = {
        width: 300, // 信息窗口宽度
        height: 70, // 信息窗口高度
        title: "七彩虹" // 信息窗口标题
      };
      var infoWindow = new BMap.InfoWindow("地址：深圳市龙华区民治街道民治大道展滔科技大厦C座7层706", opts); // 创建信息窗口对象
      map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
    }
  }
};
</script>

<style>
.con {
  text-align: left;
}
.MainContent p{
	margin:0;
	line-height:24px;
	font-size:16px;
	color:#fff;
	padding:0;
}
</style>