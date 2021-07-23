import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//Loader
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);
Vue.use(Vuex)
// const url = `https://localhost:5001/`

const San_Pham = {
    state: {
        list_San_Pham: [],
        ThongTinKhachHang: [],
    },
    getters: {
        list_San_Pham: state => state.list_San_Pham ? state.list_San_Pham : [],
        totalPrice: state => state.list_San_Pham.totalPrice,
        ThongTinKhachHang: state => state.ThongTinKhachHang,
    },
    mutations: {
        GET_SAN_PHAM(state, list_San_Pham) {
            state.list_San_Pham = list_San_Pham.data
        },
        // UPDATE(state,data){
        //     state.list_San_Pham.details = data.data.details
        // },
        XOA_SAN_PHAM(state, idSanPham) {
            state.list_San_Pham.details = state.list_San_Pham.details.filter(itemSanPham => itemSanPham.product.productId !== idSanPham)
        },
        POST_SAN_PHAM(state, SanPhamMoi) {
            state.list_San_Pham.unshift(SanPhamMoi)
        },
        GET_THONG_TIN_KHACH_HANG(state, ThongTinKhachHang) {
            state.ThongTinKhachHang = ThongTinKhachHang
        },
    },
    actions: {
        async getListSanPham({ commit }) {
            try {
                const resp = await axios.get("https://localhost:5001/api/GetCart")
                commit('GET_SAN_PHAM', resp.data)
            } catch (error) {
                console.log(error)
            }
        },

        async xoaSanPham({ commit }, idSanPham) {
            try {
                await axios.post("https://localhost:5001/api/RemoveFromCart?productId=" + idSanPham)
                commit('XOA_SAN_PHAM', idSanPham)
            } catch (error) {
                console.log(error);
            }
        },
        async postSanPham({ commit }, SanPhamMoi) {
            //Order spham
            try {
                await axios.post("https://jsonplaceholder.typicode.com/photos?_limit=1", SanPhamMoi)
                commit('POST_SAN_PHAM', SanPhamMoi)
            } catch (error) {
                console.log(error)
            }
        },
        // ---------------------------------------------------------------------------------------------------
        async ThemSanPham({ commit }, idSanPham) {
            try {
                const resp = await axios.post("https://localhost:5001/api/AddToCart?productId=" + idSanPham)
                commit('GET_SAN_PHAM', resp.data)
            } catch (error) {
                console.log(error)
            }
        },

        async GiamSanPham({ commit }, idSanPham) {
            try {
                const resp = await axios.post("https://localhost:5001/api/ReduceItem?productId=" + idSanPham)
                commit('GET_SAN_PHAM', resp.data)
            } catch (error) {
                console.log(error)
            }
        },
        async postDanhSachKhachHang({commit}, formInfo){
            try {
                await axios.post("https://localhost:5001/api/Order",formInfo)
                commit('GET_THONG_TIN_KHACH_HANG', formInfo)
            } catch (error) {
                console.log(error)
            }
        }

    },
    modules: {
    }
}

export default San_Pham
