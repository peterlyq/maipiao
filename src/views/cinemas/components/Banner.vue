<template>
    <div class="swiper-container cinema-detail-banner" >
    <div class="swiper-wrapper" >
      <div class="swiper-slide" v-for="item in dat" :key="item.filmId"><img :src="item.poster"/></div>
      
    </div>
   
  </div>
</template>
<script>
import Swiper from "swiper"
export default {
    props:['dat'],
    mounted(){
        
        this.initSwiper()
    },
    methods:{
    initSwiper(){
      let _this = this
      var swiper = new Swiper('.cinema-detail-banner', {
      slidesPerView: 3,
      spaceBetween: 30,
    centeredSlides: true,
      slideToClickedSlide:true,
      on:{
    transitionEnd: function(){
      // console.log(this.activeIndex)
      _this.$emit("selectElv",this.activeIndex)
    },
  },
    });
        }
    }
}
</script>
<style scoped lang="scss">
@import url("~@/assets/css/swiper.min.css");
.cinema-detail-banner {
  height: 3.2rem;
  background-color: #ccc;
  .swiper-wrapper {
    align-items: center;
  }
  .swiper-slide {
    height: 2.6rem;
    width: 1.8rem;
    transition: 300ms;
    transform: scale(0.8);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    transform: scale(1);
     img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>