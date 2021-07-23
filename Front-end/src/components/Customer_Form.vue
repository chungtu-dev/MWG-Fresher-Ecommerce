<template>
  <div>    
     <div>
        <form v-if="loading">
        <div class="container">
          <div class="txt_thong_tin_khach_hang row">THÔNG TIN KHÁCH HÀNG:</div>

          <div class="form-group">
            <b-row>
              <b-col cols="1">
                <label class="container_checkbox">
                  <input
                    class="checkinput"
                    type="radio"
                    name="radio"
                    v-model="form.Sex"
                    value="Nam"
                  />
                  <span class="checkmark"></span>
                  Anh
                </label>
              </b-col>
              &emsp;
              <b-col cols="1">
                <label class="container_checkbox">
                  <input
                    class="checkinput"
                    type="radio"
                    name="radio"
                    v-model="form.Sex"
                    value="Nữ"
                  />
                  <span class="checkmark"></span>
                  Chị
                </label>
              </b-col>
            </b-row>
          </div>

          <div class="form-group">
            <b-row class="container_thong_tin_khach_hang">
              <b-col cols="6">
                <div class="form-group">
                  <label for=""></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Họ và Tên"
                    v-model="form.Ho_Ten"
                  />
                </div>
              </b-col>
              <b-col cols="6">
                <div class="form-group">
                  <label for=""></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Số điện thoại"
                    v-model="form.So_Dien_Thoai"
                  />
                </div>
              </b-col>
            </b-row>
          </div>

          <b-row class="contaner_chon_dia_chi">
            <b-col cols="12">
              <b-row>
                <div class="txt_chon_dia_chi row">
                  &emsp;CHỌN ĐỊA CHỈ VÀ THỜI GIAN NHẬN HÀNG
                </div>
              </b-row>
            </b-col>

            <b-col cols="6">
              <div class="form-group">
                <div class="cbb_list_dia_chi">
                  <select
                    @change="getTenThanhPho(form.currentCity)"
                    v-model="form.currentCity"
                    class="select_context"
                  >
                    <option value="">Chọn thành phố</option>
                    <option
                      v-for="TinhThanh in list_Tinh_Thanh"
                      v-bind:value="{
                        id: TinhThanh.province_id,
                        name: TinhThanh.province_name,
                      }"
                      :key="TinhThanh.province_id"
                    >
                      {{ TinhThanh.province_name }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>

            <b-col cols="6">
              <div class="form-group">
                <div class="cbb_list_dia_chi">
                  <select
                    @change="getTenXaHuyen(form.currentQuanHuyen)"
                    v-model="form.currentQuanHuyen"
                    class="select_context"
                  >
                    <option value="">Chọn Quận Huyện</option>
                    <option
                      v-for="QuanHuyen in list_Quan_Huyen"
                      v-bind:value="{
                        id: QuanHuyen.district_id,
                        name: QuanHuyen.district_name,
                      }"
                      :key="QuanHuyen.district_id"
                    >
                      {{ QuanHuyen.district_name }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>

            <b-col cols="6">
              <div class="form-group">
                <div class="cbb_list_dia_chi">
                  <select class="select_context" v-model="form.currentThiTran">
                    <option value="">Chọn Xã/Thị trấn</option>
                    <option
                      v-for="XaHuyen in list_Xa_Huyen"
                      :value="{ id: XaHuyen.ward_id, name: XaHuyen.ward_name }"
                      :key="XaHuyen.ward_id"
                    >
                      {{ XaHuyen.ward_name }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>

            <b-col class="input_nhap_dia_chi" cols="6">
              <div class="form-group">
                <label for=""></label>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="helpId"
                  placeholder="Số nhà, tên đường"
                  v-model="form.SoNha_TenDuong"
                />
              </div>
            </b-col>
          </b-row>

          <b-row class="txt_yeu_cau_khac">
            <b-col cols="12">
              <div class="form-group">
                <label for=""></label>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="helpId"
                  placeholder="Yêu cầu khác (không bắt buộc)"
                  v-model="form.Yeu_Cau_Khac"
                />
              </div>
            </b-col>
          </b-row>
        </div>
        <hr />
        <b-row>
          <b-col cols="6">Tổng tiền</b-col>
          <b-col cols="6">{{ $currency.formatCurrency(cartTotalPrice) }}</b-col>
          <b-col class="_dathang" cols="12">
            <button @click.prevent="postForm" class="btn_dat_hang">
              <b style="text-transform: uppercase">Đặt hàng</b>
            </button>
          </b-col>
        </b-row>
      </form>      
      <!-- <span v-else><img class="loadingGif" :src="'https://www.hoteldekhang.biz/wp-content/uploads/2018/07/loading.gif'"/>&emsp;VUI LÒNG ĐỢI...</span> -->
     </div>  
     <!-- <span v-else>ĐẶT HÀNG THÀNH CÔNG!</span> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        currentCity: "",
        currentQuanHuyen: "",
        currentThiTran: "",
        Sex: "",
        Ho_Ten: "",
        So_Dien_Thoai: "",
        SoNha_TenDuong: "",
        Yeu_Cau_Khac: "",
      },
      loading: true,
      isShow: true,
    };
  },
  computed: mapGetters([
    "cartTotalPrice",
    "list_Tinh_Thanh",
    "list_Quan_Huyen",
    "list_Xa_Huyen",
    "ThongTinKhachHang",
    "list_San_Pham"
  ]),

  mounted(){
    
  },
  created() {
    this.getListTinhThanh();
    this.getListSanPham();
  },

  methods: {
    ...mapActions([
      "getListTinhThanh",
      "getListQuanHuyen",
      "getListXaHuyen",
      "placeAnOrder",
      "getListSanPham"
    ]),

    getTenThanhPho(selected) {
      this.getListQuanHuyen(selected.id);

      console.log(selected.id);
    },

    getTenXaHuyen(selected) {
      this.getListXaHuyen(selected.id);
      console.log(selected.id);
    },

    postForm() {
      let form = this.form;
      let requestData = {
        OrdererName: form.Ho_Ten,
        sex: form.Sex,
        phoneNumber: form.So_Dien_Thoai,

        address:
          form.SoNha_TenDuong +
          ", " +
          form.currentCity.name +
          ", " +
          form.currentQuanHuyen.name +
          ", " +
          form.currentThiTran.name,

        otherRequest: form.Yeu_Cau_Khac,
      };
      this.placeAnOrder(requestData);
      this.loading = false;      
      setTimeout(() => {   
        this.isShow=false;   
        this.loading = true;
      },5000);
    },
  },
};
</script>

<style scoped>
.txt_thong_tin_khach_hang {
  margin-bottom: 5px;
}
.container_thong_tin_khach_hang {
  padding-bottom: 10px;
  margin-top: -15px;
}
.container_checkbox {
  display: block;
  position: relative;
  padding-left: 25px;
  top: 0px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.container_checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 2px;
  height: 20px;
  width: 20px;
  background-color: rgb(226, 226, 226);
  border-radius: 50%;
}
.container_checkbox:hover input ~ .checkmark {
  background-color: rgb(194, 194, 194);
}
.container_checkbox input:checked ~ .checkmark {
  background-color: #ffd375;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.container_checkbox input:checked ~ .checkmark:after {
  display: block;
}
.container_checkbox .checkmark:after {
  top: 7px;
  left: 7px;
  width: 6px;
  height: 6px;
  border-radius: 60%;
  background: white;
}
.txt_chon_dia_chi {
  padding-top: 10px;
  padding-bottom: 5px;
  margin-left: 0px;
}
.contaner_chon_dia_chi {
  background-color: rgb(216, 216, 216);
  padding-bottom: 10px;
  border-radius: 10px;
}
.input_nhap_dia_chi {
  margin-top: -20px;
}
.select_context {
  width: 100%;
  margin-bottom: 10px;
  height: 36px;
  border: none;
  border-radius: 3px;
}
.txt_yeu_cau_khac {
  margin-top: 10px;
  margin-bottom: 20px;
}
.btn_dat_hang {
  color: #fff;
  height: 50px;
  margin: 10px auto;
  width: 100%;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  background: linear-gradient(180deg, #f79429, #f7712e);
}
.loadingGif{
  width: 50px;
  height: 50px;
  border-radius:40px;
}
</style>
