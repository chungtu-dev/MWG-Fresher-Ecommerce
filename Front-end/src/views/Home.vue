<template>
  <div class="home">
    <Header title="Home" path=""></Header>
    <b-container>
      <b-row>
        <b-col class="filter-part" md="2" sm="3">
          <h2 class="filter-part-header">Category</h2>
          <ul class="filter-part-list">
            <li
              @click="handleFilter(null, $event)"
              class="filter-list-item active"
            >
              All
            </li>
            <li
              @click="handleFilter(item.id, $event)"
              class="filter-list-item"
              v-for="item in brand"
              :key="item.id"
            >
              {{ item.name }}
            </li>
          </ul>
        </b-col>
        <b-col class="product-part" md="10" sm="9">
          <b-row>
            <div
              class="empty-product"
              v-if="product.length == 0 || !product.length"
            >
              Không có sản phẩm
            </div>
            <ProductItem
              v-for="item in product"
              :key="item.productId"
              :data="item"
            ></ProductItem>
          </b-row>
        </b-col>
      </b-row>
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
// @ is an alias to /src
import Header from "@/components/Header";

import ProductItem from "@/components/ProductItem";
import { mapActions, mapGetters } from "vuex";
// import { v4 as uuidv4 } from 'uuid';

export default {
  name: "Home",
  mounted() {
    this.setCartData();
  },
  created() {
    this.getProducts();
    this.getBrandFilter();

    //Get cart data
    // console.log(this.$cookies.get("cart"));
  },
  computed: {
    ...mapGetters(["product", "brand"]),
  },
  components: {
    Header,
    ProductItem,
  },
  methods: {
    ...mapActions([
      "getProducts",
      "getBrandFilter",
      "filterByBrand",
      "setCartData",
    ]),
    handleFilter(brandID, e) {
      var item = e.target;
      var currentActiveItem = document.querySelector(".active");
      if (currentActiveItem) {
        currentActiveItem.classList.remove("active");
      }
      item.classList.add("active");
      this.filterByBrand(brandID);
    },
  },
};
</script>
<style>
.product-wrapper {
  max-width: 100%;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 4px 2px #e1e1e1;
  border: 0.5px solid transparent;
  transition: all 0.3s ease-in;
}
.product-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 1px 2px 10px #29bad0;
}
.product-wrapper:hover .btn-wrapper {
  transform: translate(-30px, -50%);
}
.product-img-wrapper {
  height: 190px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.product-img {
  width: 100%;
  height: auto;
  max-width: 160px;
  max-height: 200px;
}
.product-info {
  margin-top: 32px;
}
.product-title {
  font-size: 1.1rem;
  font-weight: 600;
}
.product-price {
  font-size: 1.1rem;
  color: #17a2b8;
}
.product-title:hover {
  color: #17a2b8;
  transition: 0.2s ease-in;
}
.btn-wrapper {
  position: absolute;
  right: -36px;
  top: 50%;
  /* transform: translateY(-50%); */
  transform: translateY(-50%);
  padding: 6px;
  transition: all 0.2s ease-in;
  list-style: none;
}
.btn-addtocart,
.btn-addtofav {
  background-color: #17a2b8;
  margin: 2px 0;
  padding: 6px;
}
.btn-addtocart:hover,
.btn-addtofav:hover {
  background-color: #0890a5;
  transform: scale(1.05);
  transition: 0.1s ease-in;
}
.btn-addtofav {
}
.fa-shopping-cart,
.fa-heart {
  color: white;
}
.filter-part-list {
  list-style: none;
  text-align: left;
  padding-left: 0px;
}
.filter-part-list li {
  padding: 12px 0;
  cursor: pointer;
}
.filter-part-list li:hover {
  color: #17a2b8;
}
.filter-part-header {
  margin-left: -20px;
  cursor: default;
}
.empty-product {
  width: 100%;
  height: 260px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.filter-list-item.active {
  color: #17a2b8;
}

@media screen and (max-width: 576px) {
  .filter-part-list {
    text-align: center;
  }
}
</style>
