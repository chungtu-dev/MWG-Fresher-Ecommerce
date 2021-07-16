using Data.BrandService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        // GET: All Brand
        [HttpGet("brand")]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _brandService.GetAll();

            if (brands == null) return NotFound();
            return Ok(brands);
        }


        // GET: brand/id
        [HttpGet("brand/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var brand = await _brandService.GetById(id);

            if (brand == null) return BadRequest();
            return Ok(brand);
        }
        
    }
}
