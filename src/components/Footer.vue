<template>
  <van-tabbar route v-model="active"  active-color="#ff5f16">
    <van-tabbar-item :info= msg  to="/films/nowPlaying">
      <span>电影</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal" />
    </van-tabbar-item>

    <van-tabbar-item :info= msg  to="/cinemas">
      <span>影院</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.normal" />
    </van-tabbar-item>

    <van-tabbar-item :info= msg  to="/consult">
      <span>咨询</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon2.active : icon2.normal" />
    </van-tabbar-item>
    <van-tabbar-item :info= msg  to="/center">
      <span>我的</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon3.active : icon3.normal" />
    </van-tabbar-item>
</van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      msg: "",
      icon: {
        normal: require("@/assets/images/film1.png"),
        active: require("@/assets/images/film.png")
      },
      icon1: {
        normal: require("@/assets/images/download.png"),
        active: require("@/assets/images/download1.png")
      },
      icon2: {
        normal: require("@/assets/images/news.png"),
        active: require("@/assets/images/news.png")
      },
      icon3: {
        normal: require("@/assets/images/my1.png"),
        active: require("@/assets/images/my.png")
      }
    };
  }
};
</script>
