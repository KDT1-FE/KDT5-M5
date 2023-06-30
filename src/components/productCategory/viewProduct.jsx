import React, { useState, useEffect } from 'react'
import { getProducts } from '../../store/AdminAPI'
import ProductList from '../main/ProductList'
import { Link, useParams } from 'react-router-dom'
import './viewProduct.css'

const ViewProduct = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAscendingOrder, setIsAscendingOrder] = useState(true)
  const { category } = useParams()

  useEffect(() => {
    async function productData() {
      const res = await getProducts()

      let productsCategory = res
      if (category) {
        productsCategory = res.filter(product => product.tags[0] === category)
      }

      const sortedProducts = [...productsCategory].sort((a, b) => {
        if (isAscendingOrder) {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })

      setProducts(sortedProducts)
      setIsLoading(false)
    }

    productData()
  }, [category, isAscendingOrder])

  const handleLowPriceClick = () => {
    setIsAscendingOrder(true)
  }

  const handleHighPriceClick = () => {
    setIsAscendingOrder(false)
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <div className="price-sort">
        <span
          className={isAscendingOrder ? 'active' : ''}
          onClick={handleLowPriceClick}>
          낮은 가격순
        </span>{' '}
        <span> &nbsp;|&nbsp; </span>
        <span
          className={!isAscendingOrder ? 'active' : ''}
          onClick={handleHighPriceClick}>
          높은 가격순
        </span>
      </div>
      <div className="product-container view">
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

export default ViewProduct
