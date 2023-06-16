import React from 'react'
import './ProductList.css'

const ProductList = ({ title, thumbnail, price }) => {
  return (
    <div className="product-list">
      <div className="product-card">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="product-thumbnail"
          />
        ) : (
          <img
            src="../../../public/No_Img.jpg"
            alt={title}
            className="default-thumbnail"
          />
        )}
        <h3 className="product-title">
          {title.length >= 15 ? title.slice(0, 16).concat('...') : title}
        </h3>
        <p className="product-price">{price} 원</p>
      </div>
    </div>
  )
}

export default ProductList
