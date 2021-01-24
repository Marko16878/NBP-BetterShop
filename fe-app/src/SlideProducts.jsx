import React from 'react';
import { useEffect, useState } from "react";
import { Slide } from 'react-slideshow-image';
import "./Home.css";
import 'react-slideshow-image/dist/styles.css'
import Product from './Product';
import newArrivalsIcon from "./Images/newArrivalsIcon.png"
import topRankingIcon from "./Images/topRankingIcon.png"
import bestSellersIcon from "./Images/bestSellersIcon.png"
import recommendedToYouIcon from "./Images/recommendedToYouIcon.png"





  const Slideshow = ({data1,data2,data3,data4,data5}) => {
    return (
      <div className="slide-container-products">
        <Slide showNavs="false">
          <div className="each-slide-products">
           <p><img className="" src={topRankingIcon}/> Top Ranking from Cellphones And Telecommunications</p>
          <div className="topRanking">
                
                {data1.map(product => (
                   <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
              ))}
    
    
                </div>
              
            
          </div>
          <div className="each-slide-products">
           <p><img className="" src={topRankingIcon}/> Top Ranking from Office And Computers</p>
          <div className="topRanking">
                
                {data2.map(product => (
                   <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
              ))}
    
    
                </div>
              
            
          </div>
          <div className="each-slide-products">
           <p><img className="" src={topRankingIcon}/> Top Ranking from Castomer Electronics</p>
          <div className="topRanking">
                
                {data3.map(product => (
                   <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
              ))}
    
    
                </div>
              
            
          </div>
          <div className="each-slide-products">
           <p><img className="" src={topRankingIcon}/> Top Ranking from Luggage and Bags</p>
          <div className="topRanking">
                
                {data4.map(product => (
                   <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
              ))}
    
    
                </div>
              
            
          </div>
          <div className="each-slide-products">
           <p><img className="" src={topRankingIcon}/> Top Ranking from Sports And Emtertainment</p>
          <div className="topRanking">
                
                {data5.map(product => (
                   <Product productid={product.productid} image={product.image} price={product.price} name={product.name} rating={product.rating} sold={product.sold}/> 
              ))}
    
    
                </div>
              
            
          </div>
        </Slide>
      </div>
    )
}
export default Slideshow;