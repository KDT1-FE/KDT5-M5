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
          <li>
            <span>제품명</span> {title}
          </li>
          <li>
            <span>가격</span> {price}
          </li>
          <li>
            <span>제품설명</span> {description}
          </li>
          <li>
            <span>태그</span>{' '}
            {tags
              ? tags.map(tag => {
                  return `# ${tag} `
                })
              : null}
          </li>
        </ul>

        <p>거래 계좌 정보</p>
        <ul>
          <li>
            <span>은행</span> {bankName}
          </li>
          <li>
            <span>은행 코드</span> {bankCode}
          </li>
          <li>
            <span>계좌 번호</span> {accountNumber}
          </li>
        </ul>

        <p>거래 정보</p>
        <ul>
          <li>
            <span>거래 여부</span>
            {done ? '구매 확정' : isCanceled ? '구매 취소' : '배송 중'}
          </li>

          {done ? null : isCanceled ? null : (
            <li>
              <span>구매 취소</span> <OrderCancel detailId={detailId} />
            </li>
          )}
          {done ? null : isCanceled ? null : (
            <li>
              <span>구매 확정</span> <OrderOk detailId={detailId} />
            </li>
          )}

          <li>
            <span>거래 날짜</span>{' '}
            {`${timePaid ? timePaid.split('T', 1) : null}`}
          </li>
        </ul>
      </SubWrapper>
    </Wrapper>
  )
}

export default OrderDetailItem

const Wrapper = styled.div`
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`

const SubWrapper = styled.div`
  p {
    font-weight: bold;
    border-bottom: 2px solid black;
    margin-bottom: 5px;
    line-height: 30px;
  }
  span {
    display: inline-block;
    width: 100px;
    color: #7a7a7a;
  }
  img {
    width: 500px;
  }
  ul {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #888888;
  }

  li {
    line-height: 30px;
  }
`
