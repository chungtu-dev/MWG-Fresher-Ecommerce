import axios from 'axios'
const url = `https://localhost:5001/`
const navcart ={
    
    state: {
        cartData:[]
      },
      getters:{
        cartDataCountItem:(state)=>{
          let count = 0
          state.cartData.forEach((item) => {
            count+=item.numbers
          });
          return count
        },
        cartData:state=>state.cartData
    
      },
      mutations: {
        ADD_TO_CART(state,data){
          state.cartData = data.details
        },
        SET_CART_DATA(state,cartData){
          state.cartData = cartData.details
        },
        
      },
      actions: {
        
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
          let loader = this._vm.$loading.show()
          axios.post(url+'api/AddToCart?productId='+id,{withCredentials: true})
          .then(res=>{
            if(res.data.isSuccessed) {
              loader.hide()
              commit("ADD_TO_CART",res.data.data)
              this._vm.$notify({
                group:'message',
                title:'Thành công',
                text:'Sản phẩm đã được thêm vào giỏ hàng',
                type:'success'
              })
            }
            else if(!res.data.isSuccessed)
            {
              console.log(res.data.message)
              loader.hide()
              this._vm.$notify({
                group:'message',
                title:'Thất bại',
                text:res.data.message,
                type:'error'
              })
            }
          })
          .catch(e=>console.log(e))
        },
        
        
      },
}
export default navcart