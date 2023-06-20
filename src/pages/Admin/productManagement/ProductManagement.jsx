import React from 'react'
import '../management.css'
import ViewAllProducts from '../../../components/viewAllProducts/ViewAllProducts'

// 모든 제품 조회
// 제품 추가
// 제품 수정
// 제품 삭제
const ProductManagement = () => {
  return (
    <div className="Management">
      <h1>ProductManagement</h1>

      <ViewAllProducts />
    </div>
  )
}

export default ProductManagement