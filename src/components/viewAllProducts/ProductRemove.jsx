import React from 'react'

const ProductRemove = ({ productId, onClick }) => {
  return <button onClick={() => onClick(productId)}>삭제</button>
}

export default ProductRemove
