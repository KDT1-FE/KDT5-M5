import React, { useEffect, useState } from 'react'
import { productsPurchase } from '../../../store/ProductTransactions'
import OrderItem from './OrderItem'

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
    <div>
      <h1>제품 전체 거래 내역</h1>
      <ul>
        {purchase.map((item, index) => (
          <OrderItem
            key={index}
            purchase={item}
          />
        ))}
      </ul>
    </div>
  )
}

export default OrderList
