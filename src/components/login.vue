<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>登录</span>
      <span @click="goRegister()">注册</span>
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
        <span class="fr">忘记密码</span>
      </li>

      <li @click="login()">登陆</li>
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
      reg: {
        telReg: /^1[3456789]\d{9}$/,
        passReg: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,20}$/
      },
      jugeArr: [false, false]
    };
  },
  methods: {
    // 电话框事件
    telBlur() {
      if (this.tel == "") {
        this.telFlag = true;
      } else if (this.reg.telReg.test(this.tel) == false) {
        this.telFlag = true;
        this.tel = "";
        this.$refs.tel.innerHTML = "请输入正确的手机号码";
        this.jugeArr[0] = false;
      } else {
        this.jugeArr[0] = true;
      }
    },
    telFocus() {
      this.telFlag = false;
    },
    // 密码框事件
    passBlur() {
      if (this.pass == "") {
        this.passFlag = true;
      } else {
        this.jugeArr[1] = true;
      }
    },
    passFocus() {
      this.passFlag = false;
    },
    // 前往注册页面
    goRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    // 登录
    login() {
      let bool = this.jugeArr.every(item => {
        return item == true;
      });
      if (bool) {
        // 调取登录接口
        this.$axios({
          url: "http://localhost:3000/login/cellphone",
          params: {
            phone: this.tel,
            password: this.pass
          }
        }).then(res => {
          console.log(res);
        });
      }
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
  margin-bottom: 0.3rem;
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
ul li:nth-child(5) {
  margin-bottom: 0.2rem;
}
ul li:nth-child(5) span {
  color: #666666;
  float: right;
  margin-right: 0.2rem;
}
ul > li.underline {
  border-bottom: 0.01rem solid #7a7a7a;
}
ul li:nth-child(6) {
  text-align: center;
  height: 1.01rem;
  line-height: 1.01rem;
  color: white;
  background-color: #ff9900;
  border-radius: 0.1rem;
  margin-bottom: 0.4rem;
}
</style>