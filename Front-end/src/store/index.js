import Vue from 'vue'
import Vuex from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css';
//Import Modules
import product from './modules/product'
import productdetail from './modules/productdetail'
import navcart from './modules/navcart'
import brandfilter from './modules/brandfilter'
import San_Pham from './modules/San_Pham'
import Tinh_Thanh from './modules/Tinh_Thanh'



Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    product,
    productdetail,
    brandfilter,
    navcart,
    San_Pham,
    Tinh_Thanh
  }
})
