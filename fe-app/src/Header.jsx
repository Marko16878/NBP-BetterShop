import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./Images/BetterShopLogo.png";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import Home from "./Home";

const activeStyle = {
  color: "purple",
};


export default function Header() {

  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  const [logInOut,setLoginout] = useState(1);
  const [loglog,setLoglog] = useState("sadasdasdas");
  const history=useHistory();
 
  
  useEffect(() =>
  {
      
      setLoglog(cookies.id == null ? 1:0);
      
      
  },[]);

  const routeChange = () =>{ 
     
    history.push("../login");
  }

  
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <img id="logo" src={logo}/>
            </Link>
          </li>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          
          <li>
            <Link activeStyle={activeStyle} to="/cart">
              CART
            </Link>
          </li>
          <li>
            <Link activeStyle={activeStyle} to="/categories">
              CATEGORIES
            </Link>
          </li>
          
          <li>
          {loglog == 1 ? 
            <Link to="/login">LOGIN</Link>:
            <Link to="/logout">LOGOUT</Link>
            
            }

          </li>
          
          
        </ul>
      </nav>
    </header>
  );
  
 
}
