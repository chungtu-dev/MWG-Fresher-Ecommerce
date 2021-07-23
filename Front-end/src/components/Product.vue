<template>
  <div>
    <div class="container">
      <b-row>
        <!-- Ảnh sản phẩm -->
        <b-col cols="3">
          <img :src="item.product.productImg" alt="Img Detail" class="img" />
          <div class="btn">
            <span @click="xoa(item.product.productId)" class="btn_delete"
              >(x) Xóa</span
            >
          </div>
        </b-col>

        <!-- Thông tin + số lượng -->
        <b-col cols="6">
          <div class="col_ten_san_pham">
            <p class="ten_san_pham">
              Tên sản phẩm :
              {{ item.product.productName }}
            </p>
          </div>

          <b-row>
            <b-col cols="6">
              <b-row>
                <b-col cols="4"></b-col>
                <b-col cols="8">
                  <b-row>
                    <b-col
                      @click="sub(item.product.productId)"
                      class="btn_giam_so_luong"
                      type="button"
                      cols="4"
                      >-</b-col
                    >
                    <b-col class="count_so_luong" cols="4">{{
                      item.numbers
                    }}</b-col>
                    <b-col
                      @click="add(item.product.productId)"
                      class="btn_tang_so_luong"
                      type="button"
                      cols="4"
                      >+</b-col
                    >
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>

        <!-- Giá sản phẩm -->
        <b-col cols="3">
          <p class="price">{{$currency.formatCurrency(item.product.productPrice) }}</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";


export default {
  data() {
    return {
      result: 1,
    };
  },
  props: ["item"],
  computed: {
    ...mapGetters(["totalPrice"]),
  },
  created() {
  },
  methods: {
    ...mapActions([
      "increaseCartItem",
      "reduceCartItem",
      "deleteCartItem"
    ]),
    add(id) {
      this.increaseCartItem(id);
    },
    sub(id) {
      this.reduceCartItem(id);
    },
    xoa(id) {
      // this.xoaSanPham(id);
      this.deleteCartItem(id);
    },
  },
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 100px;
  margin-top: 10px;
}
.btn {
  margin-top: 10px;
}
.btn_delete {
  margin-top: 10px;
  font-size: 12px;
}
.btn_giam_so_luong {
  background-color: white;
  border: 1px solid black;
  background-color: rgb(226, 226, 226);
  border: none;
  margin-right: 5px;
}
.count_so_luong {
  background-color: white;
  border: 1px solid black;
  margin-right: 5px;
  font-size: 15px;
  border-radius: 5px;
}
.btn_tang_so_luong {
  background-color: white;
  border: 1px solid black;
  background-color: rgb(226, 226, 226);
  border: none;
  margin-right: -10px;
}
.txt_mau_san_pham {
  text-align: left;
  font-size: 15px;
}
.col_ten_san_pham {
  text-align: left;
  background-color: rgb(255, 255, 255);
}
.ten_san_pham {
  margin-top: 10px;
  text-align: left;
  font-size: 15px;
}
.price {
  margin-top: 10px;
  color: red;
  font-size: 15px;
}
</style>