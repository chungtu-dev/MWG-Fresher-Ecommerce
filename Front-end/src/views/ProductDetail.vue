<template>
    <div>
        <Header title="Product Detail" path="/ Product"></Header>
        <b-container>
            <b-row>
                <b-col class="left-part" lg="5" md="5">
                    <img :src="productDetail.productImg" alt="product-detail-image" class="product-img-detail">
                </b-col>
                <b-col class="right-part" lg="7" md="7">
                    <div class="product-info">
                        <div class="product-name">
                            {{productDetail.productName}}
                        </div>
                        <div class="product-price old-price">
                            {{this.formatCurrency(productDetail.productPrice*1.2)}}
                        </div>
                        <div class="product-price new-price">
                            {{this.formatCurrency(productDetail.productPrice)}}
                        </div>
                        <div class="product-description">
                             {{productDetail.productDes}}
                        </div>
                    </div>
                    <div class="btn-add-wrapper">
                        <button type="button" @click="addToCart(productDetail.productId)">
                            <i class="fas fa-shopping-cart"></i>
                            Add to cart
                        </button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Header from '@/components/Header'
import { mapState,mapActions } from 'vuex'
export default {
    created(){
        const id = this.$route.query.id
        this.getProductById(id)
    },  
    data(){
        return{
        }
    },
    computed:{
        ...mapState(['productDetail'])
    },
    methods:{
        ...mapActions(['getProductById','addToCart']),
        formatCurrency(price)
        {
            var formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            //minimumFractionDigits: 0, // 
            //maximumFractionDigits: 0, // 
            });
            return formatter.format(price); /* $2,500.00 */
        }
    },
    components:{
        Header
    }
}
</script>

<style scoped>
    .right-part{
        margin-top: 30px;
        text-align: left;
    }
    .left-part{

    }
    .btn-add-wrapper
    {
        margin-top: 40px;
    }
    .btn-add-wrapper button{
        padding: 12px 40px;
        border: 1px solid #ccc;
        background-color: #17a2b8;
        color: white;
    }
    .btn-add-wrapper button:focus{
        outline: none;
    }
    .btn-add-wrapper button:hover{
        opacity: 0.8;
        transform: scale(1.01);
        transition: 0.1s ease-in;
    }
    .btn-add-wrapper button i{
        margin-right: 12px;
    }
    .product-img-detail
    {
        max-width: 400px;
        width: 100%;
        height: auto;
    }
    .product-name
    {
        font-size: 2rem;
        font-weight: 700;
        margin: 24px 0px;
    }
    .product-price
    {
        font-size: 1.8rem;
        font-weight: 400;
        color: #d0021c;
        margin: 24px 0px;
    }
    .product-price.old-price{
        text-decoration: line-through;
        font-style: italic;
        opacity: 0.6;
        font-size: 1.4rem;
        margin-bottom: 0px!important;
    }
    .product-price.new-price{
        margin-top: 0px;
    }
</style>