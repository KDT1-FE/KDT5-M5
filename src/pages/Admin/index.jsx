import React from 'react'

const admin = () => {
  // 거래 관리

  // 전체 거래(판매) 내역
  // 거래(판매) 내역 완료/취소 및 해제

  return (
    <>
      <div className="link">
        <a href="admin/user">유저 리스트</a>
      </div>
      <div className="link">
        <a href="admin/productAdd">제품 추가</a>
      </div>
      <div className="link">
        <a href="admin/products">제품 관리</a>
      </div>
    </>
  )
}

export default admin
