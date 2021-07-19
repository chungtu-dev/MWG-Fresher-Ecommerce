<template>
    <div>
        <div class="cart-wrapper">
                    <div class="cart-count">{{cartDataCountItem}}</div>
                    <i class="fas fa-shopping-cart"></i>
                    <div class="cart-container">
                        <ul class="cart-list" v-if="cartData.length">
                            <li class="cart-item" v-for="(item) in cartData" :key="item.product.productId">
                                <b-row class="cart-item-wrapper">
                                    <b-col class="cart-item-img" sm="3">
                                        <img :src="item.product.productImg" alt="cart-item">
                                    </b-col>
                                    <b-col class="cart-item-title" sm="5">
                                        <span>{{item.product.productName}}</span>
                                    </b-col>
                                    <b-col class="cart-item-quantity" sm="1">
                                        <span>x{{item.numbers}}</span>
                                    </b-col>
                                    <b-col sm="3" class="cart-item-price">
                                        <!-- <span>{{item.price}}</span> -->
                                        <span>{{formatPrice(item.totalPrice)}}</span>
                                    </b-col>
                                </b-row>
                            </li>
                        </ul>
                        <div class="cart-empty" v-if="!cartData.length || cartData.length==0">Giỏ hàng trống 😒</div>
                    </div>
                </div>
    </div>
</template>
<script>
import helper from "../helper";
export default {
    props:['cartData','cartDataCountItem'],
    methods:{
        formatPrice(price){
            helper.formatPrice(price)
        }
    }
}
</script>
<style>
    
</style>