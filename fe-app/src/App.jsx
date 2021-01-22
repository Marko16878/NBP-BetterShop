import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  
  
} from "react-router-dom";
import Login from "./Login";
import Categories from "./Categories";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Signup from "./Signup"
import Home from "./Home";
import Buy from "./Buy";
import Logout from "./Logout";

import MainLayout from "./Layout";


//import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';


export default function App() {
  
  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  

  useEffect(() =>
  {
      
   
      
      
  },[]);

  return(
      <Router>
        <Switch>
          
          
          
        <Route exact path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
            
          
          <MainLayout>
          <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              
              
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/products/:category">
                <Products />
              </Route>
              <Route path="/detail/:productid">
                <Detail />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/buy/:total">
                <Buy />
              </Route>
              
           
            
            
          </MainLayout>
          
          
            
          
            
          
          
          
        </Switch>
      </Router>
  );
/*
  return (
    <>

<div className="content">
        <Router >
          <Switch>
            <Route path="/">
            <Header />
          
          <main>
            
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              
              
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/products/:category">
                <Products />
              </Route>
              <Route path="/detail/:productid">
                <Detail />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/buy">
                <Buy />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              
            </Switch>
          </main>
          </Route>
          
          </Switch>
        </Router>
      </div>
      <Footer />
      
    </>
  );*/
}


