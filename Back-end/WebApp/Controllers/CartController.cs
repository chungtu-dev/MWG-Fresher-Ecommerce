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
            var cookieCart = GetDataFromJsonCookie<OrderEditModel>("cart");
            if (cookieCart == null) return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            var cart = await _productService.GetCart(cookieCart);
            if (cart == null || cart.Details.Count == 0)
                return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            // check session is created
            var sessionCart = GetDataFromJsonSession<OrderViewModel>("cart");
            if (sessionCart == null) SetJsonDataSession("cart", cart);

            return Ok(new ApiSuccessResult(cart));
        }


        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart(string idProduct)
        {
            var product = await _productService.GetById(idProduct);
            if (product == null) return BadRequest("Không tìm thấy sản phẩm cần thêm");
            if (product.Numbers == 0) return Ok(new ApiErrorResult("Hết hàng"));

            // write cookie save the product you want to buy
            var cookieCart = GetDataFromJsonCookie<OrderEditModel>("cart");
            if (cookieCart == null)
            {
                cookieCart = new OrderEditModel();
                cookieCart.Details.Add(new OrderDetailEditModel() { IdProduct = product.IdProduct, Numbers = 1 });
            }
            else
            {
                // check product exists in cart
                var alreadyExists = cookieCart.Details.Find(e => e.IdProduct.Equals(product.IdProduct));
                if (alreadyExists != null)
                    alreadyExists.Numbers++;
                else
                    cookieCart.Details.Add(new OrderDetailEditModel() { IdProduct = product.IdProduct, Numbers = 1 });
            }
            SetJsonDataCookie("cart", cookieCart);

            // write session save the product you want to buy
            var sessionCart = GetDataFromJsonSession<OrderViewModel>("cart");
            if (sessionCart == null)
            {
                sessionCart = new OrderViewModel();
                sessionCart.Details.Add(new OrderDetailViewModel() { Product = product, Numbers = 1, TotalPrice = product.Price });
            }
            else
            {
                // check product exists in cart
                var alreadyExists = sessionCart.Details.Find(e => e.Product.IdProduct.Equals(product.IdProduct));
                if (alreadyExists != null)
                    alreadyExists.Numbers++;
                else
                    sessionCart.Details.Add(new OrderDetailViewModel() { Product = product, Numbers = 1, TotalPrice = product.Price });
            }
            sessionCart.TotalPrice += product.Price;
            SetJsonDataSession("cart", sessionCart);

            return Json(new ApiSuccessResult(sessionCart.TotalPrice));
        }

        [HttpPost("RemoveFromCart")]
        public async Task<IActionResult> RemoveFromCart(string idProduct)
        {
            var cookieCart = GetDataFromJsonCookie<OrderEditModel>("cart");
            if (cookieCart == null) return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            // check product exists in cart
            var alreadyExists = cookieCart.Details.Find(e => e.IdProduct.Equals(idProduct));
            if (alreadyExists == null) return BadRequest();
            cookieCart.Details.Remove(alreadyExists);

            var cart = await _productService.GetCart(cookieCart);
            if (cart == null || cart.Details.Count == 0)
                return Ok(new ApiErrorResult("Không có sản phẩm nào trong giỏ hàng"));

            SetJsonDataSession("cart", cart);
            return Ok(new ApiSuccessResult(cart));
        }
    }
}
