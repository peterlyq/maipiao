<template>
  <div class="outside">
    <div class="cinema-list-wrap" v-for="item in CinemaLis" :key="item.cinemaId">
      <div class="cinema-list-item">
        <router-link :to="`/cinemas/${item.cinemaId}`" class="cinema-item-wrap">
          <div class="cinema-info-lf cinema-info">
            <span class="cinema-name">{{item.name}}</span>
            <img src alt="去过" class="isVisted" style="display: none;" />
            <!---->
            <span class="cinema-address">{{item.address}}</span>
          </div>
          <div class="cinema-info-rt cinema-info">
            <div class>
              <span class="cinema-lowPrice price-fmt">
                <i>￥</i>
                <span class="interge" style="font-size: 15px;">{{item.lowPrice/100}}</span>
                <span style="display: none;">.</span>
                <span class="decimal" style="font-size: 10px;"></span>
                <span style="display: none;">.</span>
                <span class="decimal" style="font-size: 10px; display: none;">00</span>
              </span>
              <span class="upon">起</span>
            </div>
            <span class="cinema-gpsAddress">
              <img style="display:none" src />
              <strong>距离未知</strong>
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
// import { getCinemaList } from "@/api/cinema";
import {mapState} from "vuex";
export default {
  data() {
    return {
      // dataList: []
    };
  },
  computed:{
    ...mapState(['CinemaLis'])
  },
  // created() {
  //   this.getData();
  // },
  // methods: {
  //   ...mapMutations(['setCinemaLists','setCinemaLis']),
  //   getData() {
  //     getCinemaList().then(res => {
  //       this.setCinemaLists(JSON.stringify(res.data.cinemas))
  //       this.setCinemaLis(res.data.cinemas)
  //     });
      
  //   }
  // }
};
</script>
<style scoped  lang="scss">
*{
    font: 12px/1.5 Tahoma,Helvetica,Arial,sans-serif;
    font-family: Microsoft YaHei,Tahoma,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
 
}
div {
  box-sizing: border-box;
}

.cinema-list-wrap {
  list-style: none;
  margin: 0;
  .cinema-list-item {
    position: relative;
    background-color: #fff;
    padding: 15px;
    .cinema-item-wrap {
      width: 100%;
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
      .cinema-info-lf {
        width: calc(100% - 65px);
        text-align: left;
        padding-right: 15px;
        float: left;
        .isVisted {
          width: 32px;
          height: 16.5px;
          margin-bottom: -6px;
          margin-left: 4px;
        }
        .cinema-address {
          color: #797d82;
          font-size: 12px;
          margin-top: 5px;
        }

        span {
          display: block;
          max-width: 80%;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
        }
        .cinema-name {
          color: #191a1b;
          font-size: 15px;
          float: left;
        }
      }
      .cinema-info-rt {
        width: 70px;
        text-align: center;
        float: right;
        margin-right: -5px;
        .price-fmt {
          font-size: 15px;
          color: #ff5f16;
          height: 0 !important;
          display: inline-table !important;
        }
        .upon {
          color: #ff5f16;
          font-size: 10px;
        }
        .cinema-gpsAddress {
          display: block;
          font-size: 11px;
          color: #797d82;
          margin-top: 5px;
          img {
            display: block;
            width: 13px;
            height: 17.5px;
            margin: 0 auto;
            margin-top: -30px;
          }
          strong {
            font-weight: 400;
            display: block;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>