import axios from 'axios'
const url = `https://localhost:5001/`

const state={
    product:[],
    result:[]
}

const getters={
    product:state=>state.product,
    result:state=>state.result
}

const mutations={
    SEARCH_PRODUCT(state,result){
        state.result = result
      },
      
    SET_PRODUCTS(state,products){
        state.product = products
    },

}

const actions={
    searchProduct({commit},queryString){
        axios.get(url+'api/product/search?name='+queryString)
            .then(res=>{
                commit("SEARCH_PRODUCT",res.data)
            })
            .catch(e=>{
                console.log("Error",e);
              })
      },

      getProducts({commit}){
        let loader = this._vm.$loading.show()
        axios.get(url+'api/ProductList')
            .then(res=>{
                commit("SET_PRODUCTS",res.data)
                loader.hide()
            })
            .catch(e=>{
                console.log("Error",e);
              })
      },
}

export default {
    state,
    getters,
    mutations,
    actions
}