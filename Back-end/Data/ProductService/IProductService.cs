using Model.Cart;
using Model.Order;
using Model.OrderDetail;
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

        Task<List<ProductViewModel>> GetByBrand(int id);

        Task<List<ProductViewModel>> SearchByName(string name);

        Task<CartViewModel> GetCart(List<OrderDetailEditModel> cart);

        Task<bool> ReduceNumberProduct(List<OrderDetailEditModel> cart);
    }
}
