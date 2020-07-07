import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset1.css'
import * as filters from "./filter/index"
import {Panel,Button, List, Sticky, IndexBar, IndexAnchor, cell, DropdownMenu, DropdownItem, CouponCell, CountDown, Search, Loading, Tabbar, TabbarItem, Popup, NavBar, Cell, CellGroup, DatetimePicker, Toast,Field,PasswordInput,NumberKeyboard,Dialog} from 'vant'
Vue.use(Sticky).use(List).use(IndexBar).use(IndexAnchor).use(DropdownMenu).use(cell).use(DropdownItem).use(CouponCell).use(CountDown).use(Search).use(Loading).use(Tabbar).use(TabbarItem).use(Popup).use(NavBar).use(Cell).use(CellGroup).use(DatetimePicker).use(Toast).use(Field).use(Button).use(NumberKeyboard).use(PasswordInput).use(Dialog).use(Panel)
// Vue.config.productionTip = false
   Vue.config.silent = true
for (let key in filters) {
  Vue.filter(key, filters[key])
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
