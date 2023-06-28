import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const GetCart = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('product'))
    console.log(storage)
    setProducts(storage)
  }, [])

  console.log(products)
  const productList = products.map((item, index) => {
    const { title, thumbnail, tags, price } = item.product

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

          <div className="title">
            <p>{title}</p>
            {tag}
          </div>

          <p>{price}</p>

          <div className="amount">
            <button
              onClick={() => {
                let newProducts = products.slice()
                newProducts[index].amount = newProducts[index].amount + 1
                localStorage.setItem('product', JSON.stringify(newProducts))
                setProducts(newProducts)
              }}>
              +
            </button>
            <p>{item.amount}</p>
            <button
              onClick={() => {
                let newProducts = products.slice()
                if (newProducts[index].amount <= 1) {
                  return
                } else {
                  newProducts[index].amount = newProducts[index].amount - 1
                  localStorage.setItem('product', JSON.stringify(newProducts))
                  setProducts(newProducts)
                }
              }}>
              -
            </button>
          </div>

          <button
            onClick={() => {
              let newProducts = products.slice()
              newProducts = newProducts.filter(item => {
                return item !== newProducts[index]
              })
              console.log(newProducts)
              localStorage.setItem('product', JSON.stringify(newProducts))
              setProducts(newProducts)
            }}>
            삭제
          </button>
        </LiWrapper>
      </li>
    )
  })
  return (
    <Wrapper>
      GetCart
      <ul>{productList}</ul>
      <div>총 금액</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1020px;
  margin: 0 auto;

  ul li {
    padding: 10px;
  }
  ul li:nth-child(2n + 1) {
    background-color: #ececec;
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
