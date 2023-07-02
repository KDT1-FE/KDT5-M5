import React, { useEffect } from 'react'
import AddProduct from '../../components/addProduct/AddProduct'
import { loginCheck } from './check'

const ProductAdd = () => {
  useEffect(() => {
    loginCheck()
  }, [])
  return <AddProduct />
}

export default ProductAdd
