import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyles'


const PersonalColorTest = () => {
  const navigate = useNavigate();
  
  const checkOne = (checkThis: HTMLInputElement) => {
    const checkboxes = document.getElementsByName('test1');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };

  const checkTwo = (checkThis: HTMLInputElement) => {
    const checkboxes = document.getElementsByName('test2');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };
  
  const checkThree = (checkThis: HTMLInputElement) => {
    const checkboxes = document.getElementsByName('test3');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };
  
  const checkFour = (checkThis: HTMLInputElement) => {
    const checkboxes = document.getElementsByName('test4');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };
  
  const checkFive = (checkThis: HTMLInputElement) => {
    const checkboxes = document.getElementsByName('test5');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };
  
  const checkSix = (checkThis: HTMLInputElement) => {
    const checkboxes = document.getElementsByName('test6');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };
  


  const Section = styled.div`
    margin-top: 100px;
    box-sizing: border-box;
    > h1 {
      font-family: 'InkLipquid';
      font-size: 42px;
      text-align: center;
      color: #ffa9be;
      margin-bottom: 50px;
    }
    > h2 {
      font-family: 'Noto Sans KR';
      font-size: 20px;
      text-align: center;
      margin-bottom: 76px;
    }
    > div.test-list {
      width: 950px;
      margin: 0 auto;
      margin-bottom: 120px;
      > ul {
        > div {
          display: flex;
          align-items: center;
          margin-bottom: 26px;
          &:last-child {
            margin-bottom: 0;
          }
          &:nth-child(1) {
            padding-left: 132px;
          }
          &:nth-child(2) {
            padding-left: 114px;
          }
          &:nth-child(3) {
            padding-left: 156px;
          }
          &:nth-child(4) {
            padding-left: 216px;
          }
          &:nth-child(5) {
            padding-left: 88px;
          }
          &:nth-child(6) {
            padding-left: 76px;
          }
          > li {
            display: flex;
            margin-right: 20px;
            %:last-child {
              margin-right: 0;
            }
            > label {
              font-family: 'Noto Sans KR';
              font-size: 20px;
              letter-spacing: -.05%;
              &:first-child {
                margin-right: 20px;
                text-align: right;
              }
              &:last-child {
                margin-left: 20px;
                text-align: left;
              }
            }
          }
          > li.number {
            font-family: 'Spoqa Han Sans Neo';
            font-size: 20px;
            letter-spacing: 0;
            font-weight: 500;
          }
        }
      }
    }
  `
  const Test =  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;
    > span:first-child {
      margin-right: 32px;
    }
  `


  const Button = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;

    > button {
      font-family: 'Noto Sans KR';
      font-size: 26px;
      color: #fff;
      background-color: #dedede;
      padding: 12px 60px;
      border-radius: 30px;
      transition: .3s;
      cursor: pointer;
      &:first-child {
        margin-left: 8px;
        margin-right: 20px;
      }
      &:hover {
        background-color: #ffa9be;
      }
    }
  `
  
  const StyledInput = styled.input`
    appearance: none;
    border: 1px solid #8e8e8e;
    border-radius: 6px;
    width: 28px;
    height: 28px;
    &:checked {
      border-color: transparent;
      background: url('assets/checkbox.png') no-repeat center center;
    }
  `

  return (
    <div>
      <GlobalStyle />
      <Section>
        <h1>퍼스널컬러 진단</h1>
        <h2>선택의 개수가 많은 쪽이<br />본인의 피부톤입니다.</h2>
        <Test>
          <span>WARM</span>
          <span>COOL</span>
        </Test>
        <div className='test-list'>
          <ul>
            <div>
              <li>
                <label>햇볓에 장시간 있으면 쉽게 탄다.</label>
                <StyledInput type='checkbox' name='test1' value='1' onChange={(e) => checkOne(e.target)} />
              </li>
              <li className='number'>01</li>
              <li>
                <StyledInput type='checkbox' name='test1' value='2' onChange={(e) => checkOne(e.target)} />
                <label>햇볕에 장시간 있으면 빨갛게 익는다.</label>
              </li>
            </div>
            <div>
              <li>
                <label>골드 계열의 주얼리가 잘 어울린다.</label>
                <StyledInput type='checkbox' name='test2' value='1' onChange={(e) => checkTwo(e.target)} />
              </li>
              <li className='number'>02</li>
              <li>
                <StyledInput type='checkbox' name='test2' value='2' onChange={(e) => checkTwo(e.target)} />
                <label>실버 계열의 주얼리가 잘 어울린다.</label>
              </li>
            </div>
            <div>
              <li>
                <label>헤어 컬러가 브라운에 가깝다.</label>
                <StyledInput type='checkbox' name='test3' value='1' onChange={(e) => checkThree(e.target)} />
              </li>
              <li className='number'>03</li>
              <li>
                <StyledInput type='checkbox' name='test3' value='2' onChange={(e) => checkThree(e.target)} />
                <label>헤어 컬러가 블랙에 가깝다.</label>
              </li>
            </div>
            <div>
              <li>
                <label>피부에 노란기가 많다.</label>
                <StyledInput type='checkbox' name='test4' value='1' onChange={(e) => checkFour(e.target)} />
              </li>
              <li className='number'>04</li>
              <li>
                <StyledInput type='checkbox' name='test4' value='2' onChange={(e) => checkFour(e.target)} />
                <label>피부에 붉은기가 많다.</label>
              </li>
            </div>
            <div>
              <li>
                <label>피치 계열의 립스틱이 더 잘 어울린다.</label>
                <StyledInput type='checkbox' name='test5' value='1' onChange={(e) => checkFive(e.target)} />
              </li>
              <li className='number'>05</li>
              <li>
                <StyledInput type='checkbox' name='test5' value='2' onChange={(e) => checkFive(e.target)} />
                <label>핑크 계열의 립스틱이 더 잘 어울린다.</label>
              </li>
            </div>
            <div>
              <li>
                <label>자연광 아래서 혈관이 초록색을 보인다.</label>
                <StyledInput type='checkbox' name='test6' value='1' onChange={(e) => checkSix(e.target)} />
              </li>
              <li className='number'>06</li>
              <li>
                <StyledInput type='checkbox' name='test6' value='2' onChange={(e) => checkSix(e.target)} />
                <label>자연광 아래서 혈관이 파란색을 보인다.</label>
              </li>
            </div>
          </ul>
        </div>
        <Button>
          <button onClick={ () => {navigate('/PersonalColorWarm')}}>웜톤 결과보기</button>
          <button onClick={ () => {navigate('/PersonalColorCool')}}>쿨톤 결과보기</button>
        </Button>
        
      </Section>
    </div>
  );
};

export default PersonalColorTest;