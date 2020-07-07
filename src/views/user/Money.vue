<template>
  <div class="main">
    <van-nav-bar title="余额" left-arrow @click-left="$router.go(-1)" />
    <div class="bg">
      <div class="yue">当前余额</div>
      <div class="money">￥{{money}}.00</div>
    </div>

    <div class="addMoney">
      <van-field v-model="addmoney" type="number" label="金额" />
    </div>
    <div class="goSchedule" @click="addMoney">余额充值</div>
  </div>
</template>
<script>
import { getMoney } from "../../api/login";
import { getCookie, setCookie, add } from "@/utils/local-data";
export default {
  data() {
    return {
      money: 0,
      addmoney: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getMoney(
        getCookie("COOKIE_USER_X_TOKEN"),
        getCookie("COOKIE_USER_X_ID")
      ).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.money = res.data.have_money;
        }
      });
    },
    addMoney() {
      if (this.addmoney < 0 || this.addmoney == 0) {
        this.$toast("输入错误，请重试");
      } else {
        let all = +this.money + +this.addmoney;
        add(getCookie("COOKIE_USER_X_ID"), all).then(res => {
          if (res.status == 200 && res.data.status == 0) {
            this.$toast(res.data.msg);
            this.$router.go(0);
          }
        });
      }
    }
  }
};
</script>
<style scoped lang = "scss">
.bg {
  width: 100%;
  height: 150px;
  background: url("../../assets/images/3.png");
}
.yue {
  line-height: 50px;
  font-size: 13px;
  color: white;
  text-align: center;
}
.money {
  color: white;
  font-size: 50px;
  text-align: center;
}
.addMoney {
  position: fixed;
  bottom: 49px;
  left: 0;
}
.goSchedule {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
}
</style>