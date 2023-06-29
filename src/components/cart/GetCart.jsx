import React, { useEffect } from 'react'
import styled from 'styled-components'
import MyInfo from '../myPage/MyInfo'
import { useStore } from '../../store/store'
import { useNavigate } from 'react-router-dom'

const GetCart = () => {
  const navigate = useNavigate()
  const { products, setProducts, totalPrice, setTotalPrice } = useStore(
    state => ({
      products: state.products,
      setProducts: state.setProducts,
      totalPrice: state.totalPrice,
      setTotalPrice: state.setTotalPrice
    })
  )

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('productInCart'))
    setProducts(storage)
  }, [])

  useEffect(() => {
    let totalPrice = 0
    products.map(item => {
      const { price, amount } = item

      totalPrice = totalPrice + price * amount
    })
    setTotalPrice(totalPrice)
  }, [products])

  const productList = products.map((item, index) => {
    const { id, title, thumbnail, tags, price, amount } = item

    const tag = tags.map((tag, index) => {
      return <span key={index}>{tag}</span>
    })

    return (
      <li key={index}>
        <LiWrapper>
          <img
            src={thumbnail}
            alt="thumbnail"
          />

          <div
            className="title"
            onClick={() => {
              location.assign(`/product/cleansing/${id}`)
            }}>
            <p>{title}</p>
            {tag}
          </div>

          <p>{price} 원</p>

          <div className="amount">
            <button
              onClick={() => {
                let newProducts = products.slice()
                if (newProducts[index].amount <= 1) {
                  return
                } else {
                  newProducts[index].amount = newProducts[index].amount - 1
                  localStorage.setItem(
                    'productInCart',
                    JSON.stringify(newProducts)
                  )
                  setProducts(newProducts)
                }
              }}>
              -
            </button>

            <p>{amount}</p>

            <button
              onClick={() => {
                let newProducts = products.slice()
                newProducts[index].amount = newProducts[index].amount + 1
                localStorage.setItem(
                  'productInCart',
                  JSON.stringify(newProducts)
                )
                setProducts(newProducts)
              }}>
              +
            </button>
          </div>

          <button
            onClick={() => {
              let newProducts = products.slice()
              newProducts = newProducts.filter(item => {
                return item !== newProducts[index]
              })
              console.log(newProducts)
              localStorage.setItem('productInCart', JSON.stringify(newProducts))
              setProducts(newProducts)
            }}>
            삭제
          </button>
        </LiWrapper>
      </li>
    )
  })

  const handlePayment = () => {
    navigate('/payment')
  }

  return (
    <Wrapper>
      <div className="cart">
        <p className="cart-tatle">장바구니</p>
        <p className="cart-step">
          01 장바구니 &gt;<span> 02 주문/결제 &gt; 03 주문완료</span>
        </p>
      </div>

      <MyInfo />

      <div className="product-wrapper">
        <p className="product">배송상품</p>
        <ul>{productList}</ul>
      </div>
      <div className="total">
        <p>
          장바구니 상품의 총 금액은 <span>{totalPrice}</span>원 입니다
        </p>
        <button onClick={handlePayment}>전체결제</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1020px;
  margin: 0 auto;

  button {
    height: 35px;
    border: none;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #b7ffb5;
    text-align: center;
  }

  button:hover {
    background-color: #77af9c;
    cursor: pointer;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;

    height: 100px;
    background-color: #ffdbf7;
    margin-bottom: 30px;
  }

  .cart-step {
    font-size: 24px;
  }

  .cart span {
    color: #9e9e9e;
  }

  .cart-tatle {
    font-size: 50px;
    font-weight: bold;
  }

  .product-wrapper {
    border-top: 1px solid #b6b6b6;
    border-bottom: 1px solid #b6b6b6;
  }

  .product {
    padding: 10px;
    font-size: 26px;
    background-color: #d7ffd7;
    color: #333333;
  }

  ul li {
    padding: 10px;
  }
  ul li:nth-child(2n) {
    background-color: #ececec;
  }

  .total {
    border-top: 2px solid #81f781;
    margin: 20px auto;
    padding: 50px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #757575;
  }

  .total button {
    width: 200px;
    height: 50px;
    font-size: 24px;
    color: #494949;
  }

  .total p {
    font-size: 32px;
  }
  .total p span {
    color: #ff5a5a;
    font-weight: bold;
  }
`

const LiWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  .title {
    max-width: 300px;
    width: 100%;
  }

  .title:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  img {
    width: 100px;
  }

  span {
    display: inline-block;
    margin-top: 5px;
    margin-right: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: #81f781;
    font-size: 12px;
    color: #2e2e2e;
  }

  .amount {
    display: flex;
  }

  .amount button {
    width: 20px;
    height: 20px;
    line-height: 0px;
    border: 0;
    background-color: #81f781;
  }
  .amount button:hover {
    background-color: #5eb15e;
    cursor: pointer;
  }

  .amount p {
    margin: 0 5px;
  }
`

export default GetCart
