<template>
  <div class="main">
    <div class="loading" v-show="flag">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <div class="container m-content-box" >
      <div class="detailContent" v-html="content">
          {{content}}
          </div>
    </div>
  </div>
</template>
<script>
import { getConsult } from "@/api/consult";
export default {
  data() {
    return {
      flag: true,
      content: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getConsult().then(res => {
        if (res.status == 0) {
          this.flag = false;
          this.content = res.data.data.content;
          console.log(res.data.data.content);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.m-content-box {
    width: 100%;
    overflow: hidden;
    // margin-top: -35px;
}
.detailContent {
    width: 100%;
    display: block;
}
.loading {
  background: #fff;
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>