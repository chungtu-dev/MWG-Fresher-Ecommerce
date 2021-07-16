using Data.OrderService;
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
    public class OrderController : BaseController
    {
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        public OrderController(IProductService productService, IOrderService orderService)
        {
            _productService = productService;
            _orderService = orderService;
        }

        [HttpPost("Order")]
        public async Task<IActionResult> Order([FromBody] OrderEditModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cookieCart = GetDataFromJsonCookie<List<OrderDetailEditModel>>("cart");
            if (cookieCart == null) return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            bool checkInValidNumber = cookieCart.Any(e => e.Numbers <= 0);
            if (checkInValidNumber)
            {
                SetJsonDataCookie("cart", null);
                return BadRequest();
            }

            var cart = await _productService.GetCart(cookieCart);
            if (cart == null || cart.Details.Count == 0)
            {
                SetJsonDataCookie("cart", null);
                return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));
            }

            // check product is available
            List<string> error = new List<string>();
            foreach (var item in cart.Details)
            {
                var product = item.Product;
                if (product.Numbers < item.Numbers)
                {

                    string message = "Sản phẩm " + product.ProductName;
                    if (product.Numbers > 0) message = " chỉ còn " + product.Numbers + " sản phẩm";
                    else message = " đã hết hàng";

                    error.Add(message);
                }
            }
            if (error.Count != 0) return Ok(new ApiErrorResult(error.ToArray()));

            cart.SetInfoOrderer(request);
            var result = await _orderService.Add(cart);
            if (result == null) return Ok(new ApiErrorResult("Đặt hàng thất bại"));

            _productService.ReduceNumberProduct(cookieCart);
            SetJsonDataCookie("cart", null);
            return Ok(new ApiSuccessResult(cart));
        }

    }
}
