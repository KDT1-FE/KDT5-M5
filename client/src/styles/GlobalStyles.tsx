import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  // InkLipquid font 적용
  @font-face {
    font-family: 'InkLipquid';
    src: local('InkLipquid'), url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff') format('woff');
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  // 공통
  body {
    font-family: 'Noto Sans KR';
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: #191919;
    text-decoration: none;
  }

  button {
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
  }
`

export default GlobalStyle