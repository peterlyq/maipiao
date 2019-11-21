<template>
  <van-index-bar :index-list="indexs">
    <template v-for="(char) in indexs">  
        <van-index-anchor :index="char" :key="char"/>
        <van-cell @click="$emit('changeCity',city.cityId,city.name)"  v-for="(city) in dataList[char]" :key="city.cityId" :title="city.name"/>
    </template>
  </van-index-bar>
</template>
<script>
export default {
    props:["dataList","indexs"],
    mounted(){
        console.log('index-bar组件中的城市数据',this.dataList,this.indexs)
    }
}
</script>