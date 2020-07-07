<template>
  <div class="web-login">
    <van-nav-bar title="修改密码" left-arrow @click-left="$router.go(-1)" />
    <div class="logo"></div>
    <div class="login-form">
      <div>
        <form>
          <div class="form-group">
            <div class="form-group">
              <input placeholder="请输入原密码" type="password" class="input-control" v-model="password" />
            </div>
            <div class="form-group">
              <input placeholder="新密码" type="password" class="input-control" v-model="newpass" />
            </div>
            <div class="form-group">
              <input placeholder="新密码" type="password" class="input-control" v-model="newpass1" />
            </div>
          </div>
          <div class="submit">
            
            <span class="login" @click="submit">确定</span>
          </div>
          <div class="register">
             <router-link :to="{path:'changePayPass'}">
              <span class="login">修改支付密码</span>
            </router-link>
          </div>
        </form>
        <!---->
      </div>
    </div>
  </div>
</template>
<script>
import { changePass } from "@/api/login";
import { getCookie, delCookie } from "@/utils/local-data";
export default {
  data() {
    return {
      password: "",
      newpass: "",
      newpass1: ""
    };
  },
  methods: {
    submit() {
      let _this = this;
      if (this.password && this.newpass && this.newpass1) {
        if (this.newpass != this.newpass1) {
          this.$toast.fail("两次密码不一致");
        } else if (this.password == this.newpass) {
          this.$toast.fail("新密码不能与旧密码相同");
        } else {
          changePass(
            getCookie("COOKIE_USER_NAME"),
            this.password,
            this.newpass
          ).then(res => {
            console.log(res);
            if (res.data.status == 0) {
              delCookie("COOKIE_USER_NAME");
              delCookie("COOKIE_USER_X_TOKEN");
              delCookie("COOKIE_USER_X_ID");
              this.$toast.success("密码已修改，请重新登录");
              _this.$router.go(0);
            }
          });
        }
      } else {
        this.$toast.fail("请填写完整");
      }
    }
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
    margin: 40px auto 40px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    img {
      height: 30px;
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
      // width: 100%;
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