<template>
  <div style="margin:100px 0 ">
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
  created() {
    let data = JSON.parse(localStorage.getItem("home"));

    if (data) {
      this.homeDate = data;
    }
  }
};
</script>