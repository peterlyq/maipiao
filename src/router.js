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
import Money from "@/views/user/Money"
import Order from "@/views/user/Order"
import Repass from '@/views/user/repass'
import changePayPass from "@/views/user/changePayPass"
import store from './store'
import register from "./views/Center/register"
import OrderList  from './views/cinemas/OrderList'
import {getCookie} from "./utils/local-data"
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
          component:CinemaFilmInfo,
        }]
      },{
        path:"/center",
        component:CenterIndex
      },
      {
        path:"/login",
        component:Login
      },
      {
        path:'/register',
        component:register
      },{
        path:"/consult",
        component:Consult
      },{
        path:'/user',
        component:UserIndex,
      },{
        path:'/user/Money',
        component:Money
      },{
        path:'/center/setting',
        component:UserIndex
      },{
        path:'/user/order',
        component:Order
      },{
        path:'/center/repass',
        component:Repass
      },{
        path:'/center/changePayPass',
        component:changePayPass
      },{
        name:"orderList",
        path:'/orderList/:rid/:price/:data',
        component:OrderList
      }
  ]
})
let whiteList= ['/city']
let userList = ['/user/card','/user','/center/setting','/center/repass','/user/order','/user/Money']
router.beforeEach((to,from,next)=>{
  if(whiteList.indexOf(to.path) === -1 && !store.state.cityId) {
    next('/city')
    return
  }
  if(userList.indexOf(to.path) !== -1 && !getCookie('COOKIE_USER_X_TOKEN')){
    next('/login')
    return
  }
  next()
})
export default router
