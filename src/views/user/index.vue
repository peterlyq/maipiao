<template>
  <div class="main">
    <van-nav-bar title="我的资料" left-arrow @click-left="$router.go(-1)" />
    <div class="center">
      <div class="head">
        <van-field v-model="imgUrl" type="imgUrl" label="头像链接" />
      </div>
      <van-field
        placeholder="最长10个字符"
        v-model="nickName"
        type="nickName"
        label="昵称"
        input-align="right"
        maxlength="10"
      />
      <van-cell @click-overlay="fun()" is-link @click="showPopup">
        性别
        <p style="float:right;">{{gender}}</p>
      </van-cell>
      <van-popup v-model="show" position="bottom" req :style="{ height: '30%' }" @click="fun">
        <div class="xuan">
          <p>选择性别</p>
          <p>男</p>
          <p>女</p>
          <p>取消</p>
        </div>
      </van-popup>
      <van-field
        v-model="phoneNumber"
        required
        label="手机号"
        placeholder="请输入手机号"
        input-align="right"
        maxlength="11"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
      <van-button type="primary" size="large" @click="submit">保存</van-button>
    </div>
  </div>
</template>
<script>
import { getCookie, delCookie } from "@/utils/local-data";
import { getUserInfo, saveUser } from "../../api/login";
export default {
  data() {
    return {
      nickName: "",
      gender: "",
      phoneNumber: "",
      show: false,
      show1: false,
      currentDate: new Date()
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getUserInfo(
        getCookie("COOKIE_USER_X_TOKEN"),
        getCookie("COOKIE_USER_NAME")
      ).then(res => {
        if (res.status == 200) {
          this.nickName = res.data.data.nickname
            ? res.data.data.nickname
            : "未设置";
          this.gender = res.data.data.sex ? res.data.data.sex : "未设置";
          this.phoneNumber = res.data.data.phone_num;
          this.imgUrl = res.data.data.img_url;
        }
      });
    },
    showPopup() {
      this.show = true;
    },
    showPopup1() {
      this.show1 = true;
    },
    chooseBirthday(val) {
      this.birthday = val;
      this.show1 = false;
    },
    fun(val, value) {
      if(val.srcElement.innerHTML == "取消"){
        this.show = false;
      }else{
      this.gender = val.srcElement.innerHTML;
      this.show = false;
      }
     
    },
      checknumber (String) {
      var reg = /^[0-9]+.?[0-9]*$/
      if (reg.test(String)) {
        return true
      }
      return false
    },
    submit() {
      if(this.gender&&this.phoneNumber&&this.imgUrl){
         if(this.phoneNumber.toString().length != 11){
        this.$toast("手机号格式错误！");  
        return
      } else{
        saveUser(getCookie("COOKIE_USER_X_TOKEN"), {
          nickname: this.nickName,
          sex: this.gender,
          phone_num: this.phoneNumber,
          img_url: this.imgUrl,
          id: getCookie("COOKIE_USER_X_ID")
        }).then(res => {
          if (res.status == 200) {
            this.$toast(res.data.msg);
            this.$router.push("/center");
          }
          this.$toast(res.data.msg);
        });
      }
    }else{
      this.$toast('输入信息不完整，请完善')
    }
  }
 }
      
};
</script>
<style scoped lang = "scss">
body .main {
  width: 100%;
  height: 600px;
  background: #f4f4f4;
}
.center {
  margin-top: 10px;
  background: #fff;
}
.xuan {
  p {
    text-align: center;
    color: #191a1b;
    font-size: 15px;
    height: 49px;
    line-height: 49px;
  }
}
.head {
  position: relative;
  height: 70px;
  line-height: 70px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 15px;
  color: #191a1b;
  .label {
    line-height: 70px;
    width: 30px;
    height: 69px;
    float: left;
  }
  .van-cell__right-icon {
    line-height: 69px;
  }
  img {
    float: right;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-top: 10px;
  }
}
.photo {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 360px;
  height: 70px;
}
</style>