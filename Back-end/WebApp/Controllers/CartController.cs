using Data.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Order;
using Model.OrderDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.ApiResult;

namespace WebApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class CartController : BaseController
    {
        private readonly IProductService _productService;
        public CartController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetCart")]
        public async Task<IActionResult> GetCart()
        {
            var cookieCart = GetDataFromJsonCookie<List<OrderDetailEditModel>>("cart");
            if (cookieCart == null) return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            return Ok(await GetAllItem(cookieCart));
        }


        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart(int productId)
        {
            return await AddItem(productId, 1);
        }

        [HttpPost("RemoveFromCart")]
        public async Task<IActionResult> RemoveFromCart(string productId)
        {
            return await RemoveItem(productId, true);
        }

        [HttpPost("ReduceItem")]
        public async Task<IActionResult> ReduceItem(string productId)
        {
            return await RemoveItem(productId, false);
        }

        private async Task<ApiResult> GetAllItem(List<OrderDetailEditModel> cookieCart)
        {
            ApiResult result;

            var cart = await _productService.GetCart(cookieCart);
            if (cart == null || cart.Details.Count == 0)
            {
                SetJsonDataCookie("cart", null);
                result = new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng");
            }
            else
                result = new ApiSuccessResult(cart);

            return result;
        }

        private async Task<IActionResult> AddItem(int productId, int number)
        {
            var product = await _productService.GetById(productId);
            if (product == null) return BadRequest("Không tìm thấy sản phẩm cần thêm");
            if (product.Numbers < number) return Ok(new ApiErrorResult("Hết hàng"));

            // write cookie save the product you want to buy
            var cookieCart = GetDataFromJsonCookie<List<OrderDetailEditModel>>("cart");
            if (cookieCart == null)
            {
                cookieCart = new List<OrderDetailEditModel>()
                {
                    new OrderDetailEditModel() { productId = product.productId, Numbers = number }
                };
            }
            else
            {
                // check product exists in cart
                var alreadyExists = cookieCart.Find(e => e.productId.Equals(product.productId));
                if (alreadyExists != null)
                    alreadyExists.Numbers += number;
                else
                    cookieCart.Add(new OrderDetailEditModel() { productId = product.productId, Numbers = number });
            }
            SetJsonDataCookie("cart", cookieCart);

            return Ok(await GetAllItem(cookieCart));
        }

        private async Task<IActionResult> RemoveItem(string productId, bool isClear)
        {
            var cookieCart = GetDataFromJsonCookie<List<OrderDetailEditModel>>("cart");
            if (cookieCart == null) return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            // check product exists in cart
            var alreadyExists = cookieCart.Find(e => e.productId.Equals(productId));
            if (alreadyExists == null) return BadRequest();

            if (isClear || alreadyExists.Numbers == 1) cookieCart.Remove(alreadyExists);
            else alreadyExists.Numbers--;
            SetJsonDataCookie("cart", cookieCart);

            return Ok(await GetAllItem(cookieCart));
        }
    }
}
