import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { singleProductSearch, authenticate } from '../../store/UserAPI'
import './index.css'
import { useStore } from '../../store/store'

const ProductPage = () => {
  const { productId } = useParams()
  const { amount, setAmount, totalPrice, setTotalPrice, product, setProduct } =
    useStore(state => ({
      amount: state.amount,
      setAmount: state.setAmount,
      totalPrice: state.totalPrice,
      setTotalPrice: state.setTotalPrice,
      product: state.product,
      setProduct: state.setProduct
    }))

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const isButtonActive = totalPrice !== 0

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
  }, [amount, product, setTotalPrice])

  const checkLoginStatus = async () => {
    try {
      const user = await authenticate()
      if (typeof user === 'object' && user !== null) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const amountDecrement = () => {
    if (amount - 1 >= 0) {
      setAmount(amount - 1)
    }
  }

  const amountIncrement = () => {
    setAmount(amount + 1)
  }

  const shoppingCart = (product, amount) => {
    const { id, title, thumbnail, price, tags } = product
    const saveProductInCart = localStorage.getItem('productInCart')

    let productsInCart = []

    if (saveProductInCart) {
      productsInCart = JSON.parse(saveProductInCart)
    }

    const productsInCartIndex = productsInCart.findIndex(
      product => product.id === id
    )

    if (productsInCartIndex !== -1) {
      productsInCart[productsInCartIndex].amount += amount
    } else {
      const productInCart = {
        id,
        title,
        thumbnail,
        price,
        amount,
        tags
      }
      productsInCart.push(productInCart)
    }

    localStorage.setItem('productInCart', JSON.stringify(productsInCart))
  }

  const duplicateCart = (product, amount) => {
    shoppingCart(product, amount)
  }

  return (
    <div className="section">
      <div className="section__container">
        {product ? (
          <div className="section__productDetail">
            <div className="side__productDetail--image-container">
              <div className="image-wrapper">
                <p className="side__productDetail--imgInfo">제품 이미지</p>
                <img
                  className="side__productDetail--img"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="image-wrapper">
                <p className="side__productDetail--imgInfo">제품 상세 정보</p>
                <img
                  className="side__productDetail--img"
                  src={product.photo}
                  alt={product.title}
                />
              </div>
            </div>

            <div className="side__productDetail--container">
              <h2 className="side__productDetail--info-title">
                {product.title}
              </h2>
              <p className="side__productDetail--info-price">
                {product.price.toLocaleString()} 원
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
                <div className="side__productAmount--btn-container">
                  <button
                    className="side__productAmount--decrease"
                    onClick={amountDecrement}>
                    -
                  </button>
                  <span className="side__productAmount--amonut">{amount}</span>
                  <button
                    className="side__productAmount--increase"
                    onClick={amountIncrement}>
                    +
                  </button>
                </div>
              </div>
              <div className="side__totalPrice">
                <h3>상품금액 합계</h3>
                <span>{totalPrice.toLocaleString()} 원</span>
              </div>
              {isLoggedIn ? (
                <div className="side__payment--btn-container">
                  <Link
                    to={isButtonActive ? '/cart' : '#'}
                    className={`side__payment--link ${
                      isButtonActive ? '' : 'disabled-link'
                    }`}>
                    <button
                      className={`side__payment ${
                        isButtonActive ? '' : 'disabled'
                      }`}
                      disabled={!isButtonActive}
                      onClick={() => duplicateCart(product, amount)}>
                      장바구니
                    </button>
                  </Link>
                  <Link
                    to={isButtonActive ? '/payment' : '#'}
                    className={`side__payment--link ${
                      isButtonActive ? '' : 'disabled-link'
                    }`}>
                    <button
                      className={`side__payment ${
                        isButtonActive ? '' : 'disabled'
                      }`}
                      disabled={!isButtonActive}>
                      결제하기
                    </button>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="side__payment--link">
                  <button className="side__payment">로그인 후 결제</button>
                </Link>
              )}
              <p className="info">
                제품 이미지를 스크롤 하시면 상세 정보 이미지가 있습니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="loading__container">
            제품 상세 정보를 불러오는 중입니다...
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage
