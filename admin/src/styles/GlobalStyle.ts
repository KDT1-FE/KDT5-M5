import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'InkLipquid';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    letter-spacing: -5%;
    color: ${(props) => props.theme.colors.text_primary}
  }
`

export default GlobalStyles
