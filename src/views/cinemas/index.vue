<template>
  <div>
    <cinema-header></cinema-header>
    <div class="cinema-list-tag">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="fun" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>
    <cinema-list></cinema-list>
    <mz-footer></mz-footer>
  </div>
</template>
<script>
import { getCinemaList } from "@/api/cinema";
import CinemaList from "./components/List";
import MzFooter from "@/components/Footer";
import CinemaHeader from "./components/Header";
import { mapState, mapMutations } from "vuex";
import { type } from 'os';
import { parse } from 'path';
export default {
  components: {
    CinemaList,
    MzFooter,
    CinemaHeader
  },
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "A",
      option1: [{ text: "全城", value: 0 }],
      option2: [
        { text: "APP订票", value: "a" },
        { text: "前台兑换", value: "b" }
      ],
      option3: [
        { text: "最近去过", value: "A" },
        { text: "离我最近", value: "B" }
      ]
    };
  },
  computed: {
    ...mapState(["CinemaLists"])
  },
  created() {
    this.getData();
    
  },
  methods: {
        ...mapMutations(['setCinemaLists','setCinemaLis']),
    getData() {
      getCinemaList().then(res => {
        this.setCinemaLists(JSON.stringify(res.data.cinemas))
        this.setCinemaLis(res.data.cinemas)
        this.init();
      });
      
    },
    fun(index) {
      if (index !== 0) {
        let city = JSON.parse(this.CinemaLists)[index].districtName,
          cinemaList = [];
          console.log(city)
        JSON.parse(this.CinemaLists).forEach(item => {
          if (item.districtName == city) {
            cinemaList.push(item);
          }
        });
        this.setCinemaLis(cinemaList);
      } else {
        this.setCinemaLis(JSON.parse(this.CinemaLists));
      }
    },
    init() {
        let citys = [];
        console.log(JSON.parse(this.CinemaLists))
    JSON.parse(this.CinemaLists).forEach(item => {
          if (citys.indexOf(item.districtName) == -1) {
            citys.push(item.districtName);
          }
        });
        for (let i = 0; i <= citys.length; i++) {
          let city = {
            text: citys[i],
            value: i + 1
          };
          // console.log(city)
          this.option1.push(city);
        }
        immediate: true;
      }
    ,

  },
  
};
</script>
<style scoped lang="scss">
.outside {
  padding-top: 94px;
  padding-bottom: 49px;
  z-index: 100;
}
.cinema-list-tag {
  position: fixed;
  height: 50px;
  width: 100%;
  top: 44px;
  right: 0;
  text-align: center;
  background-color: #fff;
  z-index: 2000;
}
</style>