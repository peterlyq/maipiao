<template>
  <div>
    <div class="main">
      <div class="center-view" data-enter-time="1571280786">
        <div class="avatar" data-enter-time="1571280786" data-click-fun="track_f_347498">
          <img :src= userInfo?userInfo.headIcon:image class="avator-icon" @click="$router.push('/user')" />
          <div v-if="!userInfo" class="nick-name" @click="$router.push('/login')">立即登录</div>
          <div class="nick-name" @click="$router.push('/user')" v-if="userInfo">{{userInfo.nickName}}</div>
        </div>
        <ul class="my-order-tab">
          <li data-enter-time="1571280786" data-click-fun="track_f_814862">
            <img src="@/assets/images/cook.png" width="26px" height="26px" alt />
            <span class="mint-badge is-primary is-size-small" style="display: none;">99+</span>
            <div class="common-p" @click="$router.push('/user/order')">电影订单</div>
          </li>
          <li data-enter-time="1571280786" data-click-fun="track_f_24744">
            <img src="@/assets/images/menu.png" width="26px" height="26px" alt />
            <div class="common-p">商品订单</div>
          </li>
        </ul>

        <!---->
        <div
          class="margin-set my-card"
          data-enter-time="1571280786"
          data-click-fun="track_f_664003"
        >
          <img src="@/assets/images/mzq.png" width="20px" height="20px" alt />
          <span class="label" @click="$router.push('/user/card')">卖座券</span>
          <img src="@/assets/images/next.png" alt class="arrow" />
        </div>
        <div
          class="margin-set my-card"
          data-enter-time="1571280786"
          data-click-fun="track_f_622882"
        >
          <img src="@/assets/images/wallet.png" width="20px" height="20px" alt />
          <span class="label" @click="$router.push('/user/redpackage')">组合红包</span>
          <img src="@/assets/images/next.png" alt class="arrow" />
        </div>
        <div
          class="margin-set my-balance"
          data-enter-time="1571280786"
          data-click-fun="track_f_593614"
        >
          <img src="@/assets/images/money.png" width="20px" height="20px" alt />
          <span class="label" @click="$router.push('/user/money')">余额</span>
          <span class="value">
            <span class="price-decimal price-fmt" v-if="money">
              <i>￥</i>
              <span class="interge" style="font-size: 15px;">{{money.totalAmount}}</span>
              <span style="display: none;">.</span>
              <span class="decimal" style="font-size: 10px;"></span>
              <span style="display: none;">.</span>
              <span class="decimal" style="font-size: 10px; display: none;">00</span>
            </span>
          </span>
          <img src="@/assets/images/next.png" alt class="arrow" />
        </div>
        <div
          class="margin-set system-set"
          data-enter-time="1571280786"
          data-click-fun="track_f_214323"
        >
          <img src="@/assets/images/set.png" width="20px" height="20px" alt />
          <span class="label" @click="$router.push('/center/setting')">设置</span>
          <img src="@/assets/images/next.png" alt class="arrow" />
        </div>
      </div>
    </div>
    <mz-footer></mz-footer>
  </div>
</template>
<script>
import MzFooter from "@/components/Footer";
import {getCookie} from "@/utils/local-data";
import {getUserInfo,getCard,getMoney} from "@/api/login"
export default {
  components: {
    MzFooter
  },
  data(){
    return{
      // userId:getCookie('COOKIE_USER_ID'),
      // userName:getCookie('COOKIE_USER_NAME'),
      // mobile:getCookie('COOKIE_USER_MOBILE'),
      token:getCookie('COOKIE_USER_X_TOKEN'),
      userInfo:'',
      image:require("@/assets/images/login.png"),
      cards:'',
      money:'',
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      if(this.token){
        getUserInfo(this.token).then(res=>{
          this.userInfo = res.data
          this.getCards()
          this.getMoneyInfo()
        })
      }
    },
    getCards(){
      getCard(this.token).then(res=>{
        this.cards = res.data
      })
    },
    getMoneyInfo(){
      getMoney(this.token).then(res=>{
        console.log(res.data)
        this.money = res.data
      })
    }
  }
};
</script>
<style scoped lang="scss">
div {
  box-sizing: border-box;
}

.main,
body {
  height: 100%;
}
.center-view {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  font-size: 15px;
  background: #f4f4f4;
  margin-bottom: 59px;
  .avatar {
    .nick-name {
      font-size: 16px;
    }
    text-align: center;
    margin-top: -44px;
    height: 200px;
    padding-left: 22px;
    padding-top: 64px;
    background: url("~@/assets/images/mz.png");
    background-size: cover;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #fff;
    .avator-icon {
      width: 63px;
      height: 63px;
      border-radius: 35px;
      margin-right: 20px;
      border: 2px solid #fff;
    }
  }
  .my-order-tab {
    width: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    font-size: 13px;
    padding: 0;
    height: 79px;
    background: #fff;
    margin-bottom: 10px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    li {
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      list-style: none;
      img {
        width: 26px;
        height: 26px;
      }
      .mint-badge {
        padding: 0;
        font-size: 10px;
        height: 16px;
        line-height: 18px;
        min-width: 16px;
        background: #ff5f16;
        position: absolute;
        left: 52%;
        text-align: center;
        top: 0;
      }
      .common-p {
        color: #797d82;
      }
    }
  }
  .margin-set {
    background: #fff;
    padding: 0 15px;
    height: 49px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    img{

    width: 20px;
    height: 20px;

    }
 .label {
    margin-left: 15px;
    color: #191a1b;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
 .value {
    text-align: right;
    color: #797d82;
    padding-right: 14px;
}
.arrow {
    text-align: right;
    width: 6px;
    height: 10px;
}
  }
}
</style>