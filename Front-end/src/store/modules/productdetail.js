import axios from 'axios'
const url = `https://localhost:5001/`
const state={
    productDetail:{}
}

const getters={
    productDetail:state=>state.productDetail
}

const mutations={
    GET_PRODUCT_DETAIL_BY_ID(state,product){
        state.productDetail = product
      },
}

const actions={
    getProductById({commit},productId)
    {
      axios.get(url+'api/product/'+productId)
      .then(res=>{
          if(res.data)
          {
            commit("GET_PRODUCT_DETAIL_BY_ID",res.data)
          }
      })
      .catch(e=>{
          console.log("Error",e);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}