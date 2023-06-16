import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleProductSearch } from '../../store/UserAPI'
import './index.css'

const ProductPage = () => {
  const { productId } = useParams()
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
        {product ? (
          <div className="section__productDetail">
            <div className="side__productDetail--image-container">
              <img
                className="side__productDetail--img"
                src={product.photo}
                alt={product.title}
              />
            </div>
            <div className="side__productDetail--container">
              <h2 className="side__productDetail--info-title">
                {product.title}
              </h2>
              <p className="side__productDetail--info-price">
                Price: {product.price}
              </p>
              <p className="side__productDetail--info-desc">
                {product.description}
              </p>
              <ul className="side__productDetail--tags">
                {product.tags.map((tag, index) => (
                  <li
                    key={index}
                    className={`side__productDetail--tag ${
                      index === 0 ? 'first-tag' : ''
                    }`}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>제품 상세 정보를 불러오는 중 입니다....</p>
        )}
      </div>
    </div>
  )
}

export default ProductPage
