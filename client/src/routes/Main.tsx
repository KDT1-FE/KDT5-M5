import GlobalStyle from '../styles/GlobalStyles'
import styled from 'styled-components'
import Banner from '../components/Banner'
import MainBest from '../components/MainBest'
import NewList from '../components/NewList'
import HueList from '../components/HueList'
import { useNavigate } from 'react-router-dom'

const SummerMakeup = styled.div`
  margin-top: 180px;
  > div.inner {
    width: calc(100% - 500px);
    margin: 0 auto;
    display: flex;
    gap: 102px;
    > div.contents {
      width: 552px;
      > h1 {
        font-family: 'Noto Sans KR';
        font-size: 60px;
        letter-spacing: -0.05em;
        font-weight: 700;
        margin-bottom: 86px;
      }
      > h4 {
        font-family: 'Noto Sans KR';
        font-size: 20px;
        letter-spacing: -0.05em;
        margin-bottom: 12px;
      }
      > h2 {
        font-family: 'Noto Sans KR';
        font-size: 32px;
        letter-spacing: -0.05em;
        font-weight: 500;
      }
      > ul.makeup-detail {
        margin-top: 134px;
        display: flex;
        > li {
          width: 170px;
          margin-right: 16px;
          > div.thumbnail {
            > img {
              width: 100%;
              display: block;
              cursor: pointer;
            }
          }
          > div.makeup-contents {
            font-family: 'Noto Sans KR';
            letter-spacing: -0.05em;
            > h3 {
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 4px;
            }
            > span {
              display: block;
              font-size: 10px;
              color: #8e8e8e;
            }
          }
        }
      }
    }
    > div.thumbnail {
      width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      > img {
        width: 100%;
        display: block;
      }
    }
  }
`

const Thumbnail = styled.div`
  margin-top: 180px;
  > img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
`

const Main = () => {
  const navigate = useNavigate()

  const Product = [
    {
      id: 'kqbOag03VKTYZiMq5vt2',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw9ea1e5c2/hi-res/NARS_HO21_Holiday_PDPCrop_Soldier_UnwrappedMiniESPalette_Orgasm_GLBL_2000x2000.jpg?sw=255&sh=255&sm=fit',
      category: '언랩트 미니 아이섀도우 팔레트',
      name: '오르가즘',
    },

    {
      id: 'KuVFr4I445aq3zjQoE4M',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f48591b/hi-res/0607845053347.jpg?sw=856&sh=750&sm=fit',
      category: '하드와이어드 아이섀도우',
      name: '멜로즈',
    },

    {
      id: '4XrXRmzHQpuk0hWRspZO',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw638bf00a/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Roman_Holliday_Sheer_GLBL_B_square_0607845029489.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '로만 홀리데이',
    },
  ]

  const handleClickItem = (id: string) => {
    navigate('/ProductDetail', {
      state: {
        id,
      },
    });
  };

  return (
    <div>
      <GlobalStyle />
      <Banner />
      <MainBest />
      <SummerMakeup>
        <div className="inner">
          <div className="contents">
            <h1>
              여름철
              <br />
              그날의 메이크업
            </h1>
            <h4>단 한 번의 터치</h4>
            <h2>모두의 시선을 사로잡다</h2>
            <ul className="makeup-detail">
              {Product.map((product) => (
                <li key={product.id}>
                  <div className="thumbnail">
                    <img
                      src={product.src}
                      alt="Loading image"
                      onClick={() => handleClickItem(product.id)}
                    />
                  </div>
                  <div className="makeup-contents">
                    <h3>{product.category}</h3>
                    <span>{product.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="thumbnail">
            <img src="assets/main/summermakeup/sm-thumbnail.jpg" alt="summermakeup-thumbnail" />
          </div>
        </div>
      </SummerMakeup>
      <NewList />
      <Thumbnail>
        <img src="assets/main/thumbnail.jpg" alt="thumbnail" />
      </Thumbnail>
      <HueList />
    </div>
  )
}

export default Main
