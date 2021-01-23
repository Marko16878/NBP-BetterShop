import React, { useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
import App from "./App";
import "./Login.css";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Buy from "./Buy";
import { useParams } from "react-router-dom";

import {useHistory} from "react-router-dom";


export default function DeleteFromCart() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  const [nesto,setNesto]=useState(0);
  const {dproduct}=useParams();

  const history=useHistory();
  
  
  
 const yes = ()=>{
    deleteProducts();

    
    history.push("/cart");
 }
 const no = ()=>{
    history.push("/cart");
 }
    

//ref();
    
    //setUser(data);
    
  
  useEffect(() =>
    {
      
      
    });

    const deleteProducts = async () =>
    {
        
        //const response = await fetch('https://localhost:5001/webshop/GetProductsCategory/huawei');
        const response = await fetch('https://localhost:5001/webshop/DeleteFromCart/' + dproduct + '/'+ cookies.id , {
          method: 'DELETE',
        });
        
        
        
    };

  

  
    return (
      <div className="">
        <div className="divDelete">
          
        Are you sure you want to move this product from the cart?
            <br/>
            <button className="buttonInDelete" onClick={yes}>Yes</button>
            <button className="buttonInDelete" onClick={no}>No</button>
        </div>
        </div>
      );

}
