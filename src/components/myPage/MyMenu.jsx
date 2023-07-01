import React from 'react'
import './myMenu.css'
import styled from 'styled-components'

const MyMenu = () => {
  return (
    <div className="my-menu">
      <Wrapper>
        <h2>마이페이지</h2>
        <ul>
          <div>
            <li>
              <a href="/mypage">마이페이지</a>
            </li>
          </div>

          <div>
            <li>
              <a href="/cart">장바구니</a>
            </li>
            <li>
              <a href="/mypage/paymentMethod">결제 정보</a>
            </li>
            <li>
              <a href="/mypage/getOrderList">주문 조회</a>
            </li>
          </div>

          <li>
            <a href="/mypage/changeMyInfo">회원정보 수정</a>
          </li>
        </ul>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  li {
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
  }

  li:hover {
    background-color: #c9c9c9;
  }

  ul div {
    border-bottom: 1px solid #929292;
  }

  ul {
    background-color: #e6e6e6;
    padding: 10px;
    border-radius: 5px;
  }
`

export default MyMenu
