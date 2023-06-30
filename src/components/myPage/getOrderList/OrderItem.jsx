import React from 'react'

import styled from 'styled-components'

const OrderItem = ({ purchase }) => {
  console.log(purchase)
  const { detailId, product, timePaid, done, isCanceled } = purchase
  return (
    <LiWrapper
      onClick={() => {
        location.assign(`./getOrderList/${detailId}`)
      }}>
      <img
        src={product.thumbnail}
        alt="제품 썸네일"
      />
      <SubWrapper>
        <div>제품명 : {product.title}</div>
        <div>가격 : {product.price} 원</div>
        <div>거래 날짜 : {`${timePaid.split('T', 1)}`}</div>
        <div>{done ? '구매 확정' : isCanceled ? '구매 취소' : '배송 중'}</div>
      </SubWrapper>
    </LiWrapper>
  )
}

const LiWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 100px;
  }
`

const SubWrapper = styled.div`
  div {
    margin-bottom: 5px;
  }
`

export default OrderItem
