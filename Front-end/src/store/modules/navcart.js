import axios from 'axios'
const url = `https://localhost:5001/`
const navcart ={
    
    state: {
        cartData:[],
        cartTotalPrice:0,
        customerInfo:[]
      },
      getters:{
        cartDataCountItem:(state)=>{
          let count = 0
          state.cartData.forEach((item) => {
            count+=item.numbers
          });
          return count
        },
        cartData:state=>state.cartData,
        cartTotalPrice:state=>state.cartTotalPrice
    
      },
      mutations: {
        SET_CART_DATA(state,cartData){
          state.cartData = cartData.details
          state.cartTotalPrice = cartData.totalPrice
        },
        GET_CUSTOMER_INFO(state,customerInfo){
          state.customerInfo = customerInfo
        }
      },
      actions: {
        setCartData({commit}){
          let loader = this._vm.$loading.show()
          axios.get(url+'api/GetCart',{withCredentials: true})
              .then(res=>{
                  if(res.data.isSuccessed)
                  {
                    // console.log(res.data);
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
              commit("SET_CART_DATA",res.data.data)
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
          .catch(e=>{
            console.log(e)
          })
        },
        deleteCartItem({commit},id){
          let loader = this._vm.$loading.show()
          axios.post(url+'api/RemoveFromCart?productId='+id,{withCredentials: true})
          .then(res=>{
            if(res.data.isSuccessed) {
              loader.hide()
              commit("SET_CART_DATA",res.data.data)
              this._vm.$notify({
                group:'message',
                title:'Thành công',
                text:'Sản phẩm đã được xóa khỏi giỏ hàng',
                type:'success'
              })
            }
            else if(!res.data.isSuccessed)
            {
              // console.log(res.data.message)
              loader.hide()
              let emptyCart = []
              emptyCart.details = []
              commit("SET_CART_DATA",emptyCart)
              this._vm.$notify({
                group:'message',
                title:'Thành công',
                text:"Đã xóa hết các sản phẩm trong giỏ hàng",
                type:'success'
              })
            }
          })
          .catch(e=>{
            console.log(e)
          })
        },

        reduceCartItem({commit},id){
          let loader = this._vm.$loading.show()
          axios.post(url+'api/ReduceItem?productId='+id,{withCredentials: true})
          .then(res=>{
            if(res.data.isSuccessed) {
              loader.hide()
              commit("SET_CART_DATA",res.data.data)
            }
            else if(!res.data.isSuccessed)
            {
              // console.log(res.data.message)
              loader.hide()
              let emptyCart = []
              emptyCart.details = []
              commit("SET_CART_DATA",emptyCart)
            }
          })
          .catch(e=>{
            console.log(e)
          })
        },

        increaseCartItem({commit},id){
          let loader = this._vm.$loading.show()
          axios.post(url+'api/AddToCart?productId='+id,{withCredentials: true})
          .then(res=>{
            if(res.data.isSuccessed) {
              loader.hide()
              commit("SET_CART_DATA",res.data.data)
            }
            else if(!res.data.isSuccessed)
            {
              console.log(res.data.message)
              loader.hide()
            }
          })
          .catch(e=>{
            console.log(e)
          })
        },

        placeAnOrder({commit},formInfo){
          let loader = this._vm.$loading.show()
          axios.post(url+'api/Order',formInfo,{withCredentials: true})
          .then(res=>{
            if(res.data.isSuccessed) {
              loader.hide()
              let emptyCart = []
              emptyCart.details = []
              commit("SET_CART_DATA",emptyCart)
              this._vm.$notify({
                group:'message',
                title:'Thành công',
                text:'Đặt hàng thành công',
                type:'success'
              })
              commit("GET_CUSTOMER_INFO",res.data.data)
            }
            else if(!res.data.isSuccessed)
            {
              console.log(res.data.message)
              loader.hide()
              this._vm.$notify({
                group:'message',
                title:'Thất bại',
                text:'Có lỗi trong quá trình đặt hàng',
                type:'error'
              })
            }
          })
          .catch(e=>{
            console.log(e)
          })
        },

      },
}
export default navcart