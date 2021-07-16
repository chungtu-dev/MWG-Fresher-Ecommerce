using Model.Order;
using Model.OrderDetail;
using Model.Brand;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.BrandService
{
    public interface IBrandService
    {
        Task<List<BrandViewModel>> GetAll();

        Task<BrandViewModel> GetById(int id);

    }
}
