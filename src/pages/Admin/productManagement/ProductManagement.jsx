import React from 'react'
import '../management.css'
import AddProduct from '../../../components/AddProduct/AddProduct'

// 모든 제품 조회
// 제품 추가
// 제품 수정
// 제품 삭제
const ProductManagement = () => {
  return (
    <div className="Management">
      <h1>ProductManagement</h1>
      <AddProduct />
    </div>
  )
}

export default ProductManagement
