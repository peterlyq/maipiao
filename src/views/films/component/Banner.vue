<template>
  <div>
    <div class="city-fixed" data-enter-time="1571128717" data-click-fun="track_f_259508">
      <router-link to="/city">{{$store.state.cityName}}</router-link>
     
    </div>
    <div class="swiper-container banner-wrap">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in data" :key="item.bannerId">
          <router-link :to="'/film/'+JSON.parse(item.actionData).businessId">
            <img :src="item.imgUrl" alt />
          </router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  props: ["data"],
  mounted() {
    // console.log(this.data )
    var swiper = new Swiper(".swiper-container", {
      autoplay: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>
<style scoped>
/* 在css中要用@符号需要~转义 */
@import url("~@/assets/css/swiper.min.css");
.banner-wrap {
  height: 4.2rem;
  background-color: #ccc;
}
.banner-wrap img {
  width: 100%;
}
a{
  color: white
}
.city-fixed {
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0,0,0,.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;
}
</style>
