using Model.Order;
using Model.OrderDetail;
using Model.Brand;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model.Product;

namespace Data.BrandService
{
    public class MyBrandService : MyService<BrandViewModel>, IBrandService
    {
        public MyBrandService() : base("BrandData.json") { }

        public async Task<List<BrandViewModel>> GetAll()
        {
            return await ReadData();
        }

        public async Task<BrandViewModel> GetById(int id)
        {
            var data = await ReadData();

            if (data == null) return null;
            return data.Find(e => e.id.Equals(id));
        }
    }
}
