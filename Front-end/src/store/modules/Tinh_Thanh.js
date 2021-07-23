import axios from "axios"
const API_Tinh_Thanh = {
    state:{
        list_Tinh_Thanh: [],
        list_Quan_Huyen:[],
        list_Xa_Huyen:[],
    },
    getters:{
        list_Tinh_Thanh: state => state.list_Tinh_Thanh,
        list_Quan_Huyen: state=>state.list_Quan_Huyen,
        list_Xa_Huyen: state=>state.list_Xa_Huyen,
    },

    mutations:{
        GET_TINH_THANH(state, list_Tinh_Thanh){
            state.list_Tinh_Thanh = list_Tinh_Thanh;
        },
        GET_QUAN_HUYEN(state, list_Quan_Huyen){
            state.list_Quan_Huyen = list_Quan_Huyen
        },
        GET_XA_HUYEN(state, list_Xa_Huyen){
            state.list_Xa_Huyen = list_Xa_Huyen
        },
    },
    actions:{
        async getListTinhThanh({ commit }){
            try {
                const resp = await axios.get("https://vapi.vnappmob.com/api/province/")
                commit('GET_TINH_THANH', resp.data.results);
                // console.log(resp.data.results)

            } catch (error) {
                console.log(error);
            }
        },
        async getListQuanHuyen({ commit }, id){
            try {
                const resp = await axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`)    
                commit('GET_QUAN_HUYEN', resp.data.results);
            } catch (error) {
                console.log(error);
            }
        },

        async getListXaHuyen({ commit }, id){
            try {
                const resp = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`)    
                commit('GET_XA_HUYEN', resp.data.results);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default API_Tinh_Thanh