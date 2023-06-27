import React from 'react'
import { confirm } from '../../../store/ProductTransactions'

const OrderOk = ({ detailId }) => {
  const cancel = async () => {
    const res = await confirm(detailId)
    console.log(res)
    alert(res)
  }

  return <button onClick={cancel}></button>
}

export default OrderOk
