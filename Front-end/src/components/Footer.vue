<template>
    <b-container fluid class="footer-wrapper">
        <b-row>
            <b-col lg="3" md="4" sm="6">
                <ul class="footer-1-list">
                    <div class="footer-header">Thông tin</div>
                    <li class="footer-item">Địa chỉ: Cà Mau</li>
                    <li class="footer-item">SĐT: 0844426425</li>
                    <li class="footer-item">Email: chuongnd26@gmail.com</li>
                </ul>
            </b-col>
            <b-col lg="3" md="4" sm="6">
                <ul class="footer-2-list">
                    <div class="footer-header">Hướng dẫn mua hàng</div>
                    <li class="footer-item">Chính sách đổi trả</li>
                    <li class="footer-item">Chính sách bảo hành</li>
                    <li class="footer-item">Chính sách giao hàng</li>
                    <li class="footer-item">Kiểm định</li>

                </ul>
            </b-col>
            <b-col lg="3" md="4" sm="6">
                <ul class="footer-3-list">
                    <div class="footer-header">Liên hệ</div>
                    <li class="footer-item">SĐT: 0844426425</li>
                    <li class="footer-item">Email: chuongnd26@gmail.com</li>
                </ul>
            </b-col>
            <b-col lg="3" md="4" sm="6">
                <ul class="footer-4-list">
                    <div class="footer-header">Social</div>
                    <li class="footer-item">
                        <i class="fab fa-facebook-square"></i>
                    </li>
                    <li class="footer-item">
                        <i class="fab fa-instagram-square"></i>
                    </li>
                    <li class="footer-item">
                        <i class="fab fa-twitter-square"></i>
                    </li>
                </ul>
            </b-col>
        </b-row>
        <b-row class="footer-credit">
            <div class="credit">Copyright &#169; Nguyen Dinh Chuong 2021</div>
        </b-row>
    </b-container>
</template>
<script>
export default {
    name:'footer-element'
}
</script>
<style scoped>
    .footer-header{
        font-size: 1rem;
        font-weight: 600;
    }
    .footer-wrapper
    {
        height: auto;
        margin: 36px 0 0 0;
        width: 100%;
        background-color: #17a2b8;
        min-height: 120px;
        text-align: left;
        color: #e6e3e3;
    }
    .footer-wrapper ul{
        list-style: none;
        padding: 12px 0px;
    }
    .footer-4-list{
        flex-direction: row!important;
    }
    .footer-credit{
        text-align: center;
        background-color: #99a3a5;
    }
    .footer-item
    {
        cursor: pointer;
    }
    .footer-item:hover{
        color: white;
        transition: 0.1s ease-in;
    }
    .credit{
        width: 100%;
        color: #e6e3e3;
    }
</style>