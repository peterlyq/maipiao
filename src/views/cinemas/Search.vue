<template>
  <div class="main">
    <van-search class="sear" v-model="value" placeholder="输入影院名称" show-action shape="round" @input="onSearch">
      <div slot="action" @click="cancel">取消</div>
    </van-search>
    <div class="kong"></div>
    <cinema-list></cinema-list>
    <div v-if="!$store.state.CinemaLis.length" class="cinema-search-result" style>
      <div class="empty-result" data-enter-time="1571315870" data-leave-time="1571315870">
        <img src="@/assets/images/cinema.png" alt />
        <p>没有找到匹配的影院</p>
        <p class="empty-list-tip">提示：仅支持搜索“影院”，建议您检查输入的影院名称是否有误？</p>
      </div>
    </div>
  </div>
</template>
<script>
import CinemaList from "./components/List";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    CinemaList
  },
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapState(["CinemaLists"])
  },
  methods: {
    ...mapMutations(["setCinemaLis"]),
    onSearch() {
      let result = [];
      console.log(typeof(this.CinemaLists))
     JSON.parse(this.CinemaLists).forEach(item => {
        if (
          item.name.search(this.value) != -1 ||
          item.address.search(this.value) != -1
        ) {
          result.push(item);
        }
      });
      console.log(result);
      this.setCinemaLis(result);
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang='scss'>
.sear{
    width: 100%;
    position: fixed;
    top: 0%;
    z-index: 99;
}
.kong{
    padding-top: 54px;
}
.cinema-search-result {
  z-index: 3004;
  position: absolute;
  top: 49px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  height: calc(100vh - 49px);
  width: 100vw;
  overflow-y: auto;
  .empty-result {
    position: absolute;
    top: 107px;
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
    .empty-list-tip {
      font-size: 11px;
      padding: 0 22vw;
    }
  }
}
</style>