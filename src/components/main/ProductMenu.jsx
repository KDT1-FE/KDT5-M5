import React, { useState, useEffect } from 'react'
import './productMenu.css'
import ProductList from './ProductList'
import { getProducts } from '../../store/AdminAPI'
import { Link } from 'react-router-dom'

const ProductMenu = ({ category }) => {
  const [products, setproducts] = useState()

  return (
    <>
      <div className="product-menu">
        <h2>{category}</h2>
      </div>
    </>
  )
}

export default ProductMenu
