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
    draggable: false,
    autoplay: autoplay,
    autoplaySpeed: 1000
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPause() // Pause autoplay

      if (autoplay) {
        sliderRef.current.slickPlay() // Start autoplay
      }
    }
  }, [autoplay])

  const toggleAutoplay = () => {
    setAutoplay(!autoplay)
  }

  return (
    <div className="banner">
      <Slider
        ref={sliderRef}
        {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
      <button onClick={toggleAutoplay}>
        {autoplay ? 'Stop Autoplay' : 'Start Autoplay'}
      </button>
    </div>
  )
}

export default Banner
