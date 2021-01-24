import React, { useEffect, useState } from "react";

import "./Products.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Product from "./Product";


export default function Products() {

  const [products, setProducts] = useState([]);
  const {category} = useParams();


  
    


  useEffect(() =>
  {
    
    getProducts();
  }, [products]);



  const getProducts = async () =>
  {
    const response = await fetch('https://localhost:5001/webshop/GetProductsCategory/'+category);
    const data = await response.json();
    
    setProducts(data);
    
  };


  return(
    <div className="categoriesAndProduct">
    <div className="categoriesInProduct">
    
      <p className="all">All categories</p>
      <Link to="/products/cellphonesAndTelecommunications">
        <p className="mainCategory">Cellphones and
        Telecommunications</p>
      </Link>
      <ul>
        <Link to="/products/android">
          <li>Android</li>
        </Link>
        <Link to="/products/mobilePhoneAccessories">
          <li>Mobile Phone Accessories</li>
        </Link>
        <Link to="/products/iPhones">
          <li>iPhones</li>
        </Link>
      </ul>
      <Link to="/products/computerAndOffice">
      <p className="mainCategory">
        Computer and Office
        </p>
    </Link>
    <ul>
        <Link to="/products/officeElectronics">
          <li>Office Electronics</li>
        </Link>
        <Link to="/products/computerComponents">
          <li>Computer Components</li>
        </Link>
        <Link to="/products/laptops">
          <li>Laptops</li>
        </Link>
        
        <Link to="/products/desktops">
          <li>Desktops</li>
        </Link>
        
      </ul>
    <Link to="/products/customerElectronics">
      <p className="mainCategory">
        Consumer Electronics
        </p>
    </Link>
    <ul>
        <Link to="/products/smartElectronics">
        <li>Smart Electronics</li>
        </Link>
        <Link to="/products/powerSource">
        <li>Power Source</li>
        </Link>
      </ul>
    <Link to="/products/luggageAndBags">
      
        <p className="mainCategory">
        Lagguage and Bags
        </p>
    </Link>
    <ul>
        <Link to="/products/womenBags">
        <li>Women's Bags</li>
        </Link>
        <Link to="/products/menBags">
        <li>Men's Bags</li>
        </Link>
        <Link to="/products/luggageAndTravelBugs">
        <li>Luggage And Travel Bugs</li>
        </Link>
      </ul>
    <Link to="/products/sportsAndEntertainment">
      <p className="mainCategory">
        Sports and Emtertainment
        </p>
    </Link>
    <ul>
        <Link to="/products/sportsClothing">
        <li>Sports Clothing</li>
        </Link>
        <Link to="/products/sportsAccessories">
        <li>Sport Accessories</li>
        </Link>
        <Link to="/products/entertainment">
        <li>Entertainment</li>
        </Link>
      </ul>
    </div>
    
   <div className="divProducts">
   <p className="namecatogory">{category.split(/(?=[A-Z])/).join(" ") }</p>
      <div className="products">
      {products.map(product => (
        <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
        ))}
      </div>
    </div>
    </div>
  );

  
}