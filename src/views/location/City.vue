<template>
  <div class="city-list">
    <hh-location v-if="cityList.length" @changeCity="getCity($event)"></hh-location>
    <div class="header">
      <div class="left">
        <i @click="$router.go(-1)">X</i>
      </div>
      <div class="middle">当前城市 - {{$store.state.cityName}}</div>
    </div>
    <div class="search-city-input">
      <div class="input-wrap" :class="{onFocus:flag}">
        <i class="search-icon iconfont icon-sousuo-sousuofangdajing" style="font-size: 20px;"></i>
        <input
          type="text"
          placeholder="输入城市名或拼音"
          class="search-input"
          @mousedown="flag=true"
          @keyup="search"
          v-model="keyValue"
        />
        <div class="clean-icon">
          <i class="iconfont icon-chongzhi-qingchu" style="font-size: 20px; display: none;"></i>
        </div>
      </div>
      <div class="cancel-btn" @click="cancel" :v-show="flag">取消</div>
      <!---->
    </div>
    <div class="city-index mint-indexlist">
      <ul class="mint-indexlist-content" style="margin-right:17px;height:553px;" v-show="!flag1">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail cleanfix">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text" @click="choose(gpsCityId,gpsCity)">{{gpsCity}}</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail cleanfix">
              <li class="city-item-detail" v-for="item in hotCity" :key="item.cityId">
                <div class="city-item-text" @click="choose(item.cityId,item.name)">{{item.name}}</div>
              </li>
            </ul>
          </div>
        </div>
        <city-lists @changeCity="choose" :dataList="cityData" :indexs="indexs" ></city-lists>
      </ul>
    </div>
    <div class="city-search-result" style v-show="flag1">
      <div class="city-search-result-list" v-show="flag1">
        <van-list>
          <van-cell @click="choose(item.cityId,item.name)" v-for="item in searchList" :key="item.cityId" :title="item.name" />
        </van-list>
      </div>
      <div class="empty-result" v-show="flag2">
        <img src="~@/assets/images/nothing.png" alt />
        <p>没有找到匹配的城市</p>
      </div>
    </div>
    <!-- <div >{{gpsCityId}}{{cityData}}</div> -->
  </div>
</template>
<script>
import { getCityList } from "@/api/city";
import { setCityId, setCityName } from "@/utils/local-data";
import HhLocation from "@/components/Location";
import CityLists from "./City-bar";
import { format } from "path";
import { mapMutations } from "vuex";
export default {
  components: {
    HhLocation,
    CityLists
  },
  data() {
    return {
      keyValue: "", //input value
      flag: false, //取消标志
      flag1: false, //搜索列表标志
      flag2: false, //搜索为空标志
      hotCity: [], //热门城市
      cityList: [], //所有城市
      gpsCity: "", //定位城市名字
      gpsCityId: "", //定位城市id
      indexs: [], //大写字母
      searchList: []
    };
  },
  computed: {
    cityData() {
      let result = {};

      this.cityList.forEach(item => {
        let key = item.pinyin.charAt(0).toUpperCase();

        if (!result[key]) {
          result[key] = [];
          this.indexs.push(key);
        }
        result[key].push(item);
      });
      this.indexs.sort();
      // console.log(result);
      return result;
    }
  },
  created() {
    this.getData();
  },

  methods: {
    ...mapMutations(["setCityId", "setCityName"]),

    getCity(val) {
      this.gpsCity = val;
      this.setCityIds();
      // console.log(this.gpsCity);
    },
    getData() {
      getCityList().then(res => {
        this.cityList = res.data.cities;
        // console.log(res);
        for (var i = 0; i < this.cityList.length; i++) {
          if (this.cityList[i].isHot) {
            this.hotCity.push(this.cityList[i]);
          }
        }
      });
    },
    setCityIds() {
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.gpsCity == this.cityList[i].name) {
          this.gpsCityId = this.cityList[i].cityId;
          //  console.log(this.cityList,"------------",this.gpsCityId)
          break;
        }
      }
    },
    setCity(id, name) {
      setCityId(id);
      setCityName(name);
      this.setCityId(id);
      this.setCityName(name);
    },
    choose(id, name) {
      this.setCity(id, name);
      this.$router.go(-1)
     
    },
    search() {
      let result = [];
      // console.log(this.cityList)
      this.cityList.forEach(item => {
        if (
          item.pinyin.search(this.keyValue) != -1 ||
          item.name.search(this.keyValue) != -1
        ) {
          result.push(item);
        }
      });

      this.searchList = result;
      this.flag1 = true;
      if (result.length) {
        this.flag2 = false;
      } else {
        this.flag2 = true;
      }
    },
    cancel() {
      this.flag = false;
      this.flag1 = false;
      this.keyValue = " ";
    }
  }
};
</script>
<style scoped lang="scss">
div {
  box-sizing: border-box;
}
* {
  font-size: 15px;
}
.city-list {
  background-color: #fff;
  .search-city-input {
    z-index: 2000;
    height: 49px;
    width: 100vw;
    padding: 9.5px 15px;
    background-color: #f4f4f4;
    position: fixed;
    top: 44px;
    .input-wrap {
      background-color: #fff;
      position: relative;
      display: inline-block;
      border-radius: 3px;
      width: 100%;
      height: 30px;
      input {
        width: 100%;
        height: 100%;
      }
      .search-icon {
        position: absolute;
        left: 7px;
        top: 0;
        line-height: 30px;
        font-size: 21px;
        color: #797d82;
      }
      // .search-input {
      //   position: absolute;
      //   left: 33.5px;
      //   top: 0;
      //   height: 30px;
      //   width: calc(100% - 65px);
      //   border: 0;

      // }
    }
    .cancel-btn {
      width: 43px;
      position: absolute;
      display: inline-block;
      text-align: right;
      font-size: 14px;
      line-height: 30px;
    }
    .onFocus {
      width: calc(100% - 43px);
    }
    .clean-icon {
      position: absolute;
      right: 7px;
      top: 0;
      line-height: 30px;
      font-size: 21px;
      color: #bdc0c5;
    }
  }
   .city-search-result .empty-result {
    position: absolute;
    top: 140px;
    width: 100%;
    text-align: center;
    img {
    width: 90px;
    margin: auto;
}
p {
    color: #bdc0c5;
    font-size: 14px;
    margin: 0;
}
}
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .recommend-city {
    background-color: #fff;
    padding-left: 15px;
    padding-top: 15px;
  }
  .header {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    z-index: 300;
    div {
      float: left;
      height: 44px;
    }
    .left {
      i {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 25px;
        text-align: center;
        line-height: 52px;
      }
      width: 14%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .middle {
      width: 72%;
      text-align: center;
      font-size: 17px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      color: #191a1b;
    }
  }
  .city-index {
    padding-top: 94px;
    .city-index-title {
      font-size: 13px;
      color: #797d82;
      margin-bottom: 10px;
    }
    .city-index-detail {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-align-content: center;
      -ms-flex-line-pack: center;
      align-content: center;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }
    .city-item-detail {
      width: calc((100vw - 33px) / 3);
      text-align: center;
      padding-bottom: 15px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      float: left;
      .city-item-text {
        height: 30px;
        background-color: #f4f4f4;
        line-height: 30px;
        border-radius: 3px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 7.5px;
        font-size: 14px;
        color: #191a1b;
      }
    }
  }
  .mint-indexlist {
    width: 100%;
    position: relative;
    overflow: hidden;
    .mint-indexlist-content {
      z-index: 3000;
      height: 100vh !important;
      overflow: auto;
    }
  }
}
</style>