<template>
  <header class="header">
    <!---->
    <!---->
    <div class="left">
      <div class="city" @click="$router.push('/city')">
        <span>{{$store.state.cityName}}</span>
        <img src='~@/assets/images/down.png' width="6px" height="3px" />
      </div>
    </div>
    <div class="title">
      <div>影院</div>
    </div>
    <div class="right">
      <div>
        <div class="toCinemaSearch" data-enter-time="1571196864" data-click-fun="track_f_81039">
          <img src="~@/assets/images/search.png" width="18px" height="18px" @click="$router.push('/cinemas/search')"/>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
.header {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 3000;
  background-color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  .left {
    min-width: 15%;
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
    margin-left: 15px;
    .city {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      span {
        display: inline-block;
        font-size: 13px;
        max-width: 58px;
        height: 16px;
        line-height: 16px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 5px;
        color: #191a1b;
      }
      img{
          vertical-align: middle;
      }
    }
  }
  .title {
    text-align: center;
    font-size: 17px;
    color: #191a1b;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right {
    width: 15%;
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
    margin-right: 15px;
    div {
      width: 100%;
      text-align: right;
      box-sizing: border-box;
    }
    img {
        vertical-align: middle;
        margin-bottom: 5px;
      }
  }
}
</style>