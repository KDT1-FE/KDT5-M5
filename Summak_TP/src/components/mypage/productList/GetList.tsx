import React, { useState, useEffect } from 'react'
import styles from './GetList.module.scss'
import GetItem from '@/components/mypage/productList/GetItem'
import { TransactionDetails, TransactionDetail } from '@/types/product'
import { Link } from 'react-router-dom'
import useUserInfo from '@/hooks/useUserInfo'
import { getTransactionDetails } from '@/apis/payment/product'

export default function GetList() {
  const [userInfo] = useUserInfo()
  const [purchasedProducts, setPurchasedProducts] = useState<TransactionDetails>([])
  const accessToken = localStorage.getItem('token') || ''

  useEffect(() => {
    const getPurchaseHistory = async () => {
      try {
        const purchasedProducts = await getTransactionDetails(accessToken)
        setPurchasedProducts(purchasedProducts)
      } catch (e) {
        console.error(e)
      }
    }
    getPurchaseHistory()
  }, [])

  // 시간순으로 배열된 purchasedProducts를 반환하는 함수
  const sortPurchasedProductsByTime = () => {
    return purchasedProducts.sort((a, b) => {
      const timeA = new Date(a.timePaid).getTime()
      const timeB = new Date(b.timePaid).getTime()
      return timeB - timeA
    })
  }

  return (
    <div className={styles.section}>
      <span className={styles.getList}>최근 구매 내역</span>
      <button className={`${styles.btn} ${styles.getMore}`}>
        <Link className={styles.aTag} to={`/user/${userInfo.displayName}/getItemAll`}>
          구매 내역 조회
        </Link>
      </button>
      <ul className={styles.getItems}>
        {sortPurchasedProductsByTime()
          .slice(0, 4)
          .map((item: TransactionDetail, index: number) => (
            <GetItem key={index} item={item} />
          ))}
      </ul>
    </div>
  )
}
