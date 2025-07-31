import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './HeroSlider.css';

export default function HeroSlider({ images }) {
  return (
    <div className="sliderContainer">
      <Swiper slidesPerView={1} loop>
        {images.map((src,i) => (
          <SwiperSlide key={i}>
            <img src={src} alt={`slide-${i}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}