import React, { useState, useEffect } from 'react'
import './productMenu.css'
import ProductList from './ProductList'
import { getProducts } from '../../store/AdminAPI'
import { Link } from 'react-router-dom'

const ProductMenu = ({ category }) => {
  const [products, setproducts] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts()

        if (res) {
          const filteredProducts = res.filter(product =>
            category ? product.tags[0] === category : product
          )

          setproducts(filteredProducts)
        }
      } catch (error) {
        alert(error)
      }
    }

    fetchData()
  }, [category])

  return (
    <>
      <div className="product-menu">
        <h2>{category}</h2>
        {products?.map(product => (
          <li
            key={product.id}
            className={`p-2 ${
              product.isSoldOut ? 'opacity-20' : ''
            } group cursor-pointer shadow-md`}>
            <Link to={`/products/${product.tags[0]}/${product.id}`}>
              <ProductCard
                key={product.id}
                title={product.title}
                discountRate={product.discountRate}
                price={product.price}
                thumbnail={product.thumbnail}
                tags={product.tags}
              />
            </Link>
          </li>
        ))}
      </div>
    </>
  )
}

export default ProductMenu
