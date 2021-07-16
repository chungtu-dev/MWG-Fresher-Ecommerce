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

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public DateTime DateOrder { get; set; }

        public decimal TotalPrice { get; set; }

        public List<OrderDetailViewModel> Details { get; set; }

        public OrderViewModel()
        {
            TotalPrice = 0;
            Details = new List<OrderDetailViewModel>();
        }

        public void SetInfoOrderer(OrderEditModel editModel)
        {
            OrdererName = editModel.OrdererName;
            PhoneNumber = editModel.PhoneNumber;
            Address = editModel.Address;
        }
    }
}
