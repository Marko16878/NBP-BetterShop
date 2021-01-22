import React, { useEffect, useState} from "react";
import "./App.css";
import "./Buy.css";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useHistory} from "react-router-dom";

export default function Buy() {

  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  const [products, setProducts] = useState([])
  const [user,setUser]=useState([]);
  const {total}=useParams();
  const history=useHistory();

  useEffect(() =>
    {
      getUser();
        
    }, []);

  const getUser=async()=>{
    const response = await fetch('https://localhost:5001/webshop/User/'+ cookies.id);
    const data = await response.json();
    setUser(data);
    
  }

  const buyProduct = async () =>
  {
    const response = await fetch('https://localhost:5001/webshop/buyProduct/'+ cookies.id);
    const data = await response.json();
    setProducts(data);
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
          
          <button id="buttonConfirm" onClick={buyProduct}>Confirm</button>
        </div>
      );
}
