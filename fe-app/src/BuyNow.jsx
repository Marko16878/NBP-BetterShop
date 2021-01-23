import React, { useEffect, useState} from "react";
import "./App.css";
import "./Buy.css";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useHistory} from "react-router-dom";

export default function BuyNow() {

  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  const [products, setProducts] = useState([])
  const [buyProduct, setBuyproduct] = useState([])
  const [user,setUser]=useState([]);
  const {count}=useParams();
  const {product}=useParams();
  const history=useHistory();
  

  useEffect(() =>
    {
      getUser();
      getProduct();
     
        
    }, []);

  const getUser=async()=>{
    const response = await fetch('https://localhost:5001/webshop/User/'+ cookies.id);
    const data = await response.json();
    setUser(data);
    
  }

  async function getProduct (){

    const response = await fetch('https://localhost:5001/webshop/GetProduct/' + product);
    const data = await response.json();
    setBuyproduct(data);
    
    
    
    
  }

  var total = buyProduct.price*count;
  const buyNow = async () =>
  {
    const response = await fetch('https://localhost:5001/webshop/BuyNow/'+ cookies.id +"/"+product+"/"+count );
    const data = await response.json();
    alert(data);
    
    history.push("/home");
  };

    return (
        <div className="divBuy">
            
          The product (s) will be sent to your address. Confirm the correctness of the data!
          <br/><br/>
          Name: {user.firstname}
          <br/><br/>
          Lastname: {user.lastname}
          <br/><br/>
          Address: {user.address}
          <br/><br/>
          Price: {total}
          <br/><br/>
          
          <button id="buttonConfirm" onClick={buyNow}>Confirm</button>
        </div>
      );
}
