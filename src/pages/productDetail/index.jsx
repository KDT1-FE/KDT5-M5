import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleProductSearch, authenticate } from '../../store/UserAPI'
import { Link } from 'react-router-dom'
import './index.css'

const ProductPage = () => {
  const { category, productId } = useParams()
  const [product, setProduct] = useState(null)
  const [amount, setAmount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkLoginStatus()
  }, [])

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

  useEffect(() => {
    if (product) {
      const calculatedPrice = product.price * amount
      setTotalPrice(calculatedPrice)
    }
  }, [amount, product])

  const checkLoginStatus = async () => {
    try {
      const user = await authenticate()
      if (user) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const amountMinus = () => {
    if (amount - 1 >= 0) {
      setAmount(amount - 1)
    }
  }

  const amountPlus = () => {
    setAmount(amount + 1)
  }

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
              <div className="side__productDetail--amountCal">
                <h3>구매 수량</h3>
                <button
                  className="side__productAmount--minus"
                  onClick={amountMinus}>
                  -
                </button>
                <span className="side__productAmount--amonut">{amount}</span>
                <button
                  className="side__productAmount--plus"
                  onClick={amountPlus}>
                  +
                </button>
              </div>
              <div className="side__totalPrice">
                <h3>상품금액 합계</h3>
                <span>{totalPrice} 원</span>
              </div>
              {isLoggedIn ? (
                <Link
                  to={`/payment/${category}/${productId}?amount=${amount}&totalPrice=${totalPrice}`}>
                  <button
                    className={`side__payment ${
                      totalPrice === 0 ? 'disabled' : ''
                    }`}
                    disabled={totalPrice === 0}>
                    결제하기
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="side__payment">로그인 후 결제하기</button>
                </Link>
              )}
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
