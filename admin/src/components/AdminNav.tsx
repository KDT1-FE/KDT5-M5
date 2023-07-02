import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const AdminNav = () => {
  return (
    <SideMenu>
      <div className="logo-wrap">
        <span>뷰티</span>
        <span style={{ color: '#fff' }}>인사이드</span>
        <p>| 관리자</p>
      </div>
      <MenuWrap>
        <MenuItem to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          대시보드
        </MenuItem>
        <MenuItem to="/product" className={({ isActive }) => (isActive ? 'active' : '')}>
          상품관리
        </MenuItem>
        <MenuItem to="/purchase" className={({ isActive }) => (isActive ? 'active' : '')}>
          거래 내역 관리
        </MenuItem>
        <MenuItem to="/userlist" className={({ isActive }) => (isActive ? 'active' : '')}>
          사용자 목록
        </MenuItem>
      </MenuWrap>
    </SideMenu>
  )
}

const SideMenu = styled.div`
  position: absolute;
  width: 230px;
  height: 100%;
  background-color: #353535;
  border-right: 1px solid ${(props) => props.theme.colors.gray_2};
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    span {
      font-family: 'InkLipquid', 'sans-serif';
      font-size: 30px;
      color: #fff;
      color: ${(props) => props.theme.colors.primary};
      margin: 0;
    }
    p {
      color: #fff;
      font-size: 12px;
      margin-left: 5px;
    }
  }
`

const MenuWrap = styled.div`
  width: 100%;
  margin-top: 64px;
`

const MenuItem = styled(NavLink)`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 30px;
  text-decoration: none;
  color: #fff;
  &.active {
    box-sizing: border-box;
    background-color: #292929;
  }
`
