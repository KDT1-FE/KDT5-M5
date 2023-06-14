import React from 'react'

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div
          key={product.id}
          className="product-card">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-thumbnail"
            />
          ) : (
            <img
              src="../../../public/No_Img.jpg"
              alt={product.title}
              className="default-thumbnail"
            />
          )}
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">Price: {product.price} 원</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
