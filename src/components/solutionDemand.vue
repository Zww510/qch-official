<template>
  <div class="nycont">
    <div class="ny_mcont">
      <div class="form_zxxq2">
        <div class="fromcont">
          <p class="p title">
            <span>在线需求</span>
          </p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <ul class="ul list">
              <li class="block1">
                <div class="items name req">
                  <el-form-item prop="company_name">
                    <span class="tip">公司名称</span>
                    <el-input v-model="ruleForm.company_name"></el-input>
                  </el-form-item>
                </div>
                <div class="items address req">
                  <el-form-item prop="company_addr">
                    <span class="tip">公司地址</span>
                    <el-input v-model="ruleForm.company_addr"></el-input>
                  </el-form-item>
                </div>
                <div class="items man req">
                  <el-form-item prop="contacts">
                    <span class="tip">联系人</span>
                    <el-input v-model="ruleForm.contacts"></el-input>
                  </el-form-item>
                </div>
                <div class="items tel req">
                  <el-form-item prop="phone">
                    <span class="tip">联系电话</span>
                    <el-input v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </div>
                <div class="items email req">
                  <el-form-item prop="email">
                    <span class="tip">邮箱</span>
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="block2">
                <div class="items desc req">
                  <span class="tip">公司介绍</span>
                  <el-form-item class="textareas" prop="company_duce">
                    <el-input type="textarea" v-model="ruleForm.company_duce"></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="block3">
                <div class="items message req">
                  <span class="tip">需求</span>
                  <el-form-item class="textareas" prop="demand">
                    <el-input type="textarea" v-model="ruleForm.demand"></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="block4">
                <el-button type="primary" class="block_button" @click="submitForm('ruleForm')">立即提交</el-button>
              </li>
            </ul>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      ruleForm: {
        company_name: "",
        company_addr: "",
        contacts: "",
        phone: "",
        email: "",
        company_duce: "",
        demand: ""
      },
      rules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        company_addr: [
          { required: true, message: "请输入公司地址", trigger: "blur" }
        ],
        company_duce: [
          { required: true, message: "请输入公司介绍", trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, required: true, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        demand: [{ required: true, message: "请输入需求", trigger: "blur" }]
      }
    };
  },
  methods: {
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            company_name: this.name,
            company_addr: this.address,
            contacts: this.affiliation,
            phone: this.phone,
            email: this.email,
            company_duce: this.introduce,
            demand: this.need
          };
          console.log("表单提交", valid, this.ruleFor);
          this.$axios
            .post("Demand/addDemand", this.ruleForm)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success",
                  offset: 70,
                });
              }
            })
            .catch(err => {
              this.$message.error({
                message: err.data.msg,
                offset: 70,
                duration: 2000
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.nycont {
  padding: 0 35px;
  background: white;
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  .ny_mcont {
    padding: 35px 0 80px;
    min-height: 500px;
    .form_zxxq2 {
      width: 100%;
      height: 100%;
      .fromcont {
        height: 555px;
      }
      .title {
        text-align: center;
        padding: 0px 0 25px;
        border-bottom: 1px solid #dcdcdc;
        margin-bottom: 25px;
        span {
          color: #525151;
          background: url(../assets/image/form_line.jpg) left bottom no-repeat;
          padding-left: 12px;
          display: inline-block;
          font-size: 26px;
          line-height: 26px;
        }
      }
      .list {
        overflow: hidden;
        li {
          float: left;
        }
        li.block1 {
          overflow: hidden;
          width: 940px;
        }
        li.block2 {
          width: 260px;
        }
        li.block3 {
          width: 100%;
        }
      }
      .block1 {
        .items {
          float: left;
          margin: 0 31px 24px 0;
        }
      }
      .name {
        width: 258px;
      }
      .address {
        width: 258px;
      }
      .man {
        width: 258px;
      }
      .email {
        width: 258px;
      }
      .tel {
        width: 550px;
      }
      .items {
        .tip {
          background: url(../assets/image/tip_icon.jpg) left center no-repeat;
          padding-left: 20px;
          display: block;
          line-height: 30px;
          font-size: 16px;
          color: #227bea;
          text-align: left;
        }

        input[type="text"] {
          box-sizing: border-box;
          border: 1px solid #cecece;
          border-radius: 3px;
          width: 100%;
          padding: 0 5px;
          line-height: 32px;
          height: 34px;
          font-size: 13px;
          background: none;
        }
        textarea {
          box-sizing: border-box;
          border: 1px solid #cecece;
          border-radius: 3px;
          width: 100%;
          padding: 10px 5px;
          height: 122px;
          font-size: 13px;
          background: none;
        }
      }
      .req {
        .tip:after {
          content: "*";
          color: #f22807;
          font-size: 14px;
          padding-left: 4px;
          font-weight: bold;
        }
      }
      .desc {
        width: 100%;
      }
      .message {
        width: 100%;
      }
      .block4 {
        float: none;
        width: 100%;
        input {
          cursor: pointer;
          display: block;
          width: 180px;
          height: 50px;
          background: #378af2;
          text-align: center;
          color: #fff;
          font-size: 20px;
          line-height: 50px;
          margin: 20px auto 0;
          border: none;
        }
      }
    }
  }
}
.el-form-item {
  margin: 0;
}
.block_button {
  cursor: pointer;
  display: block;
  width: 180px;
  height: 50px;
  background: #378af2;
  text-align: center;
  color: #fff;
  font-size: 20px;
  margin: 20px auto 0;
  border: none;
}
</style>