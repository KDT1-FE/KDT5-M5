import styled from 'styled-components'
import { MdLogout } from 'react-icons/md'
import { AdminClock } from './AdminClock'

export const AdminHeader = () => {
  const handleClickLogout = () => {
    alert('관리자를 로그아웃 합니다.')
    window.location.href = 'https://beautyinside.netlify.app/'
  }

  return (
    <Header>
      <AdminClock />
      <LogoutButton onClick={handleClickLogout}>
        <MdLogout />
      </LogoutButton>
    </Header>
  )
}

const Header = styled.div`
  position: absolute;
  right: 0;
  width: calc(100% - 230px);
  height: 64px;
  background-color: ${(props) => props.theme.colors.primary};
  background-color: #fff;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_2};
  z-index: 11;
  display: flex;
  justify-content: right;
  align-items: center;
  .logo-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 10px;
    span {
      font-family: 'InkLipquid', 'sans-serif';
      font-size: 30px;
      color: #fff;
      color: ${(props) => props.theme.colors.primary};
      margin: 0;
    }
    p {
      color: #353535;
      font-size: 12px;
      margin-left: 5px;
    }
  }
`

const LogoutButton = styled.button`
  width: 36px;
  height: 36px;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  background-color: transparent;
  border: none;
`
