using Model.OrderDetail;
using Model.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.Order
{
    public class OrderEditModel
    {
        [Required(ErrorMessage = "Chưa có tên người đặt hàng")]
        public string OrdererName { get; set; }
        public bool IsMale { get; set; }

        [Required(ErrorMessage = "Chưa có số điện thoại người đặt hàng")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        [StringLength(10, ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Chưa có địa chỉ giao hàng")]
        public string Address { get; set; }
        public string OtherRequest { get; set; }
    }
}
