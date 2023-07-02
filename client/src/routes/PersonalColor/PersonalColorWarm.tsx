import styled from 'styled-components'
import GlobalStyle from '../../styles/GlobalStyles'
import { BiChevronsRight } from 'react-icons/bi'
import WarmProduct from '../../components/WarmProduct'

const PersonalColorWarm = () => {
  const Section = styled.div`
    margin-top: 100px;
    margin-bottom: 424px;
    > div.inner {
      width: calc(100% - 500px);
      margin: 0 auto;
      > h1 {
        font-family: 'InkLipquid';
        font-size: 42px;
        letter-spacing: -0.05em;
        text-align: center;
        color: #ffa9be;
        margin-bottom: 50px;
      }
      > h2 {
        font-family: 'InkLipquid';
        font-size: 42px;
        letter-spacing: -0.05em;
        text-align: center;
        margin-bottom: 160px;
      }
    }
  `
  const Warm = styled.div`
    font-family: 'Noto Sans KR';
    font-size: 20px;
    letter-spacing: -0.05em;
    > div {
      margin-bottom: 280px;
      &:last-child {
        margin-bottom: 0;
      }
      > h1 {
        font-weight: 500;
        margin-top: 70px;
        margin-bottom: 30px;
      }
      > img {
        width: 100%;
        display: block;
      }
    }
  `

  const Contents = styled.div`
    > p {
      display: flex;
      align-items: center;
      font-family: 'Noto Sans KR';
      font-size: 20px;
      letter-spacing: -0.05em;
      margin-bottom: 6px;
    }
    .arrow {
      color: #ffa9be;
      width: 24px;
      height: 24px;
    }
  `

  return (
    <div>
      <GlobalStyle />
      <Section>
        <div className="inner">
          <h1>나의 퍼스널 컬러는?</h1>
          <h2>웜톤</h2>
          <Warm>
            <div>
              <img src="assets/spring.png" alt="봄 웜톤" />
              <h1>봄 웜톤</h1>
              <Contents>
                <p>
                  <BiChevronsRight className="arrow" /> 봄처럼 따스한 색감
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 파스텔톤 & 비비드 톤이 잘 어울림
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 생기발랄하고 사랑스러운 이미지
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 복숭아 빛의 밝고 노란빛의 피부
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 밝은 갈색빛의 머릿결과 눈동자
                </p>
              </Contents>
              <h1>봄 웜톤 Tip</h1>
              <Contents>
                <p>
                  <BiChevronsRight className="arrow" /> BEST - 자연갈색이나 자연흑발, 발색이 진하지
                  않은 펄제품, 뷰러로 속눈썹 강조, 오렌지가 가미된 립
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> WORST - 새까만 머리색, 스모키 눈화장, 진한
                  볼터치
                </p>
              </Contents>
            </div>
            <div>
              <img src="assets/fall.png" alt="가을 웜톤" />
              <h1>가을 웜톤</h1>
              <Contents>
                <p>
                  <BiChevronsRight className="arrow" /> 황색을 지닌 따뜻한 유형
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 음영, 색조 화장이 잘 어울림
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 성숙하고 지적이며 섹시한 이미지
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 카키, 버건디 등 가을을 연상시키는 차분한
                  색상
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> 황색 빛이 도는 피부와 머리카락
                </p>
              </Contents>
              <h1>가을 웜톤 Tip</h1>
              <Contents>
                <p>
                  <BiChevronsRight className="arrow" /> BEST - 음메이크업, 색조화장, MLBB 컬러,
                  카키와 버건디, 골드 섀도우
                </p>
                <p>
                  <BiChevronsRight className="arrow" /> WORST - 블랙, 파스텔톤, 핑크 베이스의 섀도우
                  혹은 립
                </p>
              </Contents>
            </div>
          </Warm>
        </div>
      </Section>
      <WarmProduct />
    </div>
  )
}

export default PersonalColorWarm
