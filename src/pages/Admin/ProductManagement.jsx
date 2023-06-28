import React from 'react'
import ViewAllProducts from '../../components/viewAllProducts/ViewAllProducts'
import { loginCheck } from './check'

const ProductManagement = () => {
  loginCheck()
  return <ViewAllProducts />
}

export default ProductManagement
