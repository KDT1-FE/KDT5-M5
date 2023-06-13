import React from 'react'

export default function ProductList({ price, thumbanil, title }) {
  return (
    <div>
      <img
        src={thumbanil}
        alt={title}
      />
      <h3>{title}</h3>
      <div>
        <span>{price} 원</span>
      </div>
    </div>
  )
}
