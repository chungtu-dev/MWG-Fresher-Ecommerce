import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
import Loading from 'vue-loading-overlay';
import helper from './helper/index'

Vue.prototype.$currency = helper

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Notifications,{velocity})
Vue.use(Loading);

// set default config
Vue.$cookies.config('7d')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
