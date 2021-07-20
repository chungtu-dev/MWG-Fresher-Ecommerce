using Model.OrderDetail;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Cart
{
    public class CartViewModel
    {
        public decimal TotalPrice { get; set; }

        public List<OrderDetailViewModel> Details { get; set; }

        public CartViewModel()
        {
            TotalPrice = 0;
            Details = new List<OrderDetailViewModel>();
        }
    }
}
