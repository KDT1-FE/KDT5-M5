import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './banner.css'

const Banner = () => {
  const [autoplay, setAutoplay] = useState(true)
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: dots => (
      <div
        style={{
          padding: '10px'
        }}>
        <ul style={{ margin: '20px' }}> {dots} </ul>
      </div>
    )
  }

  return (
    <section className="banner__section">
      <div className="banner__section--container">
        <Slider
          ref={sliderRef}
          {...settings}>
          <div>
            <img
              src="../../public/productEffective/cleansing_effect.jpg"
              alt="클렌징 제품 효과"
            />
          </div>
          <div>
            <img
              src="../../public/productEffective/makeup_effect.jpg"
              alt="메이크업 제품 효과"
            />
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Slider>
      </div>
    </section>
  )
}

export default Banner
