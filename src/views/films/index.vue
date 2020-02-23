<template>
    <div>
        <div class="film-list">
    <banner :data="bannerLists" v-if= "bannerLists?bannerLists.length:''"></banner>
        <van-sticky @scroll="onScroll">
             <film-header v-show="isShow"></film-header>
            <tab-nav></tab-nav>
        </van-sticky>
        <router-view></router-view>
    </div>
    <mz-footer></mz-footer>
    </div>
</template>
<script>
import {getFilmBannerList} from '@/api/film'
import TabNav from './component/TabNav'
import Banner from "./component/Banner"
import FilmHeader from "./component/Header"
import MzFooter from "@/components/Footer"
export default {
    components:{
        Banner,
        TabNav,
        FilmHeader,
        MzFooter
    },
    data(){
        return{
            bannerLists:[],
            isShow:false
        }
    },
    created(){
        this.getBannerData()
    },
    methods:{
        getBannerData(){
            getFilmBannerList().then(res =>{
                if(res.status == 0){
                    this.bannerLists = res.data
                }
            })
        },
        onScroll(obj){  
            this.isShow = obj.isFixed
            // console.log(this.isShow)
        }
    }
}
</script>