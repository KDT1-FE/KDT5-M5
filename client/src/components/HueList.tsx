import GlobalStyle from '../styles/GlobalStyles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'
import SlideNextButton from './SlideNextButton'
import SlidePrevButton from './SlidePrevButton'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/effect-fade'

const Hue = styled.div`
  margin-top: 180px;
  > div.inner {
    position: relative;
    width: calc(100% - 500px);
    margin: 0 auto;
    > h1 {
      font-family: 'Noto Sans KR';
      font-size: 32px;
      letter-spacing: 0.05em;
      font-weight: 500;
      margin-bottom: 40px;
    }
    > div.tabmenu {
      margin-bottom: 60px;
      > ul {
        display: flex;
        gap: 20px;
      }
      > ul.tone {
        margin-bottom: 26px;
        > li {
          padding: 10px 50px;
          border-radius: 30px;
          &:first-child {
            font-family: 'Noto Sans KR';
            font-size: 24px;
            letter-spacing: -0.05em;
            background-color: #ffa9be;
            > a {
              color: #fff;
            }
          }
          &:last-child {
            font-family: 'Noto Sans KR';
            font-size: 24px;
            background-color: #f3f3f3;
            > a {
              color: #8e8e8e;
            }
          }
        }
      }
      > ul.cool {
        > li {
          padding: 10px 40px;
          border-radius: 30px;
          font-family: 'Noto Sans KR';
          font-size: 18px;
          &:first-child {
            letter-spacing: 0.05em;
            background-color: #191919;
            > a {
              color: #fff;
            }
          }
          &:last-child {
            background-color: #f3f3f3;
            > a {
              color: #8e8e8e;
            }
          }
        }
      }
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

const HueList = () => {
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
      id: 'xRm7wLsZhDcgVz5KQFq0',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwa1030bd6/hi-res/0607845053422.jpg?sw=856&sh=750&sm=fit',
      category: '하드와이어드 아이섀도우',
      name: '얼쓰샤인',
      price: '32,000',
    },

    {
      id: 'kr4KyIJtbXLg1RUoADAH',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwbac184f2/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Catfight_Matte_GLBL_B_square_0607845029717.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '캣파이트',
      price: '40,000',
    },

    {
      id: 'L8JdI5hyPUb9g1KU4UXs',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f736413/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Instant_Crush_Sheer_GLBL_B_square_0607845029557.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '인스턴트 크러쉬',
      price: '40,000',
    },

    {
      id: 'nbAcxTzKgFQsKhCl83IQ',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw12b9b591/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Hot_Kiss_Matte_GLBL_B_square_0607845029854.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '핫 키스',
      price: '40,000',
    },
  ]

  const handleClickItem = (id) => {
    navigate('/ProductDetail', {
      state: {
        id,
      },
    })
  }

  return (
    <div>
      <GlobalStyle />
      <Hue>
        <div className="inner">
          <h1>색조</h1>
          <div className="tabmenu">
            <ul className="tone">
              <li>
                <a href="#">쿨톤</a>
              </li>
              <li>
                <a href="#">웜톤</a>
              </li>
            </ul>
            <ul className="cool">
              <li>
                <a href="#">여름</a>
              </li>
              <li>
                <a href="#">겨울</a>
              </li>
            </ul>
          </div>
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
      </Hue>
    </div>
  )
}

export default HueList
