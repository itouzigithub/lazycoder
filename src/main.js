import Vue from 'vue'
import App from './App'
import store from './store'
import vuex from 'vuex'
Vue.use(vuex)

Vue.config.productionTip = false

// 全局注册组件
import slider from './components/slider'
Vue.component('slider', slider)

import toast from './components/toast'
Vue.component('toast', toast)

import uploader from './components/uploader'
Vue.component('uploader', uploader)

import popbox from './components/popbox'
Vue.component('popbox', popbox)

/**
 * 设置一个全局的通讯代理
 * ! 约定只有全局组件才能使用该全局通信代理，减少命名冲突的可能
 */
window.$communicator = new Vue();

new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
