<template>
  <div class="main">
    <van-nav-bar title="我的资料" left-arrow @click-left="$router.go(-1)" />
    <div class="center">
      <div class="head">
        <van-cell is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <div class="custom-title label">头像</div>
            <input type="file" class="photo" />
            <img src="~@/assets/images/my.png" />
          </template>
        </van-cell>
      </div>
      <van-cell title="昵称" is-link v-model="nickName" />

      <van-cell @click-overlay="fun()" is-link @click="showPopup">
        性别
        <p style="float:right;">{{gender}}</p>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" @click="fun">
        <div class="xuan">
          <p>选择性别</p>
          <p>男</p>
          <p>女</p>
          <p>取消</p>
        </div>
      </van-popup>
      <van-cell @click-overlay="fun()" is-link @click="showPopup1">
        出生日期
        <p style="float:right;">{{birthday}}</p>
       
      </van-cell>
      <van-popup v-model="show1" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker v-model="currentDate" type="date" @confirm="chooseBirthday"/>
      </van-popup>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickName: "131****1049",
      gender: "请选择",
      birthday: "请选择",
      show: false,
      show1:false,
      currentDate: new Date(),
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    showPopup1(){
        
        this.show1 = true
       
    },
    chooseBirthday(val){
        this.birthday = val
        this.show1 = false
    },
    fun(val, value) {
        this.gender= val.srcElement.innerHTML
      this.show = false;
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