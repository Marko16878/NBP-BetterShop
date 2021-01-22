using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace baze.Models
{
   public class Product
    {
        public string productid { get; set; }
        public string added_date { get; set; }
        public List<string> categories { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public string name { get; set; }
        public string price { get; set; }
        public string rating { get; set; }
        public string stock { get; set; }
        public string sold {get; set;}

        public string count { get; set; }   
    }
}