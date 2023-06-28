import React, { useState, useEffect } from 'react'
import { getProducts } from '../../store/AdminAPI'
import ProductList from '../main/ProductList'
import { Link, useParams } from 'react-router-dom'

const ViewProduct = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { category } = useParams()

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
  )
}

export default ViewProduct
