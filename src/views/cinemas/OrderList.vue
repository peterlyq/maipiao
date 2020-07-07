<template>
  <div>
    <van-nav-bar title="选座" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="yy">
      <div class="zw" v-for="item in seatList" :key="item.id">
        <div class="unbook"  :class="{'active':item.checked,'booked':item.seat_booked}" @click="choose(item)">{{item.seat_no}}</div>
      </div>
    </div>
    <div style="font-size:30px; line-height:50px;text-indent:20px">片名：{{this.$route.params.data}}</div>
    <div style="font-size:30px; line-height:50px;text-indent:20px">总价:{{totalPrice}}￥</div>

    <div class="jie">
      <div class="yi">
        <div class="duan active" v-for="item in chooseList" :key="item.id">{{item.seat_no}}号座</div>
      </div>
    </div>
    <div class="tijiao">
      <van-button type="primary" :disabled=!this.chooseList.length @click="submit">立即支付</van-button>
    </div>
    <van-dialog
      style="height:400px"
      v-model="show"
      title="支付确认"
      :beforeClose='beforeClose'
      show-cancel-button
    >
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-dialog>
  </div>
</template>
<script>
import {createOrderNo, getSeat, getCookie, payNow } from "@/utils/local-data";
export default {
  data() {
    return {
      seatList: [],
      price: this.$route.params.price,
      chooseList: [],
      totalPrice: 0,
      show: false,
      showKeyboard: true,
      value: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.$route.params.rid)
      getSeat(this.$route.params.rid).then(res => {
        if (res.status == 200) {
          this.seatList = res.data.result;
        }
        console.log(this.seatList, this.price);
      });
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length === 6) {
        this.errorInfo = "密码错误";
      } else {
        this.errorInfo = "";
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  
    submit() {
      this.show = true;
    },
    choose(seat) {
      if (seat.seat_booked == 0) {
        let index = this.chooseList.indexOf(seat);
        if (index == -1) {
          if (this.chooseList.length >= 3) {
            this.$toast.fail("只能选三个");
          } else {
            this.$set(seat, "checked", !seat.checked);
            this.chooseList.push(seat);
            this.totalPrice = this.chooseList.length * this.price;
          }
        } else {
          this.$set(seat, "checked", !seat.checked);
          this.chooseList.splice(index, 1);
          this.totalPrice = this.chooseList.length * this.price;
        }
      }
    },
    beforeClose(action, done) {
      if(action == "confirm"){
        let orderNo = createOrderNo(1)
          let user_id = getCookie('COOKIE_USER_X_ID')
payNow(user_id,this.value,orderNo,this.totalPrice,this.chooseList,this.$route.params.data).then(res=>{
             if(res.data.status == 0){
                 this.$toast(res.data.msg)
                 done()
                 this.value =''
                 this.$router.push('/user/order')
             }else{
                 this.$toast(res.data.msg)
                 done()
                 this.value = ''
             }
          })
      }else if(action =='cancel'){
          done();
          this.value =''
      }
    },

  }
};
</script>
<style scoped>
.zw {
  background-color: #999999;
  width: 90%;
  margin: 0 auto;
}
.yy {
  background: #dddddd;
  height: 300px;
}
.unbook {
  border-radius: 5px;
  float: left;
  margin: 25px 22px 0 3px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  width: 40px;
  height: 40px;
  background: grey;
  color: greenyellow;
}
.active {
  background: red;
  color: white;
}
.booked{
  background: green;
color: white;
}
.jie {
  position: fixed;
  bottom: 10px;
  height: 50px;
  width: 100%;
}
.yi {
  float: left;
  width: 100%;
  text-indent: 10px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
}
.duan {
  margin-left: 20px;
  float: left;
  width: 60px;
  text-indent: 10px;
  height: 50px;
  font-size: 15px;
  line-height: 50px;
}
.tijiao {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 60px;
}
</style>