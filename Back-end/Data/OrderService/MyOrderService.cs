using Model.Product;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.OrderService
{
    public class MyOrderService : MyService<ProductViewModel>, IOrderService
    {
        public MyOrderService() : base("ProductData.json") { }

        public Task<string> Add()
        {
            throw new NotImplementedException();
        }
    }
}
