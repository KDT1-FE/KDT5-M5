import GlobalStyle from '../styles/GlobalStyles'
import banner01 from '../../public/assets/main/banner/banner01.jpg'
import banner02 from '../../public/assets/main/banner/banner02.jpg'
import banner03 from '../../public/assets/main/banner/banner03.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Navigation } from 'swiper'
import SlideNextButton from './SlideNextButton'
import SlidePrevButton from './SlidePrevButton'
import styled from 'styled-components'

import 'swiper/css'
import 'swiper/css/effect-fade'

const BannerList = styled.div`
  position: relative;
`

const ProductLink = styled.a`
  > img {
    width: 100%;
    display: block;
  }
`

const Prevbtn = styled.div`
  position: absolute;
  top: 50%;
  left: 162px;
  transform: translateY(-50%);
  z-index: 9;
`

const Nextbtn = styled.div`
  position: absolute;
  top: 50%;
  right: 162px;
  transform: translateY(-50%);
  z-index: 9;
`

const Banner = () => {
  return (
    <div>
      <GlobalStyle />
      <BannerList>
        <div className="inner">
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay, Navigation]}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
          >
            <SwiperSlide>
              <ProductLink href="#">
                <img src={banner01} />
              </ProductLink>
            </SwiperSlide>
            <SwiperSlide>
              <ProductLink href="#">
                <img src={banner02} />
              </ProductLink>
            </SwiperSlide>
            <SwiperSlide>
              <ProductLink href="#">
                <img src={banner03} />
              </ProductLink>
            </SwiperSlide>
            <Prevbtn>
              <SlidePrevButton />
            </Prevbtn>
            <Nextbtn>
              <SlideNextButton />
            </Nextbtn>
          </Swiper>
        </div>
      </BannerList>
    </div>
  )
}

export default Banner
