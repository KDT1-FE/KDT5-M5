import React from 'react'
import { cancelProducts } from '../../../store/ProductTransactions'

const OrderCancel = ({ detailId }) => {
  const cancel = async () => {
    const res = await cancelProducts(detailId)

    alert(res)
    location.reload()
  }

  return <button onClick={cancel}>구매취소</button>
}

export default OrderCancel
