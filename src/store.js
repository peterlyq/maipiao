import Vue from 'vue'
import Vuex from 'vuex'
import {getCityId,getCityName,getCinemaList,setCinemaList,getCookie} from "@/utils/local-data"
import { stat } from 'fs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId:getCityId(),
    cityName:getCityName(),
    CinemaLists:getCinemaList()||'',//string
    CinemaLis:[],
  },
  mutations: {
    setCityId(state,val){
      console.log(1)
      state.cityId = val
    },
    setCityName(state,val){
      state.cityName = val
    },
    setCinemaLists( state,val){
      setCinemaList(val)
      state.CinemaLists = val
      // console.log(state.CinemaLists)
    },
    setCinemaLis(state,val){
      state.CinemaLis = val
      // console.log(state.CinemaLis)
    },
    setUser(state,val){
      console.log(state)
      state[Object.keys(val)[0]] = val[Object.keys(val)[0]]
      console.log(state)
  
    }
  },
  actions: {

  }
})
