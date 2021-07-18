import axios from 'axios'
const url = `https://localhost:5001/`

const state={
    brand:[]
}
const getters={
  brand:state=>state.brand

}
const actions={

    getBrandFilter({commit}){
        axios.get(url+'api/brand')
        .then(res=>{
          commit("SET_BRAND_FILTER",res.data)
        })
        .catch(e=>{
          console.log("Error",e);
        })
      },
  
      filterByBrand({commit,dispatch},brandID){
        if(brandID)
        {
          let loader = this._vm.$loading.show()
          axios.get(url+'api/Product/brand/'+brandID)
          .then(res=>{
              commit("SET_PRODUCTS",res.data)
              loader.hide()
          })
          .catch(e=>{
              console.log("Error",e);
            })
        }
        else dispatch('getProducts')
      },
  
}
const mutations={

    SET_BRAND_FILTER(state,brands)
    {
      state.brand = brands
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}