using Model.Order;
using Model.Product;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.OrderService
{
    public interface IOrderService
    {
        Task<string> Add(OrderViewModel model);
    }
}
