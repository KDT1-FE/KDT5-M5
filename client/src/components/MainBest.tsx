import GlobalStyle from '../styles/GlobalStyles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'
import SlideNextButton from './SlideNextButton'
import SlidePrevButton from './SlidePrevButton'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/effect-fade'

const Mainbest = styled.div`
  margin-top: 180px;
  > div.inner {
    position: relative;
    width: calc(100% - 500px);
    margin: 0 auto;
    > h1 {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 32px;
      font-weight: 500;
    }
  }
`

const Listitem = styled.div`
  margin-top: 40px;
  margin-right: 16px;
  > div.thumbnail {
    cursor: pointer;
    > img {
      width: 100%;
      display: block;
    }
  }
  > div.contents {
    margin-top: 10px;
    margin-bottom: 26px;
    > h3 {
      font-family: 'Noto Sans KR';
      font-size: 16px;
      font-weight: 500;
      letter-spacing: -0.05em;
      margin-bottom: 4px;
    }
    > span {
      display: block;
      font-family: 'Noto Sans KR';
      font-size: 12px;
      letter-spacing: -0.05em;
      color: #8e8e8e;
    }
  }
  > p {
    font-family: 'Noto Sans KR';
    letter-spacing: -0.05em;
    text-align: right;
    font-size: 14px;
    > span {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 18px;
      font-weight: 700;
    }
  }
`

const Prevbtn = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 9;
`

const Nextbtn = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 9;
`

const MainBest = () => {
  const navigate = useNavigate()

  const Product = [
    {
      id: '6O8YPJIMZbOcyNDMn8YU',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw73a7bdcc/hi-res/NARS_SP22_SpringEdit_Afterglow_PDPCrop_Soldier_Afterglow_Lipshine_LoverToLover_GLBL_2000x2000.jpg?sw=856&sh=750&sm=fit',
      category: '에프터글로우 립 샤인',
      name: '러버 투 러버',
      price: '37,000',
    },

    {
      id: 'i3yOg0gUQXpVb6n5Yah6',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw594c7940/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Heat_Wave_Matte_GLBL_B_square_0607845029618.jpg?sw=856&sh=750&sm=fit',
      category: '오리지널 립스틱',
      name: '히트 웨이브',
      price: '40,000',
    },

    {
      id: 'KuVFr4I445aq3zjQoE4M',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f48591b/hi-res/0607845053347.jpg?sw=856&sh=750&sm=fit',
      category: '하드와이어 아이섀도우',
      name: '멜로즈',
      price: '32,000',
    },

    {
      id: 'wbzDFBshCidi0naEotyK',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwab29559f/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Chelsea_Girls_Sheer_GLBL_B_square_0607845029595.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '첼시 걸스',
      price: '40,000',
    },

    {
      id: 'mdUg1DmAkefBYlftcUnq',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw856e9a59/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Casablanca_Satin_GLBL_B_square_0607845029205.jpg?sw=856&sh=750&sm=fit',
      category: '오리지널 립스틱',
      name: '카사블랑카',
      price: '40,000',
    },

    {
      id: 'v51IqksbGctAov6qMuDn',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw5471c7eb/hi-res/0607845053095.jpg?sw=856&sh=750&sm=fit',
      category: '싱글 아이섀도우',
      name: '네팔',
      price: '30,000',
    },

    {
      id: 'L8JdI5hyPUb9g1KU4UXs',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f736413/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Instant_Crush_Sheer_GLBL_B_square_0607845029557.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '인스턴트 크러쉬',
      price: '40,000',
    },

    {
      id: 'ASGoSP7sbNvePBLvIn0D',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw53a64a5e/hi-res/0607845039273.jpg?sw=856&sh=750&sm=fit',
      category: '듀오 아이섀도우',
      name: '샤레이드',
      price: '49,000',
    },
  ]

  const handleClickItem = (id: string) => {
    navigate('/ProductDetail', {
      state: {
        id,
      },
    })
  }

  return (
    <div>
      <GlobalStyle />
      <Mainbest>
        <div className="inner">
          <h1>BEST</h1>
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
          >
            {Product.map((product) => (
              <SwiperSlide key={product.id}>
                <Listitem>
                  <div className="thumbnail">
                    <img
                      src={product.src}
                      alt="Loading image"
                      onClick={() => handleClickItem(product.id)}
                    />
                  </div>
                  <div className="contents">
                    <h3>{product.category}</h3>
                    <span>{product.name}</span>
                  </div>
                  <p>
                    <span>{product.price}</span>원
                  </p>
                </Listitem>
              </SwiperSlide>
            ))}
            <Prevbtn>
              <SlidePrevButton />
            </Prevbtn>
            <Nextbtn>
              <SlideNextButton />
            </Nextbtn>
          </Swiper>
        </div>
      </Mainbest>
    </div>
  )
}

export default MainBest
