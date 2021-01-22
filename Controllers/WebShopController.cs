using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using baze.Models;
using System.Runtime.InteropServices;
using Newtonsoft.Json;

namespace baze.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebShopController : ControllerBase
    {


        [Route("Users")]
        [HttpGet]
        public List<User> GetUsers()
        {

            ISession session = SessionManager.GetSession();
            List<User> users = new List<User>();
            

            if (session == null)
                return null;

            var usersData = session.Execute("select * from users");

            
            foreach(var userData in usersData)
            {
                User user = new User();
                //user.userid = userData["userid"] != null ? userData["userid"].ToString() : string.Empty;
                user.address = userData["address"] != null ? userData["address"].ToString() : string.Empty;
                user.email = userData["email"] != null ? userData["email"].ToString() : string.Empty;
                user.firstname = userData["firstname"] != null ? userData["firstname"].ToString() : string.Empty;
                user.lastname = userData["lastname"] != null ? userData["lastname"].ToString() : string.Empty;
                users.Add(user);
            }
            return users;
        }


        [Route("RegisterUser")]
        [HttpPost]
        public void RegisterUser(User user)
        {
            ISession session = SessionManager.GetSession();

            if(session != null)
            {  
                Guid id = Guid.NewGuid();

                var userData = session.Execute("insert into users (userid, address, email, firstname, lastname) values  ("+ id +",'" + user.address + "','" + user.email + "','" + user.firstname + "','" + user.lastname + "') if not exists;");     
                
                if(Convert.ToBoolean(userData.FirstOrDefault()[0]))
                {
                    var loginData = session.Execute("insert into user_credentials (email, password, userid) values ('" + user.email + "','" + user.password + "'," + id + ");");
                }
            }
        }

        [Route("Login/{email}/{password}")]
        [HttpGet]

        public JsonResult Login(string email, string password)
        {
            ISession session = SessionManager.GetSession();
            User user = new User();

            if (session == null)
                return null;

            var userID = session.Execute("select * from user_credentials where email = '" + email + "' and password = '" + password + "';").FirstOrDefault();
            //user.userid = userID["userid"].ToString() != null ? userID["userid"].ToString() : string.Empty;

            var userData = session.Execute("select * from users where userid = " + userID["userid"] + ";").FirstOrDefault();
            user.userid = userData["userid"] != null ? userData["userid"].ToString() : string.Empty;
            user.address = userData["address"] != null ? userData["address"].ToString() : string.Empty;
            user.email = userData["email"] != null ? userData["email"].ToString() : string.Empty;
            user.firstname = userData["firstname"] != null ? userData["firstname"].ToString() : string.Empty;
            user.lastname = userData["lastname"] != null ? userData["lastname"].ToString() : string.Empty;

            return new JsonResult(user);
        }



        [Route("User/{userid}")]
        [HttpGet]

        public JsonResult User(string userid)
        {
            ISession session = SessionManager.GetSession();
            User user = new User();

            if (session == null)
                return null;

            
            //user.userid = userID["userid"].ToString() != null ? userID["userid"].ToString() : string.Empty;

            var userData = session.Execute("select * from users where userid = " + userid + ";").FirstOrDefault();
            user.userid = userData["userid"] != null ? userData["userid"].ToString() : string.Empty;
            user.address = userData["address"] != null ? userData["address"].ToString() : string.Empty;
            user.email = userData["email"] != null ? userData["email"].ToString() : string.Empty;
            user.firstname = userData["firstname"] != null ? userData["firstname"].ToString() : string.Empty;
            user.lastname = userData["lastname"] != null ? userData["lastname"].ToString() : string.Empty;

            return new JsonResult(user);
        }



        [Route("AddProduct")]
        [HttpPost]

        public void AddProduct(string categories, string description, string image, string name, string price, string stock)
        {
            ISession session = SessionManager.GetSession();

            if(session != null)
            {  
                Guid id = Guid.NewGuid();

                string[] splitedCategories = categories.Split(',');
                string[] categoriesForInsert = new string[splitedCategories.Length];
                int i = 0;

                foreach (var category in splitedCategories)
                {
                    categoriesForInsert[i] = "'" + category + "'";
                    i++;
                }

                string stringCategories = string.Join(",", categoriesForInsert);

                var productData = session.Execute("insert into products (productid, added_date, categories, description, image, name, price, rating, stock, sold) values  ("+ id +
                ", toTimeStamp(now()), {" + stringCategories + "},'" + description + "','" + image + "', '" + name + "', " + price + ", 0 , " + stock + ", 0 ) if not exists;");     
                
               
                if(Convert.ToBoolean(productData.FirstOrDefault()[0]))
                {
                    foreach (var category in splitedCategories)
                    {
                        var categoryData = session.Execute("insert into products_by_category (productid, added_date, category, image, name, price, rating, sold) values  (" + id +
                        ", toTimeStamp(now()), '" + category + "','" + image + "', '" + name + "', " + price + ", 0 ,0) if not exists;");   

                        var soldData = session.Execute("insert into products_by_category_sold (productid, added_date, category, image, name, price, rating, sold) values  (" + id +
                        ", toTimeStamp(now()), '" + category + "','" + image + "', '" + name + "', " + price + ", 0 ,0) if not exists;");   

                        var ratingData = session.Execute("insert into products_by_category_rating (productid, added_date, category, image, name, price, rating, sold) values  (" + id +
                        ", toTimeStamp(now()), '" + category + "','" + image + "', '" + name + "', " + price + ", 0 ,0) if not exists;");  
                        
                    }
                    /*
                    session.Execute("update newest set id = 2 where id = 1;");
                    session.Execute("update newest set id = 3 where id = 2;");
                    session.Execute("update newest set id = 4 where id = 3;");
                    session.Execute("insert into newest (id,image,name,price,productid,rating,sold) values (1,'"+
                                    image + "','" + name + "'," + price + "," + id + ",0,0;");
                    */
                }
                
            }
        }


        [Route("GetProducts")]
        [HttpGet]
        
        public JsonResult GetProducts()
        {

            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var productsData = session.Execute("select * from products");
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.added_date = productData["added_date"] != null ? productData["added_date"].ToString() : string.Empty;

                product.categories = new List<string>();
                if(productData["categories"] != null)
                {
                    object categories = productData["categories"];
                    var categoriesString = JsonConvert.SerializeObject(categories);
                    string[] splitedCategories = categoriesString.Split('[',',','"',']');
                    foreach(string category in splitedCategories)
                    {
                        if(category.Length > 0)
                        {
                            product.categories.Add(category);
                        }
                    }
                }

                product.description = productData["description"] != null ? productData["description"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                product.stock = productData["stock"] != null ? productData["stock"].ToString() : string.Empty;

                
                products.Add(product);
            }

            return new JsonResult(products);
        }

        [Route("GetProductsCategory/{category}")]
        [HttpGet]
        
        public JsonResult GetProductsCategory(string category)
        {

            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var productsData = session.Execute("select * from products_by_category where category = '" + category + "'");
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.added_date = productData["added_date"] != null ? productData["added_date"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                
                products.Add(product);
            }

            return new JsonResult(products);
        }



        [Route("GetProduct/{productid}")]
        [HttpGet]
        
        public JsonResult GetProduct(string productid)
        {

            ISession session = SessionManager.GetSession();
            Product product = new Product();

            if (session == null)
                return null;

            var productData = session.Execute("select * from products where productid = " + productid + "").FirstOrDefault();
            
            product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
            product.added_date = productData["added_date"] != null ? productData["added_date"].ToString() : string.Empty;

            product.categories = new List<string>();
            if(productData["categories"] != null)
            {
                object categories = productData["categories"];
                var categoriesString = JsonConvert.SerializeObject(categories);
                string[] splitedCategories = categoriesString.Split('[',',','"',']');
                foreach(string category in splitedCategories)
                {
                    if(category.Length > 0)
                    {
                        product.categories.Add(category);
                    }
                }
            }   

            product.description = productData["description"] != null ? productData["description"].ToString() : string.Empty;
            product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
            product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
            product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
            product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
            product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
            product.stock = productData["stock"] != null ? productData["stock"].ToString() : string.Empty;

            return new JsonResult(product);
        }


        [Route("AddToCart/{userid}/{count}")]
        [HttpPost]
        public JsonResult AddToCart([FromRoute()] string userid,[FromRoute()] int count, [FromBody()] Product product)
        {
            ISession session = SessionManager.GetSession();

            if(session != null)
            {  

                var productData = session.Execute("insert into cart (count, description, image, name, price, productid, rating, userid) values  (" +
                count + ",'" + product.description + "','" + product.image + "','" + product.name + "'," + product.price  + "," + product.productid 
                + "," + product.rating + "," + userid + ") if not exists;").FirstOrDefault();

                if(Convert.ToBoolean(productData[0]))
                {
                    return new JsonResult("dodat je upravo");
                }
                else
                {
                    int newCount = count + Convert.ToInt32(productData["count"]);
                    var updateData = session.Execute("update cart set count = " + newCount + " where userid = " + userid + " and productid = " + product.productid);
                    return new JsonResult("lepo dodato");
                }

                //var userData = session.Execute("insert into cart (added_date, image, name, price, productid, rating, userid) values  ("
                //+ "toTimeStamp(now()),'" + "sllika" + "','" + "ime" + "'," + "10" + "," + "1f85a3ff-74e3-4e4e-ac4a-ea2399a60ff4"
               // + "," + "5" + "," + userid + ") if not exists;");  
            }
            return null;
        }

        [Route("GetCart/{userid}")]
        [HttpGet]
        public JsonResult GetCart(string userid)
        {
            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;


            var productsData = session.Execute("select * from cart where userid = " + userid + " ;"); 
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.description = productData["description"] != null ? productData["description"].ToString() : string.Empty;
                product.count = productData["count"] != null ? productData["count"].ToString() : string.Empty;
                
                products.Add(product);
            }

            return new JsonResult(products);
        }

        [Route("DeleteFromCart/{productid}/{userid}")]
        [HttpDelete]

        public void DeleteFromCart(string productid, string userid)
        {
            ISession session = SessionManager.GetSession();

            if (session != null)
            {
                var productsData = session.Execute("delete from cart where userid = " + userid + " and productid = " + productid + ";"); 
            }
        }        

        [Route("BuyProduct/{userid}")]
        [HttpGet]

        public JsonResult BuyProduct (string userid){

            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var ids = session.Execute("select productid from cart where userid = " + userid + ";");
            
            var productIds = new List<String>();
            
            foreach (var id in ids)
            {
                productIds.Add(id["productid"].ToString());
            }

            var idsFormatted = String.Join(',', productIds);
            var productsData = session.Execute("select * from products where productid in ( " + idsFormatted + " );");
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                
                product.categories = new List<string>();
                if(productData["categories"] != null)
                {
                    object categories = productData["categories"];
                    var categoriesString = JsonConvert.SerializeObject(categories);

                    string[] splitedCategories = categoriesString.Split('[',',','"',']');
                    foreach(string category in splitedCategories)
                    {
                        if(category.Length > 0)
                        {
                            product.categories.Add("'" + category.ToString() + "'");
                        }
                    }
                }
                
            

                string stringCategories = string.Join(",", product.categories);

                //return new JsonResult(stringCategories);
                
                product.description = productData["description"] != null ? productData["description"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                product.stock = productData["stock"] != null ? productData["stock"].ToString() : string.Empty;
                
                products.Add(product);
                
                var count = session.Execute("select count from cart where userid = " + userid + " and productid = " + product.productid + ";").FirstOrDefault();
                if(Convert.ToInt32(count[0]) > Convert.ToInt32(product.stock))
                {
                    string ispis = "Na stanju imamo " + product.stock + " proizvoda: " + product.name;
                    return new JsonResult(ispis);
                }
                var newSold = Convert.ToInt32(product.sold)+1;
                var newStock = Convert.ToInt32(product.stock)-1;;


                session.Execute("update products set sold = " + newSold + ", stock = " + newStock + " where productid = " + product.productid + ";");
                
                
                session.Execute("update products_by_category_rating set sold = " + newSold + " where category in ( " +
                stringCategories + " ) and rating = " + product.rating + " and productid = " + product.productid + ";");

                session.Execute("update products_by_category set sold = " + newSold  +
                " where category in ( " + stringCategories + " ) and price = " + product.price + ";");

                session.Execute("delete from products_by_category_sold where category in ( " +
                stringCategories + " ) and sold = " + product.sold + " and productid = " + product.productid + ";");

                if(productData["categories"] != null)
                {
                    object categories = productData["categories"];
                    var categoriesString = JsonConvert.SerializeObject(categories);

                    string[] splitedCategories = categoriesString.Split('[',',','"',']');
                    foreach(string category in splitedCategories)
                    {
                        if(category.Length > 0)
                        {
                            var soldData = session.Execute("insert into products_by_category_sold (productid, added_date, category, image, name, price, rating, sold) values  (" + 
                            product.productid +  ", toTimeStamp(now()), '" + 
                            category + "','" + product.image + "', '" + product.name + 
                            "', " + product.price + ", " + product.rating + ", " + newSold +  ") if not exists;");   
                            session.Execute("delete from products_by_category_sold where category in ( " +
                stringCategories + " ) and sold = " + product.sold + " and productid = " + product.productid + ";");

                        }
                    }
                }
                


            }

            session.Execute("delete from cart where userid = " + userid + " ;");

            var allCategories = new List<String>();

            foreach (var product in products)
            {
                foreach (var category in product.categories)
                {
                    allCategories.Add(category);
                }
            }

            var rand = new Random();
            var selectedCategories = new List<String>();

            for(int i=0 ; i<(allCategories.Count-1); i++)
            {
                var ind = rand.Next(allCategories.Count-1);
                selectedCategories.Add(allCategories.ElementAt(ind));
            }

            var selectedProducts = new List<Product>();

            foreach (var category in selectedCategories)
            {
                var productscategoryData = session.Execute("select * from products_by_category where category = " + category + " ;");
                products = new List<Product>();

                foreach(var productData in productscategoryData)
                {
                    Product product = new Product();
                    product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                    product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                    product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                    product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                    product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                    product.added_date = productData["added_date"] != null ? productData["added_date"].ToString() : string.Empty;
                    product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                    
                    products.Add(product);
                }

                var ind = rand.Next(products.Count);

                while( selectedProducts.Find(y => y.productid == products.ElementAt(ind).productid) != null)
                {
                    ind = rand.Next(products.Count);
                }

                selectedProducts.Add(products.ElementAt(ind));

                
            }

            foreach(var selectedProduct in selectedProducts)
            {
                var recProducts = session.Execute("insert into product_recommendations (userid, added_date, productid, image, name, price,rating,sold) values  (" +
                    userid + ", toTimeStamp(now()) ," + selectedProduct.productid + ",'" + selectedProduct.image + "','" + 
                    selectedProduct.name + "'," + selectedProduct.price + "," + selectedProduct.rating + "," + selectedProduct.sold + ") using ttl 864000 ;");
            }

            return new JsonResult(null);
        }


        [Route("GetRecomendedProducts/{userid}")]
        [HttpGet]
        public JsonResult GetRecomendedProducts(string userid)
        {
            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var productsData = session.Execute("select * from product_recommendations where userid = " + userid + " limit 4;");
             
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                
                products.Add(product);
            }

            return new JsonResult(products);
        }

        
        [Route("GetProductsNewArrivals")]
        [HttpGet]
        
        public JsonResult GetProductsNewArrivals()
        {

            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var productsData = session.Execute("select * from newest");
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                
                products.Add(product);
            }

            return new JsonResult(products);
        }

        [Route("GetProductsTopRanking/{category}")]
        [HttpGet]
        
        public JsonResult GetProductsTopRanking(string category)
        {

            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var productsData = session.Execute("select * from products_by_category_rating where category = '" + category + "' limit 4");
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.added_date = productData["added_date"] != null ? productData["added_date"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                
                products.Add(product);
            }

            return new JsonResult(products);
        }


        [Route("GetProductsBestSellers/{category}")]
        [HttpGet]
        
        public JsonResult GetProductsBestSellers(string category)
        {

            ISession session = SessionManager.GetSession();
            List<Product> products = new List<Product>();

            if (session == null)
                return null;

            var productsData = session.Execute("select * from products_by_category_sold where category = '" + category + "' limit 4");
            
            foreach(var productData in productsData)
            {
                Product product = new Product();
                product.productid = productData["productid"] != null ? productData["productid"].ToString() : string.Empty;
                product.added_date = productData["added_date"] != null ? productData["added_date"].ToString() : string.Empty;
                product.image = productData["image"] != null ? productData["image"].ToString() : string.Empty;
                product.name = productData["name"] != null ? productData["name"].ToString() : string.Empty;
                product.price = productData["price"] != null ? productData["price"].ToString() : string.Empty;
                product.rating = productData["rating"] != null ? productData["rating"].ToString() : string.Empty;
                product.sold = productData["sold"] != null ? productData["sold"].ToString() : string.Empty;
                
                products.Add(product);
            }

            return new JsonResult(products);
        }

        public class Podaci
        {
            public string productid {get;set;}
            public string userid {get;set;}
            public string rating {get;set;}
        }

        [Route("SetRating")]
        [HttpPut]
        public void SetRating([FromBody] Podaci podaci)
        {
            ISession session = SessionManager.GetSession();

            if(session != null)
            {  
                var ratingData = session.Execute("insert into user_rating (userid, productid, rating) values  (" +
                podaci.userid + "," + podaci.productid + "," + podaci.rating +  ") if not exists;").FirstOrDefault();

                var productRating = session.Execute("select * from products where productid = " + podaci.productid + ";").FirstOrDefault();

                


                double rating_count = Convert.ToDouble(productRating["rating_count"]);
                double rating = Convert.ToDouble(productRating["rating"]);
                var sold = productRating["sold"];


                List<string> categoriesList = new List<string>();
                if(productRating["categories"] != null)
                {
                    object categories = productRating["categories"];
                    var categoriesString = JsonConvert.SerializeObject(categories);

                    string[] splitedCategories = categoriesString.Split('[',',','"',']');
                    foreach(string category in splitedCategories)
                    {
                        if(category.Length > 0)
                        {
                            categoriesList.Add("'" + category.ToString() + "'");
                        }
                    }
                }

                string stringCategories = string.Join(",", categoriesList);

                double newRating = 0;

                if(Convert.ToBoolean(ratingData[0]))
                {
                    newRating = (rating_count * rating + Convert.ToDouble(podaci.rating))/(rating_count+1);

                    session.Execute("update products set rating = " + newRating + ", rating_count =" + 
                                (rating_count+1) + " where productid = " + podaci.productid + ";" );
                    
                    
                }
                else
                {
                    newRating = ((rating_count * rating - Convert.ToDouble(ratingData["rating"]) ) + 
                    Convert.ToDouble(podaci.rating)) / (rating_count);

                    var updateData = session.Execute("update user_rating set rating = " + podaci.rating
                                                     + " where userid = " + podaci.userid + " and productid = " + podaci.productid);
                    
                    session.Execute("update products set rating = " + newRating + " where productid = " + podaci.productid + ";" );
                }

                session.Execute("update products_by_category_sold set rating = " + newRating  +
                " where category in ( " +
                stringCategories + " ) and sold = " + sold + " and productid = " + podaci.productid + ";");

                session.Execute("update products_by_category set rating = " + newRating  +
                " where category in ( " + stringCategories + " ) and price = " + productRating["price"] + ";");

                session.Execute("delete from products_by_category_rating where category in ( " +
                stringCategories + " ) and rating = " + rating + " and productid = " + podaci.productid + ";");

                if(productRating["categories"] != null)
                {
                    object categories = productRating["categories"];
                    var categoriesString = JsonConvert.SerializeObject(categories);

                    string[] splitedCategories = categoriesString.Split('[',',','"',']');
                    foreach(string category in splitedCategories)
                    {
                        if(category.Length > 0)
                        {
                             var soldData = session.Execute("insert into products_by_category_rating (productid, added_date, category, image, name, price, rating, sold) values  (" + 
                            podaci.productid +  ", toTimeStamp(now()), '" + 
                            category + "','" + productRating["image"] + "', '" + productRating["name"] + 
                            "', " + productRating["price"] + ", " + newRating + ", " + sold +  ") if not exists;");   
                            

                        }
                    }
                }

            }
        }

        [Route("GetRating/{userid}/{productid}")]
        [HttpGet]
        
        public JsonResult GetRating(string userid,string productid)
        {
            ISession session = SessionManager.GetSession();

            if(session != null)
            {
                var rating = session.Execute("select rating from user_rating where userid = " +
                             userid + " and productid = " + productid + ";").FirstOrDefault();

                return new JsonResult(rating[0]); 
            }

            return null;
        }

        
    }
}
