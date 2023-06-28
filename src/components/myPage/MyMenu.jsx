import React from 'react'
import './myMenu.css'

const MyMenu = () => {
  return (
    <div className="my-menu">
      <h2>마이페이지</h2>
      <ul>
        <li>
          <a href="/mypage">마이페이지</a>
        </li>
        <li>─────────</li>
        <li>
          <a href="/mypage/paymentMethod">결제 정보</a>
        </li>
        <li>─────────</li>
        <li>
          <a href="/mypage/getOrderList">주문 조회</a>
        </li>
        <li>
          <a href="/mypage/getOrderCancelList">취소 내역 조회</a>
        </li>
        <li>─────────</li>
        <li>
          <a href="/mypage/changeMyInfo">회원정보 수정</a>
        </li>
      </ul>
    </div>
  )
}

export default MyMenu
