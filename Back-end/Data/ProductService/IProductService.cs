using Model.Order;
using Model.Product;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.ProductService
{
    public interface IProductService
    {
        Task<List<ProductViewModel>> GetAll();

        Task<ProductViewModel> GetById(string id);

        Task<OrderViewModel> GetCart(OrderEditModel cart);
    }
}
