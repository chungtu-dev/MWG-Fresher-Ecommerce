using Model.Order;
using Model.OrderDetail;
using Model.Product;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.ProductService
{
    public class MyProductService : MyService<ProductViewModel>, IProductService
    {
        public MyProductService() : base("ProductData.json") { }

        public async Task<List<ProductViewModel>> GetAll()
        {
            return await ReadData();
        }

        public async Task<ProductViewModel> GetById(string id)
        {
            var data = await ReadData();

            if (data == null) return null;
            return data.Find(e => e.IdProduct.Equals(id));
        }

        public async Task<OrderViewModel> GetCart(List<OrderDetailEditModel> cart)
        {
            var data = await ReadData();

            if (data == null) return null;
            var result = new OrderViewModel();

            foreach (var item in cart)
            {
                var find = data.Find(e => e.IdProduct.Equals(item.IdProduct));
                if (find != null)
                {
                    var newObj = new OrderDetailViewModel()
                    {
                        Product = find,
                        Numbers = item.Numbers,
                        TotalPrice = find.Price * item.Numbers
                    };
                    result.TotalPrice += newObj.TotalPrice;
                    result.Details.Add(newObj);
                }
            }

            return result;
        }

        public async Task<bool> ReduceNumberProduct(List<OrderDetailEditModel> cart)
        {
            var data = await ReadData();
            if (data == null) return false;
            foreach(var item in cart)
            {
                var find = data.Find(e => e.IdProduct.Equals(item.IdProduct));
                find.Numbers -= item.Numbers;
            }

            return await WriteData(data);
        }
    }
}
