
import "./App.css";
import "./Cart.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import starIcon from "./Images/starIcon.png"
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Product from "./Product";
import Buy from "./Buy";

export default function Cart() {

    //const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [cookies] = useCookies(['User']);
    const [cart,setCart]=useState(0);

    useEffect(() =>
    {
        getProducts();
    }, [products]);

    const getProducts = async () =>
    {
        
        //const response = await fetch('https://localhost:5001/webshop/GetProductsCategory/huawei');
        const response = await fetch('https://localhost:5001/webshop/GetCart/' + cookies.id);
        const data = await response.json();
        if(response.ok){
        setProducts(data);
        
        if(data.length==0)
        {setCart(1);}
        
        }
        
    };

    var total = 0;

    products.forEach(product =>
    {
        total += product.price*product.count;
        //setTotal(total + product.price*product.count);
    })

  return(
    <div className="divCart">
        <div className="productsInCart">



            
        
        
        {cookies.id != null ? <>{cart == 1 ? <p className="message">Your shopping cart is empty.</p>:<p></p>}</>:<p className="message">You must log in to add the product to the cart.</p>}
        {products.map(product => (
            <div className="productInCart">
            <img className="productInCartImage" src={product.image}/>
            <div className="productInCartDetail">
                <p>{product.name}</p>
                <img className="starIcon" src={starIcon}/> {product.rating}
                <p className="productInCartDescription">{product.description}</p>
                <p className="productInCartPrice">No. of products: {product.count} <br/> Price: US ${(product.price*product.count).toFixed(2)}</p>
                <Link to={`/delete/${product.productid}`}><button  className="removeButton" >Remove</button></Link>
            </div>
            </div> 
        ))}

        </div>
        <div className="orderSummary">
            Order Summary<br/><br/>
            <text>Total:</text><br/>  US ${total.toFixed(2)}
            <br/><br/>
            {cookies.id != null && cart==0 ? 
            <Link to={`/buy/${total.toFixed(2)}`}>
            <button className="buyButton">Buy</button>
            </Link>
            :
            <Link to="/">
            <button className="buyButton" disabled>Buy</button>
            </Link>
            }
        </div>
    </div>
  );



  
}