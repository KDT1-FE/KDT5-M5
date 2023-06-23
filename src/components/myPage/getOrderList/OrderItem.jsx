import React from 'react'
import { Link } from 'react-router-dom'

const OrderItem = ({ purchase }) => {
  const { detailId, product, timePaid, done } = purchase
  return (
    <li>
      <img
        src={product.thumbnail}
        alt="제품 썸네일"
      />
      <div>
        <Link to={`./${detailId}`}> 제품명 : {product.title} </Link>
      </div>
      <div>가격 : {product.price} 원</div>
      <div>거래 시간 : {timePaid}</div>
      <div>거래 완료 : {done}</div>
    </li>
  )
}

export default OrderItem
