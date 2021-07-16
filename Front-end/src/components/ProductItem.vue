<template>
    <b-col md="4" sm="6" lg="4" xs="12" class="mb-3 product-item">
        <div class="product-wrapper">
            <ul class="btn-wrapper">
                <li class="btn-addtocart" @click="handleAddToCart(data.productId)">
                <i class="fas fa-shopping-cart"></i>
                </li>
                <li class="btn-addtofav">
                <i class="fas fa-heart"></i>
                </li>
            </ul>
            <div class="product-img-wrapper" @click="handleClickViewDetail(data.productId)">
                <img :src="data.productImg" onerror="this.onerror=null; this.src='https://png.pngtree.com/png-clipart/20190922/original/pngtree-purple-stereo-404-page-loss-universal-creative-elements-png-image_4774965.jpg'" alt="product" class="product-img">
            </div>
            <div class="product-info">
                <div class="product-title">
                <span>{{data.productName}}</span>
                </div>
                <div class="product-price">
                <span>{{this.formatCurrency(data.productPrice)}}</span>
                </div>
            </div>
        </div>
        <!-- <ul class="success-alert">
            <li>
                <b-alert :show="show" dismissible fade>
                        <i class="fas fa-check-circle"></i>
                        Sản phẩm đã được thêm vào giỏ hàng
                </b-alert>
            </li>
      </ul> -->
    </b-col>
</template>
<script>
import { mapActions } from 'vuex';
import helper from '../helper/index'
export default {
    data(){
        return{
        show:false,
        }
    },
    name:'ProductItem',
    props:['data'],
    created(){
    },
    computed:{
    },
    methods:{
        ...mapActions(['addToCart']),
        handleAddToCart(id)
        {
            this.show = true
            this.addToCart(id)
        },
        formatCurrency(price)
        {
            return helper.formatCurrency(price)
        },
        handleClickViewDetail(id)
        {
            console.log(id)
            this.$router.push({ path: 'productdetail', query: { id: id } })
        }
    }
}
</script>
<style scoped>
    .success-alert{
        position: fixed;
        bottom: 0;
        right: 0;
        background-color: none!important;
        z-index: 2999;
    }
    .success-alert li:last-child{
        margin-bottom: 12px!important;
        max-height: 70px;
    }
    .success-alert li{
        margin: 0px!important;
        max-height: 70px;
        list-style: none;
    }
    .success-alert ul{
        margin: 0;
        padding: 0;
    } 
    .success-alert i{
        color:#17a2b8;
        margin-right: 6px;
    }
    .alert{
        margin: 4px 0px 12px 0px!important;
    }
</style>