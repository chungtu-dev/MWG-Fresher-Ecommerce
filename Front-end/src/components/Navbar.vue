<template lang="">
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">MWG Ecommerce</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/">Home</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/userinfo">User</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/about">About</router-link>
                </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form @submit="onSubmitSearch">
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="keyword"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit" >Search</b-button>
                </b-nav-form>
                <!-- Cart -->
                <NavCart :cartData="cartData" :cartDataCountItem="cartDataCountItem"></NavCart>
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    User
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
</template>
<script>
import { mapGetters } from 'vuex'
import helper from '../helper/index'
import NavCart from './NavCart.vue'

export default {
    components:{
        NavCart
    },
    name:'Navbar',
    data(){
        return{
            keyword:'',
            cartDataPrice:[]
        }
    },
    computed:{
        ...mapGetters(['cartDataCountItem','cartData'])
    },
    methods:{
        formatPrice(price){
            return helper.formatCurrency(price)
        },
        onSubmitSearch(e){
            e.preventDefault();
            this.$router.push({ path: 'search', query: { q: this.keyword } })
            .catch(()=>{})
        }
    }
}
</script>
<style scoped>
    a
    {
        text-decoration: none;
        color:white
    }
    a:hover
    {
        text-decoration: none;
        color: white;
        opacity: 0.8;
    }
    .cart-wrapper{
        position: relative;
        z-index: 20001;
        width: 80px;
    }
    ul{
        list-style: none;
        padding: 0;
    }
    .cart-wrapper i{
        line-height: 40px;
        font-size: 1.4rem;
        cursor: pointer;

    }
    .cart-container{
        right: -4px;
        position: absolute;
        z-index: 2000;
        height: auto;
        width: 420px;
        background-color: white;
        font-size: 0.8rem;
        top: 48px;
        display: none;
        transform-origin: top right ;
        animation: showCart .15s ease-in;
    }
    @keyframes showCart{
        0%{
            transform: scale(0);
            opacity: 0;
        }
        50%{
            transform: scale(0.5);
            opacity: 0.5;
        }
        100%{
            transform: scale(1);
            opacity: 1;
        }
    }
    .cart-container::before{
        content: "";
        position: absolute;
        z-index: 1999;
        right: 22px;
        top: -16px;
        width: 0; 
        height: 0; 
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 18px solid rgb(255, 255, 255);
        
    }
    .cart-item
    {
        border-bottom: 1px solid #ccc;
        min-height: 64px;
    }
    .cart-item-wrapper{
        padding: 12px;
        align-items: center;
    }
    .cart-item-img img{
        width: 40px;
        height: auto;
    }
    .cart-item-price{
        overflow-wrap:anywhere;
        font-size: 0.7rem;
        
    }
    .cart-item-title{
        text-align: left;
        font-weight: 600;
    }
    .cart-wrapper:hover .cart-container{
        display: block;
        
    }
    .cart-wrapper i:hover{
        opacity: 0.8;
    } 
    .cart-count{
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid #f58282;
        border-radius: 50%;
        z-index: 2004;
        background-color: #f00;
        top: 0;
        right: 14px;
        font-size: 0.7rem;
        color: white;
    }
    .cart-list li{

    }
    .cart-list li:hover{
        background-color: #ebe8e8;
        cursor: pointer;
    }
    .cart-empty{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;
        height: 130px;
        font-weight: 600;
        opacity: 0.8;
    }
</style>