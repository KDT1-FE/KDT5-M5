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
    speed: 1000,
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
              src="https://github.com/BearHumanS/Frontend_Team-project/assets/115094069/3d66cd2d-4a51-47ee-b50c-274ecb8dd22a"
              alt="클렌징 제품 효과"
            />
          </div>
          <div>
            <img
              src="https://github.com/BearHumanS/Frontend_Team-project/assets/115094069/34e7aaa2-9645-4a25-86f7-6ad15a3e43cd"
              alt="메이크업 제품 효과"
            />
          </div>
          <div>
            <img
              src="https://github.com/BearHumanS/Frontend_Team-project/assets/115094069/65d8c8f1-6859-479c-b248-defc6286662b"
              alt="스킨케어 제품 효과"
            />
          </div>
        </Slider>
      </div>
    </section>
  )
}

export default Banner
