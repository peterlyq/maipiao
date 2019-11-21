<template>
  <div>
    <div class="film-info">
      <p>
        {{data.name}}
        <span class="score">{{data.grade}}</span>
        <span class="scor">分</span>
      </p>
      <div class="film-desc">
        {{data.category}} | {{data.runtime}}分钟 | {{data.director}} |
        <span
          v-for="item in data.actors"
          :key="item.name"
        >{{item.name}}</span>
        
        <router-link :to="`/film/${data.filmId}`"><img src="~@/assets/images/more.png" alt=""></router-link>
        
      </div>
    <div class="data-list">
      <div class="tabs-bar-wrapper">
        <div class="tabs-bar">
          <ul class="tabs-nav">
            <li class="" v-for="(item,index ) in data.showDate" :key="index">

          <router-link
            :key="index + ' '"
            :to="`/cinemas/${$route.params.cid}/film/${$route.params.fid}/${item}`"
          >{{item | changeTime}}</router-link>
          <br :key="item+'-'+index" />

            </li>
          </ul>
          </div>     
        </div>
    </div>
      <div class="schedule-list">
      <div class="schedule-item" v-for="item in schedule" :key="item.scheduleId">
            <div class="left">
              <div class="start-at">{{item.showAt |getScheduleTime}}</div>
              <div class="end-at">{{item.endAt | getScheduleTime}}散场</div>
            </div>
            <div class="middle">
              <div class="language">{{item.filmLanguage }} {{item.imagery}}</div>
              <div class="hall">{{item.hallName}}</div>
            </div>
            <div class="right">
              <div class="buy-ticket">{{item.isOnsell?'购票':'停售'}}</div>
              <div class="lowest-price">
                <span class="price-icon">￥</span>
                {{item.salePrice/100}}
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCinemaSchedule} from "@/api/cinema"
export default {
  props: ["data"],
   data(){
     console.log(this.data.filmId)
       return{
           schedule:[]
       }
   },
   watch:{
       $route:{
           handler(val){

               this.getData()
           },
           deep:true,
           immediate:true
       }
   },
   methods:{
       getData(){
           getCinemaSchedule({
               cid:this.$route.params.cid,
               fid:this.$route.params.fid,
               date:this.$route.params.date
           }).then(res =>{
               console.log('当前时间安排是：',res.data.schedules)
               this.schedule = res.data.schedules
           })
       }
   }
};
</script>
<style scoped lang="scss">
a{
  text-decoration: none;
  color: black;
}
div{
  box-sizing: border-box;
}
   .schedule-item{
    height: 74px;
    padding: 15px;
    position: relative;
    background: #fff;
    .left{
          float: left;
    width: 100px;
    .start-at{
      font-size: 15px;
    }.end-at{
      font-size: 13px;
    color: #797d82;
    margin-top: 2px;
    }
    }
    .middle{
      float: left;
    width: calc(100% - 240px);
    .language{
      font-size: 15px;
    color: #191a1b;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .hall{
      font-size: 13px;
    color: #797d82;
    margin-top: 2px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    }
    .right{
      line-height: 23px;
      float: right;
    padding: 10px 0;
    color: #ff5f16;
    .buy-ticket{
          
    border: 1px solid #ff5f16;
    border-radius: 4px;
    float: right;
    height: 25px;
    width: 50px;
    position: relative;
    text-align: center;
    font-size: 12px;
    font-family: Microsoft YaHei,Helvetica,Arial,sans-serif;
    }
    .lowest-price{
          float: right;
    padding-right: 20px;
    font-size: 15px;
    .price-icon{
      font-size: 10px;
          line-height: 25px;
    color: #ff5f16;
    }
    }
    }
}
.film-info {
  width: 100%;
  background: #fff;
  height: 0.8rem;
  padding: 15px 0;
  position: relative;
}
.film-desc {
  text-align: center;
  height: 18px;
  color: #797d82;
  font-size: 13px;
  padding: 0 12%;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  img{
    position: absolute;
    right: 15px;
    top: 0;
    margin-top: 36px;
    width: 4px;
    height: 8px;
  }
}
p {
  font-size: 15px;
  color: #191a1b;
  padding-right: 5px;
  text-align: center;
  line-height: 18px;
}
.score {
  font-size: 16px;
  font-style: italic;
  color: #ffb232;
}
.scor {
  font-size: 10px;
  color: #ffb232;
}
.data-list{
   width: 100%;
   .tabs-bar-wrapper{
    position: relative;
    z-index: 100;
    width: 100%;
    overflow-x: hidden;
    background: #fff;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    .tabs-bar{
      height: 49px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    transition: transform .2s cubic-bezier(.35,0,.25,1),-webkit-transform .2s cubic-bezier(.35,0,.25,1);
    position: relative;
    .tabs-nav{
          display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    width: 100%;
    
    li{
      margin: 0;
    padding: 0;
    list-style: none;
      padding: 0px 15px;
      flex-shrink: 0;
    -webkit-flex-shrink: 0;
    color: #191a1b;
    text-align: center;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: list-item;
    .router-link-exact-active{
      color: #ff5f16;
    }
    }
    }
    }
}
}

</style>