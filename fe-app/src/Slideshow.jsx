import React from 'react';
import { Slide } from 'react-slideshow-image';
import "./Home.css";
import 'react-slideshow-image/dist/styles.css'


const slideImages = [
    'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/g-series-category-page-image-800x620.png',
    'https://placeit-assets1.s3-accelerate.amazonaws.com/custom-pages/android-mockups/Android-Phone-Mockups.png',
    'https://shop.mbwaverley.com.au/wp-content/uploads/sites/16/B66959120_3-1.png'
  ];
  const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide showNavs="false">
          <div className="each-slide">
            
              <div className="slideText">Shop Computers &#38; Accessories</div>
              <img className="slideImage" src={`${slideImages[0]}`}/>
            
          </div>
          <div className="each-slide">
                <img className="slideImage" src={`${slideImages[1]}`}/>
              <div className="slideText">Shop Cellphones &#38; Telecommunications</div>
              
            
          </div>
          <div className="each-slide">
            
              <div className="slideText">Shop Smart Watches &#38; Other Smart Electronics</div>
              <img className="slideImage" src={`${slideImages[2]}`}/>
            
          </div>
        </Slide>
      </div>
    )
}
export default Slideshow;