import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productPurchase } from '../../../store/ProductTransactions'
import OrderCancel from './OrderCancel'
import OrderOk from './OrderOk'

const OrderDetailItem = () => {
  const { detailId } = useParams()

  const [productDetail, setProductDetail] = useState('')

  useEffect(() => {
    const getDetailItem = async () => {
      const res = productPurchase()
      setProductDetail(res)
    }
    getDetailItem()
  }, [])

  const { account, product, timePaid, isCanceled, done } = productDetail
  const { bankName, bankCode, accountNumber } = account
  const { title, price, description, tags, thumbnail } = product

  return (
    <div>
      <h1>단일 제품 상세 거래 내역 : {detailId}</h1>

      <div>
        <p>거래 계좌 정보</p>
        <ul>
          <li>bankName : {bankName}</li>
          <li>bankCode : {bankCode}</li>
          <li>accountNumber : {accountNumber}</li>
        </ul>
        <p>제품 정보</p>
        <ul>
          <li>title: {title}</li>
          <li>price: {price}</li>
          <li>description: {description}</li>
          <li>tags: {tags}</li>
          <li>thumbnail: {thumbnail}</li>
        </ul>
        거래 정보
        <ul>
          <li>timePaid : {timePaid}</li>
          <li>isCanceled : {isCanceled}</li>
          <li>
            취소하기 : <OrderCancel detailId={detailId} />
          </li>
          <li>done : {done}</li>
          <li>
            {' '}
            거래 확정 : <OrderOk detailId={detailId} />{' '}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OrderDetailItem
