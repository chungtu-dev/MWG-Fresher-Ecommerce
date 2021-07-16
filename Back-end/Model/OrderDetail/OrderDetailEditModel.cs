using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.OrderDetail
{
    public class OrderDetailEditModel
    {
        [Required(ErrorMessage = "Chưa có sản phẩm")]
        public string IdProduct { get; set; }

        [Range(minimum: 1, maximum: Int32.MaxValue, ErrorMessage = "Số lượng không hợp lệ")]
        public int Numbers { get; set; }
    }
}
