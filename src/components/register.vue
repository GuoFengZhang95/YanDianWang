<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>注册</span>
      <span @click="goLogin()">登录</span>
    </div>
    <ul>
      <li>手机号：</li>
      <li class="underline">
        <label for class="fl">
          <input type="number" @blur="telBlur" @focus="telFocus" v-model="tel" />
          <span class="tip" v-show="telFlag==true" ref="tel">请输入手机号!</span>
        </label>
      </li>
      <li>密码：</li>
      <li class="underline">
        <label for class="fl">
          <input type="password" @blur="passBlur" @focus="passFocus" v-model="pass" />
          <span class="tip" v-show="passFlag==true" ref="pass">请输入密码!</span>
        </label>
      </li>
      <li>
        <span>验证码：</span>
        <span @click="getVcode()" ref="vcode">点击获取</span>
      </li>
      <li class="underline">
        <label for class="fl">
          <input type="number" v-model="vcode" @blur="vCodeBlur()" @focus="vCodeFocus()" />
          <span class="tip" v-show="vcodeFlag==true" ref="vCode">请输入验证码!</span>
        </label>
      </li>
      <li @click="register()">下一步</li>
      <li class="clearfix">
        <label for class="fl">
          <input type="checkbox" v-model="checked" @change="agree()" />
        </label>
        <span class="fl">我已阅读并同意使用条款是隐私政策</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // v-model
      checked: true,
      tel: "",
      pass: "",
      vcode: "",
      vcodeFlag: false,
      telFlag: false,
      passFlag: false,
      jugeArr: [false, false, false, false],
      // 正则
      reg: {
        telReg: /^1[3456789]\d{9}$/,
        passReg: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,20}$/
      },
      // 验证码
      timer: null,
      count: 10,
      onOff: true
      // 手机接口返回数据
    };
  },
  methods: {
    // 前往登录页面
    goLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    // 电话框事件
    telBlur() {
      if (this.tel == "") {
        this.telFlag = true;
        this.jugeArr[0] = false;
      } else if (this.reg.telReg.test(this.tel) == false) {
        this.telFlag = true;
        this.tel = "";
        this.$refs.tel.innerHTML = "请输入正确的手机号码";
        this.jugeArr[0] = false;
      } else {
        // 调取网易云接口，检查手机号是否已注册
        this.$axios({
          url: "http://localhost:3000/cellphone/existence/check",
          params: {
            phone: this.tel
          }
        }).then(res => {
          if (res.data.exist == 1) {
            this.tel = "";
            this.telFlag = true;
            this.$refs.tel.innerHTML = "该手机号已注册";
            this.jugeArr[0] = false;
          } else {
            // 手机号可以注册
            this.jugeArr[0] = true;
          }
        });
      }
    },
    telFocus() {
      this.vcodeFlag = false;
      this.telFlag = false;
    },
    // 密码框事件
    passBlur() {
      if (this.pass == "") {
        this.passFlag = true;
      } else if (this.reg.passReg.test(this.pass) == false) {
        this.passFlag = true;
        this.pass = "";
        this.$refs.pass.innerHTML = "请输入正确的密码";
        this.jugeArr[1] = false;
      } else {
        this.jugeArr[1] = true;
      }
    },
    passFocus() {
      this.passFlag = false;
    },
    // 验证码相关
    getVcode() {
      if (this.jugeArr[0] == 1) {
        if (this.onOff == true) {
          // 调去网易云验证码接口
          this.$axios({
            url: "http://localhost:3000/captcha/sent",
            params: {
              phone: this.tel
            }
          }).then(res => {
            // console.log(res);
          });
          this.onOff = false;
          this.timer = setInterval(() => {
            if (this.count == 0) {
              this.$refs.vcode.innerHTML = "发送验证码";
              clearInterval(this.timer);
              this.onOff = true;
              // 重置倒计时起始值
              this.count = 10;
            } else {
              this.count--;
              this.$refs.vcode.innerHTML = `${this.count}秒后再次发送`;
            }
          }, 1000);
        } else {
          return;
        }
      } else {
        this.vcodeFlag = true;
        this.$refs.vCode.innerHTML = "请先输入正确的手机号";
        return;
      }
    },
    // 失去焦点
    vCodeBlur() {
      if (this.vcode == "") {
        this.vcodeFlag = true;
        this.jugeArr[2] = false;
        this.$refs.vCode.innerHTML = "请输入验证码";
      } else {
        this.jugeArr[2] = true;
      }
    },
    // 得到焦点
    vCodeFocus() {
      this.vcodeFlag = false;
    },
    // 同意协议
    agree() {
      this.jugeArr[3] = this.checked;
    },
    // 注册
    register() {
      this.$router.push({
        path: "/login",
        query: {}
      });
      // 判断所有条件是否都已满足
      // let bool = this.jugeArr.every(item => {
      //   return item == true;
      // });s
      // if (bool) {
      //   // 调取接口，验证验证码是否正确
      //   this.$axios({
      //     url: "http://localhost:3000/captcha/verify",
      //     params: {
      //       phone: this.tel,
      //       captcha: this.vcode
      //     }
      //   }).then(res => {
      //     if (res.data.code == 200) {
      //       this.$router.go({
      //         path: "/login"
      //       });
      //     }
      //   });
      // } else {
      //   return;
      // }
    }
  }
};
</script>
<style lang="" scoped>
.top {
  width: 100%;
  height: 1.36rem;
  box-sizing: border-box;
  background-image: url(../assets/images/class-top.jpg);
  background-size: 100% 100%;
  color: white;
  font-size: 0.36rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.35rem 0.29rem;
  align-items: flex-end;
}
ul {
  width: 6.02rem;
  margin: 2.45rem auto 0;
}
ul li {
  height: 0.46rem;
  line-height: 0.46rem;
  font-size: 0.32rem;
  box-sizing: border-box;
  position: relative;
}
/* 提示span */
ul li .tip {
  position: absolute;
  left: 0.1rem;
  top: 0.02rem;
  color: red;
  font-size: 0.26rem;
  /* z-index: -1; */
}
ul li:nth-child(2n) {
  margin-bottom: 0.4rem;
}
ul li label {
  width: 100%;
}
ul li label input {
  border: none;
  width: 100%;
  height: 0.4rem;
  float: left;
  font-size: 0.3rem;
}
ul li:nth-child(5) span:nth-child(2) {
  color: #fe0041;
  float: right;
  margin-right: 0.2rem;
}
ul > li.underline {
  border-bottom: 0.01rem solid #7a7a7a;
}
ul li:nth-child(7) {
  text-align: center;
  height: 1.01rem;
  line-height: 1.01rem;
  color: white;
  background-color: #ff9900;
  border-radius: 0.1rem;
  margin-bottom: 0.4rem;
}
ul li:nth-child(8) span {
  margin-left: 0.2rem;
  font-size: 0.28rem;
  color: #666666;
}
ul li:nth-child(8) label {
  margin-top: 0.03rem;
  width: 0.3rem;
  height: 0.3rem;
}
</style>