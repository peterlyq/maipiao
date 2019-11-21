import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset1.css'
import * as filters from "./filter/index"
import {List,Sticky,IndexBar,IndexAnchor,cell,DropdownMenu, DropdownItem,CouponCell,CountDown,Search,Loading,Tabbar,TabbarItem,Popup,NavBar,Cell,CellGroup,DatetimePicker } from 'vant'
Vue.use(Sticky).use(List).use(IndexBar).use(IndexAnchor).use(DropdownMenu).use(cell).use(DropdownItem).use(CouponCell).use(CountDown).use(Search).use(Loading).use(Tabbar).use(TabbarItem).use(Popup).use(NavBar ).use(Cell).use(CellGroup).use(DatetimePicker )
Vue.config.productionTip = false
for(let key in filters){
  Vue.filter(key , filters[key])
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
