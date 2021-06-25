<template>
  <div class="download_ctn">
    <div class="download">
      <!-- <div class="download_center"></div> -->
      <div class="download_main">
        <form id="xiazai" class="download_form">
          <label>产品系列</label>
          <select class="form-control" name="type" id="select1" @change="changeProduct($event)">
            <option value>请选择您的产品系列</option>
            <option :value="item.id" v-for="item in drive" :key="item.id">{{item.series}}</option>
          </select>
          <label>产品型号</label>
          <select class="form-control" name="model" id="select1" @change="changeType($event)">
            <option value>请选择您的产品类型</option>
            <option v-for="item in models" :key="item.id" :value="item.model">{{item.model}}</option>
          </select>
          <!-- <button type="button" class="btn btn-danger">查询</button> -->
          <div class="btn_input">
            <input
              type="button"
              name="submit1"
              value="查询"
              class="btn btn-danger"
              @click="submitted"
            />
          </div>
        </form>
        <div v-if="tableShow">
          <div class="download_tabel" v-for="item in tableDrive" :key="item.id">
          <table>
            <thead>
              <tr>
                <th class="download_text">产品型号</th>
                <th>固件版本</th>
                <th>更新日期</th>
                <th>固件大小</th>
                <th>下载</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="download_text">{{item.model}}</td>
                <td>{{item.edition}}</td>
                <td>{{item.createtime | dateFormat}}</td>
                <td>{{item.file_size}}</td>
                <td>
                  <a :href="item.file" class="label download_btn">下载</a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="particulars">
            <div class="particulars_title"><span>固件详情</span></div>
            <div class="particulars_center">
              <ul>
                <li v-for="(item1,index1) in item.context" :key="index1">{{item1}}</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const delay = (function() {
  let timer = null;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  data() {
    return {
      drive: [],
      models: [],
      tableShow: false,
      series: "",
      types: "",
      tableDrive: []
    };
  },
  created() {
    this.getDrive();
  },
  methods: {
    async getDrive() {
      let { data: res } = await this.$axios.post("Product/getSeries", {
        type: 1
      });
      if (res.code == 200) {
        this.drive = res.data;
      }
    },
    async changeProduct(event) {
      if (event.target.value) {
        this.series = event.target.value;
        let { data: res } = await this.$axios.post("Drivers/getModels", { series_id: event.target.value });
        if (res.code == 200) {
          this.models = res.data;
        } else {
          this.models = [];
          this.types = "";
        }
      } else {
        this.series = "";
        this.models = [];
      }
    },
    changeType(event) {
      if (event.target.value) {
        this.types = event.target.value;
      } else {
        this.types = "";
      }
    },
    submitted() {
      if (this.series == "")
        return this.$message.error({
          message: "请选择一款产品系列!",
          offset: 70,
          duration: 2000
        });
      if (this.types == "")
        return this.$message.error({
          message: "请选择一款产品型号!",
          offset: 70,
          duration: 2000
        });

      delay(async () => {
        let { data: res } = await this.$axios.post("Drivers", { model: this.types });
        if (res.code == 200) {
          res.data.forEach((item,index) => {
            if(item.context != null) return item.context = String(item.context).split('#')
          })
          this.tableShow = true;
          this.tableDrive = res.data;
        } else {
          this.tableShow = false;
          this.$message.error({ message: res.msg, offset: 70, duration: 2000 });
        }
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.download_text {
  width: 150px;
}
.download_right {
  padding-right: 15px !important;
}
.download_form label {
  margin: 30px 0 0 0;
  height: 40px;
  line-height: 40px;
  width: 150px;
  text-align: center;
  font-size: 16px;
  color: #282828;
  background-color: #f5faff;
  border-top: 1px;
  border-right: 1px;
  border-left: 1px;
  border-bottom: 0;
  border-style: solid;
  border-color: #d0d0d0;
}
.download {
  padding: 10px 0;
}
.download_ctn {
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  padding-bottom: 170px;
}

.download_tabel {
  margin-top: 50px;
  .tabel_title {
    padding-left: 20px;
  }
  table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    color: #5c5c5c;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
      background-color: #f5faff;
      border-top: 1px;
      border-right: 1px;
      border-left: 1px;
      border-bottom: 0;
      border-style: solid;
      border-color: #d0d0d0;
      tr {
        th {
          height: 40px;
          line-height: 40px;
          color: #282828;
          font-weight: 400;
          font-size: 16px;
          text-align: center;
        }
      }
    }
    tbody {
      border: 1px solid #d0d0d0;
      tr {
        td {
          font-size: 14px;
          text-align: center;
          vertical-align: top;
          height: 60px;
          line-height: 60px;
          .label {
            display: inline;
            padding: 0.2em 0.6em 0.3em;
            font-weight: bold;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.25em;
          }
          .download_btn {
            background-color: #6cc0ff;
            height: 25px;
            width: 40px;
            display: inline-block;
            line-height: 25px;
          }
        }
      }
    }
  }
}
.form-control {
  background-color: #ffffff;
  border-color: #d0d0d0;
  height: 40px;
  line-height: 40px;
  outline: none;
  // color: #282828;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.btn_input {
  width: 100%;
  text-align: center;
  .btn-danger {
    border: 1px solid #d0d0d0;
    background-color: #f5faff;
    color: #282828;
    width: 50%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding: 0;
    outline: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
.particulars {
  .particulars_title {
    background-color: #f5faff;
    font-size: 16px;
    color: #282828;
    height: 40px;
    line-height: 40px;
    border-top: 1px;
    border-right: 1px;
    border-left: 1px;
    border-bottom: 0;
    border-style: solid;
    border-color: #d0d0d0;
    span {
      display: inline-block;
      width: 150px;
      text-align: center;
    }
  }
  .particulars_center{
    font-size: 14px;
    border: 1px solid #d0d0d0;
    padding: 10px 0;
    text-indent: 3em;
    ul{
      li{
        
        line-height: 25px;
        letter-spacing: 2px;
      }
    }
  }
}
select{
  -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark-color(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: menulist;
    -moz-appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: -internal-light-dark-color(rgb(255, 255, 255), rgb(59, 59, 59));
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
    border-image: initial;
}
</style>