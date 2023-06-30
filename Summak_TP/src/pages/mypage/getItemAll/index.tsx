import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import SideBarItem from '@/components/mypage/nav/SideBarItem'
import GetItemMore from '@/components/mypage/productList/GetItemMore'
import { TransactionDetails, TransactionDetail } from '@/types/product'
import { getTransactionDetails } from '@/apis/payment/product'

export default function GetItemAll() {
  const [purchasedProducts, setPurchasedProducts] = useState<TransactionDetails>([])
  const accessToken = localStorage.getItem('token') || ''

  useEffect(() => {
    getPurchaseHistory().then((res) => setPurchasedProducts(res))
  }, [])

  const getPurchaseHistory = async () => {
    try {
      const purchasedProducts = await getTransactionDetails(accessToken)
      return purchasedProducts
    } catch (e) {
      console.error(e)
    }
  }

  // 시간순으로 배열된 purchasedProducts를 반환하는 함수
  const sortPurchasedProductsByTime = () => {
    return purchasedProducts.sort((a, b) => {
      const timeA = new Date(a.timePaid).getTime()
      const timeB = new Date(b.timePaid).getTime()
      return timeB - timeA
    })
  }

  return (
    <>
      <div className={styles.container}>
        <SideBarItem />
        <section className={styles.section}>
          <span className={styles.title}>구매 내역</span>
          <hr className={styles.line} />
          <div className={styles.getItems}>
            <ul className={styles.getItem}>
              {purchasedProducts
                ? sortPurchasedProductsByTime().map((item: TransactionDetail, index: number) => (
                    <GetItemMore key={index} item={item} />
                  ))
                : null}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
