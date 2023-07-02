import styled from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyles'
import { BiChevronsRight } from "react-icons/bi";
import CoolProduct from '../../components/CoolProduct';

const PersonalColorCool = () => {
  

  const Section = styled.div`
    margin-top: 100px;
    margin-bottom: 424px;
    > div.inner {
      width: calc(100% - 500px);
      margin: 0 auto;
      > h1 {
        font-family: 'InkLipquid';
        font-size: 42px;
        letter-spacing: -.05em;
        text-align: center;
        color: #ffa9be;
        margin-bottom: 50px;
      }
      > h2 {
        font-family: 'InkLipquid';
        font-size: 42px;
        letter-spacing: -.05em;
        text-align: center;
        margin-bottom: 160px;
      }
    }
  `
  const Cool = styled.div`
    font-family: 'Noto Sans KR';
    font-size: 20px;
    letter-spacing: -.05em;
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
      letter-spacing: -.05em;
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
        <div className='inner'>
          <h1>나의 퍼스널 컬러는?</h1>
          <h2>쿨톤</h2>
          <Cool>
            <div>
              <img src='assets/summer.png' alt="여름 쿨톤" />
              <h1>여름 쿨톤</h1>
              <Contents>
                <p>< BiChevronsRight className="arrow"/> 흰색, 파랑을 지닌 차가운 유형</p>
                <p>< BiChevronsRight className="arrow"/> 아이보리, 라벤더, 하늘색 등 노란기 없는 차가운 색이 잘 어울림</p>
                <p>< BiChevronsRight className="arrow"/> 깔끔하고 시원하며 우아한 이미지</p>
                <p>< BiChevronsRight className="arrow"/> 핑크빛과 붉은 빛이 감도는 피부</p>
                <p>< BiChevronsRight className="arrow"/> 차갑고 회색기 섞인 톤</p>
              </Contents>
              <h1>여름 쿨톤 Tip</h1>
              <Contents>
                <p>< BiChevronsRight className="arrow"/> BEST - 노란기 없는 차가운 파스텔톤 새틴 소재, 자연 흑발</p>
                <p>< BiChevronsRight className="arrow"/> WORST - 옐로우 베이스가 들어간 헤어컬러, 스모키 화장</p>
              </Contents>
            </div>
            <div>
              <img src='assets/winter.png' alt="겨울 쿨톤" />
              <h1>겨울 쿨톤</h1>
              <Contents>
                <p>< BiChevronsRight className="arrow"/> 파랑, 흰색, 검정을 지닌 차가운 유형</p>
                <p>< BiChevronsRight className="arrow"/> 핫핑크, 버건디 색상이 잘 어울림</p>
                <p>< BiChevronsRight className="arrow"/> 시크하고 모던한 이미지</p>
                <p>< BiChevronsRight className="arrow"/> 푸른빛이 도는 어두운 검정머리</p>
                <p>< BiChevronsRight className="arrow"/> 다크 초콜릿 눈동자, 카리스마가 있음</p>
              </Contents>
              <h1>겨울 쿨톤 Tip</h1>
              <Contents>
                <p>< BiChevronsRight className="arrow"/> BEST - 블랙 헤어 혹은 백색에 가까운 금발, 가벼운 화장에 붉은 립, 핫핑크와 버건디</p>
                <p>< BiChevronsRight className="arrow"/> WORST - 골드 쥬얼리, 피치, 코랄의 따뜻한 색감</p>
              </Contents>
            </div>
          </Cool>
        </div>
      </Section>
      <CoolProduct />
    </div>
  );
};

export default PersonalColorCool;