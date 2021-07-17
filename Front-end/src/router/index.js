import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import UserInfo from '../views/UserInfo.vue'
import Search from '../views/Search.vue'
import About from '../views/About.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component:About
  },
  {
    path:'/productdetail',
    name:'ProductDetail',
    component: ProductDetail
  },
  {
    path:'/userinfo',
    name:'UserInfo',
    component:UserInfo
  },
  {
    path:'/search',
    name:'Search',
    component:Search
  }
]

const router = new VueRouter({
  routes
})

export default router
