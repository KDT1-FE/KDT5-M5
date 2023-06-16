import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleProductSearch } from '../../store/UserAPI'
import './index.css'

const ProductPage = () => {
  const { category, productId } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await singleProductSearch(productId)
        setProduct(productData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [productId])

  return (
    <div className="section">
      <div className="section__container">
        <div className="section__productDetail">
          <h1 className="side__productDetail--info-title">제품 상세 정보</h1>
          {product ? (
            <div>
              <h2 className="side__productDetail--info-title">
                {product.title}
              </h2>
              <div>
                <img
                  className="side__productDetail--img"
                  src={product.photo}
                  alt={product.title}
                />
              </div>
              <p className="side__productDetail--info-desc">
                {product.description}
              </p>
              <p className="side__productDetail--info-price">
                Price: {product.price}
              </p>
            </div>
          ) : (
            <p>제품 상세 정보를 로딩 중 입니다...</p>
          )}
        </div>
      </div>
      <div>{category}</div>
    </div>
  )
}

export default ProductPage
