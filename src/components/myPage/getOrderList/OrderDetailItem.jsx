import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productPurchase } from '../../../store/ProductTransactions'
import OrderCancel from './OrderCancel'
import OrderOk from './OrderOk'
import styled from 'styled-components'

const OrderDetailItem = () => {
  const [product, setProduct] = useState('')
  const [bank, setBank] = useState('')
  const [detail, setDetail] = useState('')
  const { detailId } = useParams()

  useEffect(() => {
    const getDetailItem = async () => {
      const res = await productPurchase(detailId)
      console.log(res)
      setDetail(res)
      setBank(res.account)
      setProduct(res.product)
    }
    getDetailItem()
  }, [])

  const { timePaid, isCanceled, done } = detail
  const { bankName = null, bankCode = null, accountNumber = null } = bank
  const { title, price, description, tags, thumbnail } = product
  return (
    <Wrapper>
      <h1>단일 제품 상세 거래 내역</h1>

      <SubWrapper>
        <img
          src={thumbnail}
          alt="thumbnail"
        />
        <p>제품 정보</p>
        <ul>
          <li>title: {title}</li>
          <li>price: {price}</li>
          <li>description: {description}</li>
          <li>tags: {tags}</li>
        </ul>

        <p>거래 계좌 정보</p>
        <ul>
          <li>bankName : {bankName}</li>
          <li>bankCode : {bankCode}</li>
          <li>accountNumber : {accountNumber}</li>
        </ul>

        <p>거래 정보</p>
        <ul>
          <li>{done ? '구매 확정' : isCanceled ? '구매 취소' : '배송 중'}</li>

          {done ? null : isCanceled ? null : (
            <li>
              취소하기 : <OrderCancel detailId={detailId} />
            </li>
          )}
          {done ? null : isCanceled ? null : (
            <li>
              거래 확정 : <OrderOk detailId={detailId} />
            </li>
          )}

          <li>timePaid : {timePaid}</li>
        </ul>
      </SubWrapper>
    </Wrapper>
  )
}

export default OrderDetailItem

const Wrapper = styled.div`
  h1 {
    margin-bottom: 20px;
  }
`

const SubWrapper = styled.div`
  img {
    width: 300px;
  }
  ul {
    margin-bottom: 20px;
  }
`
