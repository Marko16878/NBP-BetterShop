import React from "react";
import "./App.css";
import "./Categories.css";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import icon1 from "./Images/icon1.png";
import icon2 from "./Images/icon2.png";
import icon3 from "./Images/icon3.png";
import icon4 from "./Images/icon4.png";
import icon5 from "./Images/icon5.png";

import { useCookies } from 'react-cookie';

export default function Categories() {
  
  const [cookies, setCookie, removeCookie] = useCookies(['User']);

  return (
    <div className="backclr">
      
    <div className="divCategories">
    <Link to="/products/cellphonesAndTelecommunications">
      <div className="categoryCard">
        <img src={icon1}/><br/>
        Cellphones and
        Telecommunications
      </div>
    </Link>
    <Link to="/products/computerAndOffice">
      <div className="categoryCard">
        <img src={icon2}/><br/>
        Computer and Office
      </div>
    </Link>
    <Link to="/">
      <div className="categoryCard">
        <img src={icon3}/><br/>
        Consumer Electronics
      </div>
    </Link>
    <Link to="/">
      <div className="categoryCard">
        <img src={icon4}/><br/>
        Lagguage and Bags
      </div>
    </Link>
    <Link to="/">
      <div className="categoryCard">
        <img src={icon5}/><br/>
        Sports and Emtertainment
      </div>
    </Link>
    </div>

    <div className="divSubcategories">
      Cellphones and Telecommunications
      
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
    </div>

    <div className="divSubcategories">
      Computer and Office
      
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
    </div>

    <div className="divSubcategories">
    Consumer Electronics
      
      <ul>
        <li>Smart Electronics</li>
        <li>Power Source</li>
      </ul>
    </div>

    <div className="divSubcategories">
    Lagguage and Bags
      
      <ul>
        <li>Women's Bags</li>
        <li>Men's Bags</li>
        <li>Backpaks</li>
      </ul>
    </div>

    <div className="divSubcategories">
    Sports and Emtertainment
      
      <ul>
        <li>Sports Clothing</li>
        <li>Sport Accessories</li>
        <li>Entertainment</li>
      </ul>
    </div>

    </div>
  );
}