import React, { useEffect, useState } from "react";
import "./Login.css";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useHistory} from "react-router-dom";

export default function Signup() {

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nesto,setNesto]=useState(0);

  const history=useHistory();


  async function postUser (){
    console.log(JSON.stringify({ "address": address, "email": email, "firstname": name, "lastname": lastname, "password": password }));
    if(name!=""){
    const requestOptions = {
      method: 'POST',
      headers: {  'Accept': 'application/json',
                  'Content-Type': 'application/json', },
      body: JSON.stringify({ "address": address, "email": email, "firstname": name, "lastname": lastname, "password": password })};
    const response = await fetch('https://localhost:5001/webshop/RegisterUser', requestOptions);
    if(response.ok)
    {
      history.push("/login");
    }}
    else{
      setNesto(1);
    }
    //const data = await response.json();
    //console.log(data);

    //setUser(data);
  }

  const updateName = e => {
    setName(e.target.value);
  }

  const updateLastname = e => {
    setLastname(e.target.value);
  }

  const updateAddess = e => {
    setAddress(e.target.value);
  }

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
      <div className="effect4">
      <div className="divLogin">
        Welcome
        
        <p>glad to see you!</p>
        <br/><br/><br/><br/>
        
        <input className="inputLoginn" placeholder="Email" type="text" />
        <br/><br/>
        <input className="inputLoginn" placeholder="Password" type="password" />
        {nesto?
        <p className="error">
        Incorrect username or password!</p>:
        <p className="error"></p>
      
        }
        <p className="error"></p>
        
        
        <button id="buttonLogin" type="submit" >LOGIN</button>
        
    </div>
      </div>
      <div className="effect2">
        <div className="divSignup">
        <br/>
          <input className="inputSignup" placeholder="Name" type="text" value={name} onChange={updateName}/>
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Lastname" type="text" value={lastname} onChange={updateLastname}/>
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Address" type="text" value={address} onChange={updateAddess}/>
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Email" type="text"  value={email} onChange={updateEmail}/>
          <br/><br/><br/> 
          <input className="inputSignup" placeholder="Password" type="text"  value={password} onChange={updatePassword}/>
          {nesto?
              <p className="error">
                All fields are required!</p>:
              <p className="error"></p>
          }
          <button id="buttonSingUp" onClick={postUser}>CREATE ACCOUNT</button>
        </div>
      </div>
      <div className="proba2" >
        Better<br/>Shop<br/><br/>
          <Link to="/login">
            <button id="btnLogin">LOGIN</button>
          </Link>
      </div>
    </div>
    </div>
    
  );
}
