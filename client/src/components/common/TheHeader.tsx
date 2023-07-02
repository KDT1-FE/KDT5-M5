import companyLogo from '../../../public/assets/logo.png';
import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { authVerification } from '../../apis/api'

const Inner = styled.div`
  width: calc(100% - 334px);
  margin: 0 auto;
`

const GnbMenu = styled.div`
  position: relative;
  height: 140px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > div {
    &:first-child {
      position: absolute;
      left: 50%;
      transform: translateX(-40%);
      > a {
        width: 134px;
        display: block;
        > img {
          width: 100%;
          display: block;
        }
      }
    }
    &:last-child {
      display: flex;
      gap: 30px;
      font-family: 'Noto Sans KR';
      font-size: 14px;
      letter-spacing: -0.025em;
      color: #191919;
      text-align: right;
      margin-right: 30px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
`

const Nav = styled.ul`
  height: 80px;
  line-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  > li {
    font-family: 'Noto Sans KR';
    font-size: 16px;
    letter-spacing: -0.025em;
    color: #191919;
  }
`

const NavStyle = styled(NavLink)`
  color: #191919;
  &:link {
    transition: 0.2s;
  }
  &.active {
    color: #ffa9be;
  }
`

const Header = () => {
  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(false)
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setLoggedIn(true)
      authVerification()
        .then((data) => {
          if (data) {
            setDisplayName(data.displayName)
          } else {
            setDisplayName('')
          }
        })
        .catch((error) => {
          console.error('Failed to verify token:', error)
          setDisplayName('')
        })
    } else {
      setLoggedIn(false)
      setDisplayName('')
    }
  }, [])

  const handleLogout = () => {
    setLoggedIn(false)
    setDisplayName('')
    localStorage.removeItem('accessToken')
    navigate('/')
    window.location.reload()
  }

  return (
    <div>
      <GlobalStyle />
      <header>
        <Inner>
          <GnbMenu>
            <div>
              <NavLink to="/">
                <img src={companyLogo} alt="Company Logo" />
              </NavLink>
            </div>

            <div>
              {loggedIn ? (
                <>
                  <li>안녕하세요, {displayName}님</li>
                  <li>
                    <button onClick={handleLogout}>로그아웃</button>
                  </li>
                  <li>
                    <NavLink to="/CartPurchase">장바구니</NavLink>
                  </li>
                  <li>
                    <NavLink to="/MyPage/PurchaseList">마이페이지</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/SignIn">로그인</NavLink>
                  </li>
                  <li>
                    <NavLink to="/SignUp">회원가입</NavLink>
                  </li>
                </>
              )}
            </div>
          </GnbMenu>
          <Nav>
            <li>
              <NavStyle
                className={({ isActive }) => 'nav-link' + (isActive ? 'a' : '')}
                to="/PersonalColor"
              >
                퍼스널 컬러 진단
              </NavStyle>
            </li>
            <li>
              <NavStyle className={({ isActive }) => 'nav-link' + (isActive ? 'a' : '')} to="/Best">
                베스트
              </NavStyle>
            </li>
            <li>
              <NavStyle
                className={({ isActive }) => 'nav-link' + (isActive ? 'a' : '')}
                to="/Makeup"
              >
                메이크업
              </NavStyle>
            </li>
          </Nav>
        </Inner>
      </header>
    </div>
  )
}

export default Header
