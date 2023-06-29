import React from 'react'
import { cancelProducts } from '../../../store/ProductTransactions'

const OrderCancel = ({ detailId }) => {
  const cancel = async () => {
    const res = await cancelProducts(detailId)
    console.log(res)
    alert(res)
  }

  return <button onClick={cancel}>구매취소</button>
}

export default OrderCancel
