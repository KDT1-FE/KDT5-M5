import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SideNav = () => {
  return (
    <NavWrap>
      <p className="nav-title">마이페이지</p>
      <NavButton to="/MyPage/PurchaseList" className={({ isActive }) => (isActive ? 'active' : '')}>
        구매 내역
      </NavButton>
      <NavButton to="/MyPage/Account" className={({ isActive }) => (isActive ? 'active' : '')}>
        계좌 관리
      </NavButton>
    </NavWrap>
  )
}

const NavWrap = styled.div`
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .active {
    color: #ffa9be;
  }
  .nav-title {
    font-size: 26px;
  }
`

const NavButton = styled(NavLink)`
  color: #8e8e8e;
  font-size: 20px;
`
