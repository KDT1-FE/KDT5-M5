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
              src="../../public/No_Img.jpg"
              alt=""
            />
          </div>
          <div>
            <h3>2</h3>
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
