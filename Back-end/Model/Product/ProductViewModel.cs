using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Product
{
    public class ProductViewModel
    {
        public string IdProduct { get; set;}

        public string ProductName { get; set; }

        public string Description { get; set; }

        public string ImageURL { get; set; }

        public decimal Price { get; set; }

        public int Numbers { get; set; } 
    }
}
