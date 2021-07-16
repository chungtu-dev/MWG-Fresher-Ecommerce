using Model.Order;
using Model.Product;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.OrderService
{
    public class MyOrderService : MyService<OrderViewModel>, IOrderService
    {
        public MyOrderService() : base("OrderData.json") { }

        public async Task<string> Add(OrderViewModel model)
        {
            model.IdOrder = Guid.NewGuid().ToString();
            model.DateOrder = DateTime.Now;

            var data = await ReadData();
            if (data == null) data = new List<OrderViewModel>();
            data.Add(model);

            bool response = await WriteData(data);
            if (response) return model.IdOrder;

            return null;
        }
    }
}
