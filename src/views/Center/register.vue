<template>
  <div class="web-login">
    <div class="logo">
      <img src="@/assets/images/mzlogo.png" />
    </div>
    <div class="login-form">
      <div>
        <form>
          <div class="form-group">
            <input
              type="text"
              id="phone"
              maxlength="11"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              v-model="Tel"
              placeholder="账号至少9位"
            />
            <!-- <div :style="{'display':flag}">
              <div class="clear-mobile-btn">
                <i
                  @click="clear"
                  style="position: absolute; right: 90px; line-height: 40px; font-size: 23px; color: rgb(189, 192, 197);"
                >x</i>
              </div>
            </div>-->
            <!-- <div
              class="getSmsCode sms-code"
              :class="{'disable':flag2}"
              style="position: absolute; right: 0px; top: 13px;"
            >
            </div>-->
          </div>
          <div class="errorTip">{{errMsg}}</div>
          <div class="form-group">
            <input placeholder="密码" type="password" class="input-control" v-model="code" />
          </div>
          <div class="register">
            <span class="login" @click="register">注册</span>
          </div>
        </form>
        <!---->
      </div>
    </div>
  </div>
</template>
<script>
import { regNow } from "@/api/login";
// import { setCookie } from "@/utils/local-data";
export default {
  data() {
    return {
      Tel: "",
      code: "",
      time: 60 * 1000,
      flag: false,
      // flag1: true,
      flag2: "none",
      errMsg: "",
      response: ""
    };
  },
  // watch: {
  //   Tel(val, value) {
  //     if (val.length == 11) {
  //       this.flag1 = false;
  //     } else {
  //       this.flag1 = true;
  //     }
  //   },
  //   immediate: true
  // },
  methods: {
    register() {
      if (this.Tel.length < 9) {
        this.$toast.fail("账号格式不正确");
      } else {
        let _this = this;
        regNow(this.Tel, this.code).then(res => {
          if (res.status == 200) {
            if (res.data.status == 0) {
              _this.$toast.success(res.data.msg);
              this.$router.push("/login");
            } else {
              _this.$toast.fail(res.data.msg);
            }
          }
        });
      }
    }
    // start() {
    //   if (this.Tel !== "") {
    //     getMes(this.Tel).then(res => {
    //       this.errMsg = res.msg;
    //       this.$refs.countDown.start();
    //       this.flag = true;
    //     });
    //   } else {
    //     alert("手机号为空");
    //   }
    // },
    // finished() {
    //   this.flag = false;
    // },
    // login() {
    //   console.log(1);
    //   logNow(this.Tel, this.code).then(res => {
    //     console.log(res);
    //     if (res.status == 0) {
    //       let token = res.data.token,
    //         mobile = res.data.mobile,
    //         userName = res.data.accountName,
    //         userId = res.data.userId;
    //       setCookie("COOKIE_USER_ID", userId, { expires: 14, path: "/" });
    //       setCookie("COOKIE_USER_MOBILE", mobile, { expires: 14, path: "/" });
    //       setCookie("COOKIE_USER_NAME", userName, { expires: 14, path: "/" });
    //       setCookie("COOKIE_USER_X_TOKEN", token, { expires: 14, path: "/" });
    //       this.$router.push("/center");
    //     } else if (res.status == 6102) {
    //       alert(res.msg);
    //     }
    //   });
    // },
    // clear() {
    //   this.Tel = "";
    // }
  }
};
</script>
<style scoped lang="scss">
.disable {
  color: #bdc0c5;
}
body {
  overflow-x: hidden;
  background-color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.web-login {
  font-size: 15px;
  .logo {
    margin: 79px auto 40px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    img {
      height: 60px;
    }
  }
  .login-form {
    width: 100%;
    position: relative;
    .form-group {
      line-height: 55px;
      margin: 0 25px;
      position: relative;
      .input-control {
        height: 15px;
        line-height: 15px;
        padding: 20px 0;
        width: 100%;
        font-size: 15px;
        color: #191a1b;
        border: 0;
        outline-width: 0;
      }
    }
    .getSmsCode {
      font-size: 13px;
      position: absolute;
      top: 25px;
      right: 0;
    }
    // .login-btn {
    //   margin-top: 10px;
    // }
    .login {
      display: block;
      width: 100%;
      height: 100%;
    }
    .submit {
      line-height: 45px;
      font-size: 16px;
      margin: 10px 25px 0;
      border-radius: 3px;
      text-align: center;
      background-color: #ff5f16;
      height: 44px;
      color: #fff;
      border: none;
    }
    .register {
      line-height: 45px;
      font-size: 16px;
      margin: 10px 25px 0;
      border-radius: 3px;
      text-align: center;
      background-color: green;
      height: 44px;
      color: #fff;
      border: none;
    }
    .clear-mobile-btn {
      font-size: 13px;
      position: absolute;
      top: 8px;
      right: 0;
      display: inline-block;
    }
    .errorTip {
      text-align: left;
      color: #ff5f16;
      line-height: 11px;
      margin-left: 25px;
      font-size: 11px;
      margin-top: 7px;
    }
  }
}
.sms-code {
  line-height: 30px;
  width: 90px;
  text-align: right;
  float: right;
  font-size: 13px;
  border-radius: 3px;
  cursor: pointer;
}
</style>