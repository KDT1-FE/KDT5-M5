import React from 'react'

import styled from 'styled-components'

const OrderItem = ({ purchase }) => {
  const { detailId, product, timePaid, done, isCanceled } = purchase
  return (
    <li>
      <LiWrapper
        onClick={() => {
          location.assign(`./getOrderList/${detailId}`)
        }}>
        <div className="done">
          {done ? '구매 확정' : isCanceled ? '구매 취소' : '배송 중'}
        </div>
        <div className="product">
          <img
            src={product.thumbnail}
            alt="제품 썸네일"
          />
          <SubWrapper>
            <div>제품명 : {product.title}</div>
            <div>가격 : {product.price} 원</div>
            <div>거래 날짜 : {`${timePaid.split('T', 1)}`}</div>
          </SubWrapper>
        </div>
      </LiWrapper>
    </li>
  )
}

const LiWrapper = styled.div`
  padding: 10px;
  cursor: pointer;

  .product {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .done {
    margin: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid #b1b1b1;
  }
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
