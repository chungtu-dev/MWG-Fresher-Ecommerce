import Vue from 'vue'
import Vuex from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css';
//Import Modules
import product from './modules/product'
import productdetail from './modules/productdetail'
import navcart from './modules/navcart'
import brandfilter from './modules/brandfilter'



Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    product,
    productdetail,
    brandfilter,
    navcart
  }
})
