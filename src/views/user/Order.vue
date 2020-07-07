<template>
  <div class="main">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <div v-for="item in list" :key="item.id">
      <div class="list">
        <div class="button">
          <van-button type="info" @click="del(item.id)">删除</van-button>
        </div>
        <p class="name">订单号:{{item.order_no}}</p>
        <p class="name">片名:{{item.goods_name}} 单价:{{item.price}} 数量:{{item.number}}</p>
        <p class="name">总价:{{item.number * item.price}} 支付状态 : {{item.status?'已支付':'未支付'}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrder, delOrder } from "../../utils/local-data";
import { getCookie, setCookie } from "@/utils/local-data";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getOrder(getCookie("COOKIE_USER_X_ID")).then(res => {
        if (res.status == 200 && res.data.status == 0) {
          this.list = res.data.data;
        }
      });
    },
    del(id) {
      this.$dialog.confirm({
        title: "删除警告",
        message: "确定删除？"
      })
        .then(() => {
          delOrder(id).then(res => {
        if (res.status == 200 && res.data.status == 0) {
          this.$toast(res.data.msg);
          location.reload();
        }
      });
        })
        .catch(() => {
          // on cancel
        });
     
    }
  }
};
</script>
<style scoped lang = "scss">
.list {
  height: 70px;
  position: relative;
}
.name {
  text-indent: 10px;
  line-height: 20px;
  font-size: 15px;
}
.button {
  float: right;
}
</style>