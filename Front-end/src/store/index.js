import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//Loader
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);
Vue.use(Vuex)
const url = `https://localhost:5001/`

export default new Vuex.Store({
  state: {
    product:[],
    brand:[],
    productDetail:{},
    cartData:[],
    result:[]
  },
  getters:{
    cartDataCountItem:(state)=>{
      let count = 0
      state.cartData.forEach((item) => {
        count+=item.numbers
      });
      return count
    }

  },
  mutations: {
    ADD_TO_CART(state,data){
      //let newItem = null
      //const cartData = state.cartData
      // for(let i=0;i<state.cartData.length;i++)
      // {
      //   if(state.cartData[i].id===item.productId){
      //     state.cartData[i].qty++
      //     state.cartData[i].price = state.cartData[i].price * state.cartData[i].qty
      //     localStorage.setItem('cartData',JSON.stringify(state.cartData))
      //     return
      //   }
      // }
      state.cartData = data.details

      // newItem = {
      //   id: item.productId,
      //   name: item.productName,
      //   image:item.productImg,
      //   qty: 1,
      //   price:item.productPrice
      // }
      // state.cartData.push(newItem)

      // localStorage.setItem('cartData',JSON.stringify(state.cartData))

    },
    SET_CART_DATA(state,cartData){
      state.cartData = cartData.details
    },
    SET_PRODUCTS(state,products){
        state.product = products
    },
    SET_BRAND_FILTER(state,brands)
    {
      state.brand = brands
    },
    GET_PRODUCT_DETAIL_BY_ID(state,product){
      state.productDetail = product
    },
    SEARCH_PRODUCT(state,result){
      state.result = result
    }
  },
  actions: {
    searchProduct({commit},queryString){
      axios.get(url+'product?q='+queryString)
          .then(res=>{
              //console.log(res);
              commit("SEARCH_PRODUCT",res.data)
          })
          .catch(e=>{
              console.log("Error",e);
            })
    },
    // setCartData({commit,state}){
    //   if(!localStorage.getItem('cartData'))
    //   {
    //     localStorage.setItem('cartData',JSON.stringify(state.cartData))
    //   }
    //   else{
    //     const cartData = JSON.parse(localStorage.cartData)
    //     commit("SET_CART_DATA",cartData)
    //   }
    // },
    setCartData({commit},){
      let loader = this._vm.$loading.show()
      axios.get(url+'api/GetCart',{withCredentials: true})
          .then(res=>{
              if(res.data.isSuccessed)
              {
                console.log(res.data);
                commit("SET_CART_DATA",res.data.data)
                loader.hide()
              }
              else if(!res.data.isSuccessed)
              {
                console.log(res.data.message)
                loader.hide()
              }
          })
          .catch(e=>{
              console.log("Error",e);
            })
    },
    addToCart({commit},id){
      //const item = state.product.find(item=>item.productId==id)
      let loader = this._vm.$loading.show()

      axios.post(url+'api/AddToCart?productId='+id,{withCredentials: true})
      .then(res=>{
        if(res.data.isSuccessed) {
          loader.hide()
          commit("ADD_TO_CART",res.data.data)

        }
        else if(!res.data.isSuccessed)
        {
          console.log(res.data.message)
          loader.hide()
        }
      })
      .catch(e=>console.log(e))
      // let count = 1
      // let newItem = null
      // const cartData = state.cartData
      // for(let i=0;i<cartData.length;i++)
      // {
      //   if(cartData[i].id===item.productId){
      //     count = cartData[i].qty++
      //     return commit("ADD_TO_CART",newItem,count)
      //   }
      // }
      // newItem = {
      //   id: item.productId,
      //   name: item.productName,
      //   image:item.productImg,
      //   qty: count
      // }
    },
    getProducts({commit}){
      let loader = this._vm.$loading.show()
      axios.get(url+'api/ProductList')
          .then(res=>{
              //console.log(res);
              commit("SET_PRODUCTS",res.data)
              loader.hide()
          })
          .catch(e=>{
              console.log("Error",e);
            })
    },
    getBrandFilter({commit}){
      axios.get(url+'api/brand')
      .then(res=>{
        commit("SET_BRAND_FILTER",res.data)
      })
      .catch(e=>{
        console.log("Error",e);
      })
    },

    //Filter
    filterByBrand({commit,dispatch},brandID){
      if(brandID)
      {
        let loader = this._vm.$loading.show()
        axios.get(url+'api/Product/brand/'+brandID)
        .then(res=>{
            //console.log(res);
            commit("SET_PRODUCTS",res.data)
            loader.hide()
        })
        .catch(e=>{
            console.log("Error",e);
          })
      }
      else dispatch('getProducts')
    },

    //Get Product detail by ID
    getProductById({commit},productId)
    {
      axios.get(url+'api/product/'+productId)
      .then(res=>{
          //console.log(res);
          if(res.data)
          {
            commit("GET_PRODUCT_DETAIL_BY_ID",res.data)
          }
      })
      .catch(e=>{
          console.log("Error",e);
        })
    }
  },
  modules: {
  }
})
