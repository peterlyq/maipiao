<template>
  <div v-if="cinemaInfo" class="cinema-schedule">
    <div data-v-1ed7d58f class="header-left">
      <img data-v-1ed7d58f src="~@/assets/images/back1.png" width="11px" height="18px" @click="$router.push('/cinemas')"/>
      <img
        data-v-1ed7d58f
        src="~@/assets/images/back1.png"
        width="19px"
        height="19px"
        style="display: none;"
      />
    </div>
    <div class="header-title">
      <p>{{cinemaInfo.name}}</p>
    </div>
    <div class="tags">
      <div data-v-1ed7d58f class="tags">
        <div
          data-v-1ed7d58f
          class="tag"
          v-for="item in cinemaInfo.services"
          :key="item.description"
        >{{item.name}}</div>
        <i
          data-v-1ed7d58f
          class="tag-more iconfont icon-quanju_liebiaojiantou"
          style="font-size: 10px;"
        ></i>
      </div>
    </div>
    <div data-v-1ed7d58f class="address">
      <img data-v-1ed7d58f src="~@/assets/images/location.png" width="14px" height="21px" alt />
      <div
        data-v-1ed7d58f
        class="address-des"
        data-enter-time="1571141222"
        data-click-fun="track_f_816439"
      >北京市宣武区大栅栏街36号</div>
      <a
        data-v-1ed7d58f
        href="tel:010-63083312/63030878"
        class="tel-icon"
        data-enter-time="1571141222"
        data-click-fun="track_f_194872"
      >
        <img data-v-1ed7d58f src="~@/assets/images/phone.png" width="17px" height="18px" alt />
      </a>
    </div>
    <div >
      <cinema-banner :dat="cinemaFilm" v-if="cinemaFilm.length" @selectElv="changeFilm($event)"></cinema-banner>
      <router-view :data="activeFilmInfo" v-if="activeFilmInfo"></router-view>
    </div>
  </div>
</template>
<script>
import { getCinemaInfo, getCinemaFilms } from "@/api/cinema";
import CinemaBanner from "./components/Banner";
export default {
  components: {
    CinemaBanner
  },
  data() {
    return {
      cid: 0,
      cinemaInfo: null,
      cinemaFilm: [],
      activeFilmInfo: null
    };
  },
  watch: {
    "$route.params.cid": {
      handler(val) {
        this.cid = val;
        this.getCinemaDetail();
        this.getFilms();
      },
      immediate: true
    }
  },
  methods: {
    getCinemaDetail() {
      getCinemaInfo({ cid: this.cid }).then(res => {
        this.cinemaInfo = res.data.cinema;
      });
    },
    getFilms() {
      getCinemaFilms({ cid: this.cid }).then(res => {
        this.cinemaFilm = res.data.films;
        // console.log(this.cinemaFilm[0])
      });
    },
    changeFilm(val) {
      this.activeFilmInfo = this.cinemaFilm[val];
      let date = this.activeFilmInfo.showDate[0];
      console.log(this.activeFilmInfo);
      this.$router.push(
        `/cinemas/${this.cid}/film/${this.activeFilmInfo.filmId}/${date}`
      );
    }
  }
};
</script>
<style scoped lang="scss">
.address {
    height: 50px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-left: 17px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    .address-des {
    font-size: 14px;
    height: 20px;
    padding: 0 12px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  

}
.tel-icon[data-v-1ed7d58f] {
    // height: 18px;  
    padding: 0 25px;
      outline: 0 none;
    border: none;
}
}
.cinema-schedule {
  overflow: hidden;
  padding-top: 44px;
  background: #fff;
  min-height: 100vh;
}
.header-left[data-v-1ed7d58f] {
  position: fixed;
  top: 0;
  height: 44px;
  line-height: 44px;
  padding-left: 15px;
  z-index: 303;
}
.header-title {
  position: relative;
  text-align: center;
  font-size: 17px;
  color: #191a1b;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: 0 15px;
  background: #fff;
  top: 0;
  height: 44px;
  line-height: 44px;
  z-index: 302;
}
.tags {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 15px;
  color: #ffb232;
  overflow: hidden;
  position: relative;
  padding: 5px 0 15px;
}
.tag {
  position: relative;
  padding: 0 6px;
  margin: 0 2.5px;
  font-size: 10px;
}
</style>