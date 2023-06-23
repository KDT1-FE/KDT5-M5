import React, { useState, useEffect } from 'react'
import './productMenu.css'
import ProductList from './ProductList'
import { getProducts } from '../../store/AdminAPI'
import { Link } from 'react-router-dom'

const ProductMenu = ({ category }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function productData() {
      const res = await getProducts()

      let productsCategory = res
      if (category) {
        productsCategory = res.filter(product => product.tags[0] === category)
      }

      setProducts(productsCategory)
      setIsLoading(false)
    }

    productData()
  }, [category])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <div className="product-category">
        <h2>{category}</h2>
      </div>
      <div className="product-container">
        {products.map(product => (
          <Link
            to={`/product/${product.tags[0]}/${product.id}`}
            key={product.id}>
            <ProductList
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
            />
          </Link>
        ))}
      </div>
    </>
  )
}

export default ProductMenu
