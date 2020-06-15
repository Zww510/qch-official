<template>
  <div class="download_ctn">
    <div class="download">
      <div class="download_center"></div>
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
          <input type="button" name="submit1" value="查询" class="btn btn-danger" @click="submitted" />
        </form>
        <div class="download_tabel" v-if="tableShow">
          <table>
            <thead>
              <tr>
                <th class="tabel_title">名称</th>
                <th>下载</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableDrive" :key="item.id">
                <td>{{item.model}}</td>
                <td>
                  <a :href="item.file" class="label">下载</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      console.log("下拉选中数据", event.target.value);
      if (event.target.value) {
        this.series = event.target.value;
        let { data: res } = await this.$axios.post("Drivers/getModels", {
          series_id: event.target.value
        });
        if (res.code == 200) {
          this.models = res.data;
        }
      }else {
        this.series = ''
        this.models = []
      }
    },
    changeType(event) {
      if (event.target.value) {
        this.types = event.target.value;
      }else {
        this.types = ''
      }
    },
    async submitted() {
      console.log('------',this.series)
      if (this.series == "") {
        this.$message.error({message: '请选择一款产品系列!', offset: 70, duration: 2000})
        return;
      } else if (this.types == "") {
        this.$message.error({message: '请选择一款产品型号!', offset: 70, duration: 2000})
        return;
      } else {
        let { data: res } = await this.$axios.post("Drivers", {
          model: this.types
        });
        if (res.code == 200) {
          this.tableShow = true;
          this.tableDrive = [res.data];
        } else {
          this.tableShow = false;
          this.$message.error({message: res.msg, offset: 70, duration: 2000})
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.download{
  padding: 10px 0;
}
.download_ctn {
  background-color: #000000;
  height: 100%;
  width: 100%;
  padding-bottom: 50px;
}

.download_tabel {
  margin-top: 50px;
  table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    color: #eee;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 14px;
    thead {
      background-color: #dc0f32;
      padding: 0 10px;
      tr {
        th {
          padding: 8px;
          line-height: 1.42857143;
          vertical-align: top;
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
        .tabel_title {
          width: 80%;
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 8px;
          line-height: 1.42857143;
          vertical-align: top;
          border-top: 1px solid #ddd;
          border-top-color: rgba(255, 255, 255, 0.1);
          .label {
            display: inline;
            padding: 0.2em 0.6em 0.3em;
            font-size: 75%;
            font-weight: bold;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.25em;
            background-color: #d9534f;
          }
        }
      }
    }
  }
}
</style>