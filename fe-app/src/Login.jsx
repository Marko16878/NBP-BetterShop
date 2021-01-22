import React, { useEffect, useState} from "react";
import { Redirect } from "react-router-dom";


import "./Login.css";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Buy from "./Buy";

import {useHistory} from "react-router-dom";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['User']);
  const [nesto,setNesto]=useState(0);

  const history=useHistory();
  const refreshPage = ()=>{
    window.location.reload();
    //history.push("/home");
 }
  const getUser = async () =>{
    const response = await fetch('https://localhost:5001/webshop/Login/'+email+'/'+password);
    if(response.ok){
    const data = await response.json();
    
    if(data!=null)
    {
      setCookie("id",data.userid);
      
      
      //refreshPage();
      history.push("/home");
      
      
    }}
    else{setNesto(1);}
    
    
    function reloadPage() {
      // The last "domLoading" Time //
      var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
      // Current Time //
      var now = Date.now();
      // Ten Seconds //
      var tenSec = 5000;
      // Plus Ten Seconds //
      var plusTenSec = currentDocumentTimestamp + tenSec;
      if (now > plusTenSec) {
      window.location.reload();
      } else {}
      }
     reloadPage();

    
    //setUser(data);
    
  };
  useEffect(() =>
    {
      
        
    }, []);


  const updateEmail = e => {
    setEmail(e.target.value);
  }

  const updatePassword = e => {
    setPassword(e.target.value);
  }

  

  return (
    
    <div className="backgroung">
      <Link to="/home">
            <div id="iks"></div>
    </Link>
    <div className="effect">
      <div className="effect1">
      <div className="divLogin">
        Welcome
        
        <p>glad to see you!</p>
        <br/><br/><br/><br/>
        
        <input className="inputLoginn" placeholder="Email" type="text" value={email} onChange={updateEmail}/>
        <br/><br/>
        <input className="inputLoginn" placeholder="Password" type="password" value={password} onChange={updatePassword}/>
        {nesto?
        <p className="error">
        Incorrect username or password!</p>:
        <p className="error"></p>
      
        }
        <p className="error"></p>
        
        
        <button id="buttonLogin" type="submit" onClick={getUser}>LOGIN</button>
        
    </div>

      </div>
      <div className="effect3">
      <div className="divSignup">
        <br/>
          <input className="inputSignup" placeholder="Name" type="text" />
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Lastname" type="text" />
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Address" type="text" />
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Email" type="text"  />
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Password" type="text" />
          {nesto?
              <p className="error">
                All fields are required!</p>:
              <p className="error"></p>
          }
          <button id="buttonSingUp" >CREATE ACCOUNT</button>
        </div>
      </div>
      <div className="proba" >
        Better<br/>Shop<br/><br/>
          <Link to="/signup">
            <button id="bthSignUp">CREATE ACCOUNT</button>
          </Link>
        
      </div>

    </div>
    
    </div>
    
  );
}
