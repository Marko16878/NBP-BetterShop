using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using baze.Models;

namespace baze.Models
{
   public class Cart
    {
        public string userid { get; set;}
        public List<Product> products { get; set;}
    }
}