import React, { useState } from 'react'
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import './ComponentCss/ProductSlider.css'
const ProductSlider = ({images = []}) => {
    
     const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
        <div className="product-slider">
            <div className="thumb-slider">
                <Swiper
                onSwiper={setThumbsSwiper}
                direction="vertical"
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="myThumbSwiper"
                >
                {
                    images.map((item, index) =>
                        <SwiperSlide key={index} className='item'><div className="productImg"><img  src={item} alt='thumb' /></div></SwiperSlide>
                )}
                </Swiper>
            </div>

            {/* Main Slider */}
            <div className="main-slider">
                <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="myMainSwiper"
                >
                {
                    images.map((item, index) =>
                        <SwiperSlide key={index} className='item'><div className="productImg"><img  src={item} alt='main' /></div></SwiperSlide>
                )}
                </Swiper>
            </div>
            </div>
    </>
  )
}

export default ProductSlider