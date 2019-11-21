<template>
    <div class="film-header" :class="{header:data}"><div class="goBack" @click="$router.push('/films')"><img src="@/assets/images/back.png" alt=""></div> <div class="title">{{name}}</div> <!----></div>
</template>
<script>
export default {
    props:['data','name'],

}
</script>
<style scoped lang="scss">
.film .film-header {
    position: fixed;
    background-color: hsla(0,0%,100%,0);
    color: transparent;
    -webkit-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
    .goBack {
        width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    img{
        width: 100%;
        height: 100%;
    }
    }
    .title {
    font-size: 17px;
    line-height: 44px;
    width: 100vw;
    text-align: center;
}
}
.film .header {
    -webkit-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    background-color: #fff;
    color: #191a1b;
}
div {
    box-sizing: border-box;
}   
</style>