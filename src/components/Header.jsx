import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { searchProduct, authenticate, logOut } from '../store/UserAPI'
import './Header.css'
import logo from '../img/lmainlogo.png'

export default function Header() {
  // 검색어를 state에 저장
  const [searchText, setSearchText] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [displayName, setDisplayName] = useState('')

  // 검색 input에서 변화가 발생할 때 입력값을 state에 저장
  const handleChange = event => {
    setSearchText(event.target.value)
  }

  // 검색 아이콘을 누르거나 엔터를 쳤을 때
  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setSearchText('')
      return
    }
    await searchProduct(searchText)
    return
  }
  const header_LoginCheck = async () => {
    const info = await authenticate()
    console.log('info', info)
    if (
      info !== '유효한 사용자가 아닙니다.' &&
      info !== '인증에 실패했습니다. 다시 시도해주세요.'
    ) {
      setDisplayName(info.displayName)
      setIsLogin(true)
    }
  }
  const Logout_Click = () => {
    logOut().then(data => {
      if (data) location.replace('/')
    })
  }
  useEffect(() => {
    header_LoginCheck()
  }, [])

  return (
    <header className="header_section">
      <section className="header_section-service">
        {isLogin ? (
          <>
            <p>
              <strong>{displayName}</strong>님, 안녕하세요.
            </p>
            <Link
              to="/sign"
              onClick={Logout_Click}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign">회원가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
        <Link
          to="/cart"
          className="cart">
          <BsCart2
            size="25"
            title="장바구니"
            color="#000000"
          />
        </Link>
        <Link to="/mypage">
          <BsFillPersonFill
            size="25"
            title="마이페이지"
            color="#000000"
          />
        </Link>
      </section>
      <div className="header_section-search">
        <Link to="/">
          <img
            className="header_section-logo"
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="header_section-inputWrap">
          <form
            onSubmit={e => {
              e.preventDefault()
            }}>
            <input
              id="search-input"
              className="searchInput"
              type="text"
              value={searchText}
              placeholder="검색어를 입력해 주세요"
              onChange={handleChange}
            />
            <button
              className="searchBtn"
              aria-label="submit"
              onClick={() => {
                console.log('CLICK!!')
                handleSearch()
                setSearchText('')
              }}>
              <BiSearch
                size="24"
                color="rgb(95, 0, 128)"
              />
            </button>
          </form>
        </div>
        <div className="header_section-shopping-basket"></div>
      </div>
      <nav>
        <ul className="navbar">
          <li className="navbar_skin">
            <Link to="/product/skincare">스킨케어</Link>
          </li>
          <li className="navbar_cleansing">
            <Link to="/product/cleansing">클렌징</Link>
          </li>
          <li className="navbar_makeup">
            <Link to="/product/makeup">메이크업</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
