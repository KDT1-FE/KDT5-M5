import React, { useEffect, useState } from 'react'
import { productsPurchase } from '../../../store/ProductTransactions'
import OrderItem from './OrderItem'
import styled from 'styled-components'

const OrderList = () => {
  const [purchase, setPurchase] = useState([])

  useEffect(() => {
    const getPurchase = async () => {
      const res = await productsPurchase()
      setPurchase(res)
    }
    getPurchase()
  }, [])

  return (
    <Wrapper>
      <h1>제품 전체 거래 내역</h1>
      <ul>
        {purchase.map((item, index) => (
          <OrderItem
            key={index}
            purchase={item}
          />
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  li {
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  li:hover {
    cursor: pointer;
    background-color: #ebebeb;
  }
`

export default OrderList
