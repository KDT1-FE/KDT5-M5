import GlobalStyle from '../styles/GlobalStyles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import SlideNextButton from './SlideNextButton'
import SlidePrevButton from './SlidePrevButton'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/effect-fade'
SwiperCore.use([Autoplay, Navigation])

const CoolList = styled.div`
  margin-top: 180px;
  > div.inner {
    position: relative;
    width: calc(100% - 500px);
    margin: 0 auto;
    > h1 {
      font-family: 'Noto Sans KR';
      font-size: 32px;
      letter-spacing: -0.05em;
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

const CoolProduct = () => {
  const navigate = useNavigate()

  const Product = [
    {
      id: 'KuVFr4I445aq3zjQoE4M',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f48591b/hi-res/0607845053347.jpg?sw=856&sh=750&sm=fit',
      category: '하드와이어드 아이섀도우',
      name: '멜로즈',
      price: '32,000',
    },

    {
      id: '4XrXRmzHQpuk0hWRspZO',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw638bf00a/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Roman_Holliday_Sheer_GLBL_B_square_0607845029489.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '로만 홀리데이',
      price: '40,000',
    },

    {
      id: 'VNcxrsNJGhNPiRTmqYfu',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwe698e13a/hi-res/0607845053101.jpg?sw=856&sh=750&sm=fit',
      category: '싱글 아이섀도우',
      name: '카보 산 루카스',
      price: '30,000',
    },

    {
      id: 'HVUfcgBBKR2iVPEjci79',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwf16c17e3/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Tolede_Satin_GLBL_B_square_0607845029137.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '톨레도',
      price: '40,000',
    },

    {
      id: 'lMwtCFaYYlscqrXxSPZh',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw2a7d68cf/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Red_Lizard_Matte_GLBL_B_square_0607845029632.jpg?sw=856&sh=750&sm=fit',
      category: '오리지널 립스틱',
      name: '레드 리자드',
      price: '40,000',
    },

    {
      id: 'HSyGIMka7PkaKdsFVxM2',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw34453553/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Impulse_Satin_GLBL_B_square_0607845029298.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '임펄스',
      price: '40,000',
    },

    {
      id: 'WTJ1zwIKx68j3W8oLtXP',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwf0f20c62/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Trans_Siberian_Matte_GLBL_B_square_0607845029656.jpg?sw=856&sh=750&sm=fit',
      category: '오리지널 립스틱',
      name: '트랜스 시베리안',
      price: '40,000',
    },

    {
      id: 'CvHwdrBls4NpkxmD93Px',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwa5506e71/hi-res/0607845053446.jpg?sw=856&sh=750&sm=fit',
      category: '하드와이어드 아이섀도우',
      name: '피렌체',
      price: '32,000',
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
      <CoolList>
        <div className="inner">
          <h1>추천 제품</h1>
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
          >
            {Product.map((product) => (
              <SwiperSlide>
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
      </CoolList>
    </div>
  )
}

export default CoolProduct
