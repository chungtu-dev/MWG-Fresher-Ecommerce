using Model.Cart;
using Model.OrderDetail;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Order
{
    public class OrderViewModel
    {
        public string IdOrder { get; set; }

        public string OrdererName { get; set; }

        public bool IsMale { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public DateTime DateOrder { get; set; }

        public string OrderRequest { get; set; }

        public CartViewModel Cart { get; set; }

        public OrderViewModel(OrderEditModel editModel, CartViewModel cart)
        {
            OrdererName = editModel.OrdererName;
            PhoneNumber = editModel.PhoneNumber;
            Address = editModel.Address;
            Cart = cart;
        }
    }
}
