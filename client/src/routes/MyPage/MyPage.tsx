import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'
import { SideNav } from '../../components/mypage/SideNav'
import { Outlet } from 'react-router-dom'

const Mypage = () => {
  return (
    <>
      <GlobalStyle />
      <MypageWrap>
        <Inner>
          <SideNav></SideNav>
          <Outlet></Outlet>
        </Inner>
      </MypageWrap>
    </>
  )
}

export default Mypage

const MypageWrap = styled.div`
  width: 900px;
  margin: 0 auto;
`
const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: -100px;
`
