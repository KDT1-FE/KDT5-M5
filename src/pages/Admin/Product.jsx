import React, { useEffect } from 'react'
import ProductEdit from '../../components/productEdit/ProductEdit'
import { loginCheck } from './check'

const Product = () => {
  useEffect(() => {
    loginCheck()
  }, [])
  return <ProductEdit />
}

export default Product
