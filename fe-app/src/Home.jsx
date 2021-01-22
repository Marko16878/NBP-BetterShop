import React, { useEffect, useState } from "react";
import "./App.css";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Product from "./Product";
import { useCookies } from 'react-cookie';
import newArrivalsIcon from "./Images/newArrivalsIcon.png"
import topRankingIcon from "./Images/topRankingIcon.png"
import bestSellersIcon from "./Images/bestSellersIcon.png"
import recommendedToYouIcon from "./Images/recommendedToYouIcon.png"
import Slideshow from "./Slideshow"
import SlideProducts from"./SlideProducts";
import SlideProductsSold from "./SliderProductsSold";

export default function Home() {

     

     const [logIn,setLoginn] = useState(0);
     const [cookies, setCookie, removeCookie] = useCookies(['User']);
     const [products, setProducts] = useState([]);
     const [productsNewArrivals, setProductsNewArrivals] = useState([]);
     const [productsTopRankingCAT, setProductsTopRankingCAT] = useState([]);
     const [productsTopRankingOAC, setProductsTopRankingOAC] = useState([]);
     const [productsBestSellersCAT, setProductsBestSellrsCAT] = useState([]);
     const [productsBestSellersOAC, setProductsBestSellrsCAO] = useState([]);
     

       
          
          

          


     useEffect(() =>
      {
          
          
          
          setLoginn(cookies.id != null ? 1:0);
          getProductsTopRankingCAT();
          getProductsTopRankingOAC();
          getProductsBestSellrsCAT();
          getProductsBestSellrsCAO();
      }, []);

      

  const getProducts = async () =>
  {
     
    const response = await fetch('https://localhost:5001/webshop/GetRecomendedProducts/'+ cookies.id);
    const data = await response.json();
    setProducts(data);
    
  };

  

  const getProductsTopRankingCAT = async () =>
  {
     
    const response = await fetch('https://localhost:5001/webshop/GetProductsTopRanking/cellphonesAndTelecommunications');
    const dataTopRankingCAT = await response.json();
    setProductsTopRankingCAT(dataTopRankingCAT);
    
    
  };
  const getProductsTopRankingOAC = async () =>
  {
     
    const response = await fetch('https://localhost:5001/webshop/GetProductsTopRanking/computerAndOffice');
    const dataTopRankingOAC = await response.json();
    setProductsTopRankingOAC(dataTopRankingOAC);
    
    
  };
  const getProductsBestSellrsCAT = async () =>
  {
     
    const response = await fetch('https://localhost:5001/webshop/GetProductsBestSellers/cellphonesAndTelecommunications');
    const dataBestSellrsCAT = await response.json();
    setProductsBestSellrsCAT(dataBestSellrsCAT);
    
    
  };
  const getProductsBestSellrsCAO = async () =>
  {
     
    const response = await fetch('https://localhost:5001/webshop/GetProductsBestSellers/computerAndOffice');
    const dataBestSellrsCAO = await response.json();
    setProductsBestSellrsCAO(dataBestSellrsCAO);
    
    
  };
  


  return(
   <div className="divHome">
        <Slideshow/>
        
       {logIn?
        <div className="divRecommendedToYou" onLoad={getProducts}>
          <img className="" src={recommendedToYouIcon}/> Recommended To You

          <div className="recommendedToYou">
                  
          {products.map(product => (
               <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
          ))}


          </div>
       </div>:<p></p>}
       <SlideProducts data1={productsTopRankingCAT} data2={productsTopRankingOAC}/>
       <SlideProductsSold data1={productsBestSellersCAT} data2={productsBestSellersOAC}/>

       

       
       

      
    </div>
  );

  
}
