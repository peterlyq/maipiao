import Vue from 'vue'
import Router from 'vue-router'
import FilmIndex from "@/views/films/index"
import NowPlaying from "@/views/films/NowPlaying"
import ComingSoon from "@/views/films/ComingSoon"
import CenimaIndex from "@/views/cinemas/index"
import FilmDetail from "@/views/films/FilmDetail"
import CinemaDetail from "@/views/cinemas/CinemasDetail"
import CinemaFilmInfo from "@/views/cinemas/CinemaFilmInfo"
import City from "@/views/location/City"
import CenterIndex from "@/views/Center/CenterIndex"
import Login from "@/views/Center/Login"
import Search from "@/views/cinemas/Search"
import Consult from "@/views/consult/index"
import UserIndex from "@/views/user/index"
import RedPackage from "@/views/user/RedPackage"
import Card from "@/views/user/Card"
import Money from "@/views/user/Money"
import Setting from "@/views/Center/Setting"
import Order from "@/views/user/Order"
import store from './store'
import { userInfo } from 'os'
Vue.use(Router)
const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
        {
          path:'/',
          redirect:'/films'
      },
      {
        path:"/city",
        component:City
      },{
        path:'/films',
        component:FilmIndex,
        children:[{
          path:'',
          redirect:"/films/nowPlaying"
        },{
          path:'nowPlaying',
          component:NowPlaying,
          meta:{
            lineX:0,
            keepAlive: false,
          }
        },
        {
          path:'comingSoon',
          component:ComingSoon,
          meta:{
            lineX:100
          }
        }]
      },{
        path:'/film/:id',
        name:"filmDetail",
        component:FilmDetail
      },{
        path:'/cinemas',
        component:CenimaIndex,
        meta:{
          keepAlive: false,
        }
      },{
        path:'/cinemas/search',
        component:Search
      },{
        path:"/cinemas/:cid",
        component:CinemaDetail,
        children:[{
          path:"film/:fid/:date",
          component:CinemaFilmInfo
        }]
      },{
        path:"/center",
        component:CenterIndex
      },
      {
        path:"/login",
        component:Login
      },{
        path:"/consult",
        component:Consult
      },{
        path:'/user',
        component:UserIndex,
      },{
        path:'/user/card',
        component:Card
      },{
        path:'/user/Money',
        component:Money
      },{
        path:'/user/redpackage',
        component:RedPackage
      },{
        path:'/center/setting',
        component:Setting
      },{
        path:'/user/order',
        component:Order
      }
  ]
})
let whiteList= ['/city']
router.beforeEach((to,from,next)=>{
  if(whiteList.indexOf(to.path) == -1 && !store.state.cityId){
    next('/city')
    return
  }
  next()
})
export default router
