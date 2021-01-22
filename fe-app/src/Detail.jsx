import React, { useEffect, useState } from "react";
import "./App.css";
import "./Login.css";
import "./Detail.css";
import "./Products.css";
import Product from "./Product";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import starIcon from "./Images/starIcon.png";

import { useCookies } from 'react-cookie';

export default function Detail() {
  const [login] = useState(1);
  const [asessment, setAssessment] = useState(0);

const [count, setCount] = useState(1);
const [stock, setStock] = useState(15);
const {productid} = useParams();
const [product, setProduct] = useState([]);
const [products, setProducts] = useState([]);
const [category,setCategory]=useState([]);

const [cookies, setCookie, removeCookie] = useCookies(['User']);

useEffect(() =>
  {
    getProduct();
    getProducts();
  }, [product]);
  

async function getProduct (){

  const response = await fetch('https://localhost:5001/webshop/GetProduct/' + productid);
  const data = await response.json();
  setProduct(data);
  setCategory(data.categories);
  
  
  
}

async function addToCart(){
  const requestOptions = {
    method: 'POST',
    headers: {  'Accept': 'application/json',
                'Content-Type': 'application/json', },
    body: JSON.stringify({"description": product.description, "image": product.image, "name": product.name, "price": product.price,
     "productid": product.productid, "rating": product.rating})};
  const response = await fetch('https://localhost:5001/webshop/AddToCart/' + cookies.id + "/" + count, requestOptions);
}

async function setRating(assessment){
  const requestOptions = {
    method: 'PUT',
    headers: {  'Accept': 'application/json',
                'Content-Type': 'application/json', },
    body: JSON.stringify({"productid": product.productid,"userid": cookies.id, "rating": assessment})};
  const response = await fetch('https://localhost:5001/webshop/SetRating', requestOptions);
}
const getProducts = async () =>
  {
    const response = await fetch('https://localhost:5001/webshop/GetProductsCategory/'+category[0]);
    const data = await response.json();
    
    setProducts(data);
    
  };

  return(
    <div>
    <div className="divDetail">
        
        <div>
        <img className="productDetailImage" src={product.image}/>
        
        {cookies.id != null? <div className="divRating">
            Rate this product: {asessment}
            <div className="rating">
            <span onClick={() => setRating("5")}>☆</span>
            <span onClick={() => setRating("4")}>☆</span>
            <span onClick={() => setRating("3")}>☆</span>
            <span onClick={() => setRating("2")}>☆</span>
            <span onClick={() => setRating("1")}>☆</span>
            
            </div></div>:<p></p>
            }
        </div>
        <div className="details">
            <p className="productName">{product.name}</p>
            <img className="starIcon" src={starIcon}/> {product.rating} <span id="soldInDetail">Sold: {product.sold}</span>

            <p className="productDescription">Description: {product.description}</p>

            <p className="produstPrice">US ${product.price}</p>
            {product.stock >0 ? <p id="inStock">In stock</p>:<p id="outOfStock">Out of stock!</p>}
            
            <p className="quantity">Quantity:</p>
            <p className="numberProducts">
            
                <button onClick={() => setCount(count - 1)} className="minus">-</button><label id="number">{count}</label><button onClick={() => setCount(count + 1)} className="plus">+</button>
            </p>
            {cookies.id != null?
            <p><button className="buttonBuyNow">Buy Now</button>
            <button className="buttonAddToCart" onClick={addToCart}>Add To Cart</button></p>
            :
            <p>
            <p id="outOfStock">You must log in to buy the product or to add the product to the cart.</p>
            <button className="buttonBuyNow" disabled>Buy Now</button>
            <button className="buttonAddToCart" onClick={addToCart} disabled>Add To Cart</button></p>
            }

        </div>
    </div>
    <div className="divSimilarProducts">
      Similar products
      <div className="similarProducts">
      {products.map(product => (
        <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
        ))}
      </div>
    </div>
    </div>
  );
  
}