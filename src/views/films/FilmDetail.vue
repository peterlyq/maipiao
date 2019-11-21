<template>
  <div class="main">
    <div class="film" v-if="film">
      <van-sticky @scroll="onscroll">
        <detail-head :data="flag" :name="film.name"></detail-head>
      </van-sticky>
      <div class="film-header"></div>
      <div class="lazy-img film-poster">
        <div class="lazy-img-wrap">
          <img :src="film.poster" alt />
        </div>
      </div>

      <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{film.name}}</span>
            <span class="item">{{filmtype}}</span>
          </div>

          <div class="film-grade">
            <span class="grade">{{film.grade}}</span>
            <span class="grade-text">分</span>
          </div>
        </div>
        <div class="film-category grey-text">{{film.category}}</div>
        <div class="film-born grey-text">{{film.premiereAt|turnDate()}}上映</div>
        <div class="film-nation-runtime grey-text">{{film.nation}} | {{film.runtime}} 分钟</div>
        <div class="film-synopsis grey-text" :class="{hide:isHide}">{{film.synopsis}}</div>
        <div class="toggle">
          <img
            src="~@/assets/images/toggle.png"
            alt
            :class="{upper:!isHide}"
            @click="isHide = !isHide"
          />
        </div>
      </div>
      <div class="actors">
        <div class="actors-title-bar">
          <span class>演职人员</span>
        </div>
        <div class="actors-list">
          <ul>
            <li v-for="item in actors" :key="item.name">
              <div class="actor-item">
                <div class="lazy-img actor-img">
                  <div class="lazy-img-wrap">
                    <img :src="item.avatarAddress" alt />
                  </div>
                  <div></div>
                </div>
                <span class="actor-name">{{item.name}}</span>
                <span class="actor-role">{{item.role}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="photos">
        <div class="photos-title-bar">
          <span class="photos-title-text">剧照</span>
          <span class="photos-to-all">全部 ({{totalPhotos}})</span>
        </div>
        <div class="photos-list">
          <ul class="row-scroll-items-nav">
            <li v-for="item in photos" :key="item">
              <img :src="item" alt />
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/cinemas" class="buy">
        <div class="goSchedule">选票入座</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DetailHead from "./component/DetailHeader";
import { getFilmDetail } from "@/api/film.js";
export default {
  components: {
    DetailHead
  },
  data() {
    return {
      flag: false,
      isHide: true,
      fid: "",
      film: "",
      filmtype: "",
      actors: [],
      photos: [],
      totalPhotos: ""
    };
  },
  watch: {
    "$route.params.id": {
      handler(val) {
        this.fid = val;
        this.getData();
      },
      immediate: true
    }
  },

  methods: {
    onscroll(obj) {
      this.flag = obj.isFixed;
      console.log(obj);
    },
    getData() {
      getFilmDetail({ fid: this.fid }).then(res => {
        this.film = res.data.film;
        this.filmtype = res.data.film.item.name;
        this.actors = res.data.film.actors;
        this.totalPhotos = res.data.film.photos.length;
        this.photos = res.data.film.photos;
        console.log(this.film);
      });
    }
  }
};
</script>
<style scoped lang="scss">
body {
  width: 100%;
  height: 100%;
}
div {
  box-sizing: border-box;
}
.main {
  font-family: "Microsoft";
  width: 100%;
  height: 100%;
  font: 12px/1.5 Tahoma, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #f4f4f4;
}
.lazy-img {
  position: relative;
  height: 210px;
  .lazy-img-wrap {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
    width: 100%;
    background: rgb(249, 249, 249);
    opacity: 1;
    display: block;

    img {
      width: 100%;
      position: absolute;
      left: 0;
      height: 210px;
    }
  }
}
.film-detail {
  .hide {
    height: 38px !important;
    overflow: hidden;
  }
  .grey-text {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
  }
  padding: 15px;
  padding-top: 12px;
  background-color: #fff;
  .col {
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
    .film-name {
      span {
        vertical-align: middle;
      }
      width: 256px;
      .name {
        color: #191a1b;
        font-size: 18px;
        height: 24px;
        line-height: 24px;
        margin-right: 7px;
      }
      .item {
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
        display: inline-block;
      }
    }
    .film-grade {
      .grade {
        font-size: 18px;
        font-style: italic;
      }
      .grade-text {
        font-size: 10px;
      }
      width: calc(100% - 250px);
      text-align: right;
      color: #ffb232;
    }
  }
  .film-synopsis {
    margin-top: 12px;
    transition: height 0.5s ease;
  }
  .toggle {
    text-align: center;
    display: block;
    height: auto;
    width: 20px;
    margin: auto;
    line-height: normal;
    img {
      width: 8px;
      margin: auto;
    }
  }
  .upper {
    transform: rotate(180deg);
  }
}
.actors {
  margin-top: 10px;
  background-color: #fff;
  .actors-title-bar {
    width: 100%;
    padding: 15px;
    span {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
    }
    // .actors-list {
    //   overflow-x: auto;
    //   overflow-y: hidden;
    //   height: 140px;
    //   background: rgb(255, 255, 255);
    // }
  }
  .actors-list {
    height: 140px;
    background: rgb(255, 255, 255);
    overflow-x: auto;
    overflow-y: hidden;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;
      margin: 0;
      padding-left: 15px;
      list-style: none;
      li {
        width: 85px;
        min-width: 85px;
        position: relative;
        margin-right: 10px;
        cursor: pointer;
        display: block;
        float: left;
        list-style: none;
        .actor-item {
          text-align: center;
          .actor-img {
            width: 85px;
            height: 85px;
            background: rgb(249, 249, 249);
            position: relative;
          }
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -o-transform: translateY(-50%);
          }
          span {
            display: block;
            text-align: center;
          }
          .actor-name {
            padding-top: 10px;
            font-size: 12px;
            color: #191a1b;
            width: 85px;
            height: 18px;
            display: block;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .actor-role {
            font-size: 10px;
            color: #797d82;
            display: block;
          }
        }
      }
    }
  }
}
.photos {
  margin-top: 10px;
  margin-bottom: 60px;
  background-color: #fff;
  .photos-title-bar {
    height: 62px;
    width: 100%;
    padding: 15px;
    span {
      display: inline-block;
      height: 22.5px;
      line-height: 22px;
    }
    .photos-to-all {
      font-size: 13px;
      color: #797d82;
      float: right;
    }
    .photos-title-text {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
    }
  }
  .photos-list {
    height: 115px;
    background: rgb(255, 255, 255);
    margin: 0;
    padding-left: 15px;
    list-style: none;

    ul {
      display: flex;
      //   overflow: hidden;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: scroll;
      li {
        display: block;
        min-width: 150px;
        height: 100%;
        cursor: pointer;
        float: left;
        width: 150px;
        //  width: auto!important;
        position: relative;
        margin-right: 10px;
        list-style: none;

        img {
          width: 100%;
          position: absolute;
        }
      }
    }
  }
}
.buy {
  height: 49px;
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.goSchedule {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
}
</style>