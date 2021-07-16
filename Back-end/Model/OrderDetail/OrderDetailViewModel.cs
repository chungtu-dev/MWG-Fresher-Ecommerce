using Model.Product;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model.OrderDetail
{
    public class OrderDetailViewModel
    {
        public ProductViewModel Product { get; set; }

        public int Numbers { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
