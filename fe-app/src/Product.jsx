import React, { useEffect, useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Products.css";
import starIcon from "./Images/starIcon.png";

export default function Product ({productid,image,price,name,rating,sold}) {
    return(
        <div className="productCard">
            <Link to={`/detail/${productid}`}>
            <img className="productImage" src={image}/>
            </Link>
            <p className="name">{name}</p>
            <p className="price">US ${price}</p>
            <img className="starIcon" src={starIcon}/> {rating}
            
            <p id="sold">Sold:{sold}</p>
            
        </div>
    )
   
  };