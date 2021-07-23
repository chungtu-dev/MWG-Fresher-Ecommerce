<template>
  <div class="cart">
    <Header title="Cart" path=" / Cart"></Header>
    <b-container class="cart-order-container">
      <div class="row justify-content-center container_product">
        <div class="row">
          <div class="col-2 main_color"></div>

          <div class="col-8 main_background_color">
            <div v-if="cartData && cartData.length > 0" class="row row-cols-3">
              <div class="col-12 sub_product">
                <Product
                  v-for="item in cartData"
                  :key="item.product.productId"
                  :item="item"
                />
                <hr />
                <b-row>
                  <b-col cols="12">
                    {{ $currency.formatCurrency(cartTotalPrice) }}
                  </b-col>
                </b-row>
                <hr />
              </div>
              <div class="col-12 sub_product"><CustomerForm /></div>
            </div>
            <div
              v-if="!cartData || cartData.length == 0"
              class="row empty-cart-order"
            >
              <div class="message mb-2">Giỏ hàng trống</div>
              <router-link to="/">
                <div class="message-return-home">
                  Bắt đầu mua sắm
                <i class="fas fa-shopping-cart"></i>
                  </div> 
              </router-link>
            </div>
          </div>
          <div class="col-2 main_color"></div>
        </div>
      </div>
      <notifications
        group="message"
        position="bottom right"
        animation-type="velocity"
        :speed="500"
        :duration="2000"
      />
    </b-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import CustomerForm from "../components/Customer_Form.vue";
import Product from "../components/Product.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    Header,
    CustomerForm,
    Product,
  },
  computed: {
    ...mapGetters(["cartData", "cartTotalPrice"]),
  },
  methods: {
    ...mapActions(["setCartData"])
  },
  created() {
    this.setCartData();
    console.log(this.cartData);
  },
};
</script>
<style scoped>
a {
}
a:hover {
  text-decoration: none;
}
.cart-order-container {
  box-shadow: 8px 16px 24px #ccc;
  border: 1px solid #c7c7c7;
  padding: 12px;
}
.empty-cart-order {
  justify-content: center;
}
.sub_product {
  background-color: rgb(255, 255, 255);
}
.message-return-home i{
  color: #1885ff
}

</style>