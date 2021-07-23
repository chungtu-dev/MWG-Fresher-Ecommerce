<template>
  <div>
    <router-link to="/cart">
      <div class="cart-wrapper">
        <div v-show="cartDataCountItem>0" class="cart-count">{{ cartDataCountItem }}</div>
        <i class="fas fa-shopping-cart"></i>
        <div class="cart-container">
          <ul class="cart-list" v-if="cartData.length">
            <li
              class="cart-item"
              v-for="item in cartData"
              :key="item.product.productId"
            >
              <b-row class="cart-item-wrapper">
                <b-col class="cart-item-img" sm="3">
                  <img :src="item.product.productImg" alt="cart-item" />
                </b-col>
                <b-col class="cart-item-title" sm="5">
                  <span>{{ item.product.productName }}</span>
                </b-col>
                <b-col class="cart-item-quantity" sm="1">
                  <span>x{{ item.numbers }}</span>
                </b-col>
                <b-col sm="3" class="cart-item-price">
                  <!-- <span>{{item.price}}</span> -->
                  <span>{{ $currency.formatCurrency(item.totalPrice) }}</span>
                </b-col>
              </b-row>
            </li>
          </ul>
          <div
            class="cart-empty"
            v-if="!cartData.length || cartData.length == 0"
          >
            Giỏ hàng trống 😒
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>

export default {
  props: ["cartData", "cartDataCountItem"]
};
</script>
<style scoped>
a{
    text-decoration:none;
    color: black;
}
.cart-wrapper {
  position: relative;
  z-index: 20001;
  width: 80px;
}
ul {
  list-style: none;
  padding: 0;
}
.cart-wrapper i {
  line-height: 40px;
  font-size: 1.4rem;
  cursor: pointer;
}
.cart-container {
  right: -4px;
  position: absolute;
  z-index: 2000;
  height: auto;
  width: 420px;
  background-color: white;
  font-size: 0.8rem;
  top: 48px;
  display: none;
  transform-origin: top right;
  animation: showCart 0.15s ease-in;
}
@keyframes showCart {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.cart-container::before {
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
.cart-item {
  border-bottom: 1px solid #ccc;
  min-height: 64px;
}
.cart-item-wrapper {
  padding: 12px;
  align-items: center;
}
.cart-item-img img {
  width: 40px;
  height: auto;
}
.cart-item-price {
  overflow-wrap: anywhere;
  font-size: 0.7rem;
}
.cart-item-title {
  text-align: left;
  font-weight: 600;
}
.cart-wrapper:hover .cart-container {
  display: block;
}
.cart-wrapper i:hover {
  opacity: 0.8;
}
.cart-count {
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
.cart-list li {
}
.cart-list li:hover {
  background-color: #ebe8e8;
  cursor: pointer;
}
.cart-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  height: 130px;
  font-weight: 600;
  opacity: 0.8;
}
</style>