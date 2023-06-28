import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const GetCart = () => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('product'))
    setProduct(storage)
  }, [])

  console.log(product)
  const products = product.map((item, index) => {
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
                let newProduct = product.slice()
                newProduct[index].amount = newProduct[index].amount + 1
                setProduct(newProduct)
              }}>
              +
            </button>
            <p>{item.amount}</p>
            <button
              onClick={() => {
                let newProduct = product.slice()
                if (newProduct[index].amount <= 1) {
                  return
                } else {
                  newProduct[index].amount = newProduct[index].amount - 1
                  setProduct(newProduct)
                }
              }}>
              -
            </button>
          </div>
        </LiWrapper>
      </li>
    )
  })
  return (
    <Wrapper>
      GetCart
      <ul>{products}</ul>
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
