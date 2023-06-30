import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import PayProcessFlow from '@/components/payment/PayProcessFlow'
import ShoppingCart from '@/components/payment/ShoppingCart'
import Btn from '@/components/payment/Btn'
import useUserInfo from '@/hooks/useUserInfo'
import useCartItems from '@/hooks/useCartItems'

export default function CheckInfo() {
  const [btnActive, setBtnActive] = useState(false)
  const [totalValue, setTotalValue] = useState(0)
  const [userInfo, _isLoggedIn, _logout] = useUserInfo()
  const [cartItems, _addcartItems, _removeCartItemsByUser, _removeOneCartItemByUser] = useCartItems(userInfo)

  useEffect(() => {
    if (cartItems.length === 0) {
      setBtnActive(true)
    } else {
      setBtnActive(false)
    }
  }, [cartItems])

  const getTotalValue = (value: number) => {
    setTotalValue(value)
  }

  return (
    <>
      <PayProcessFlow />
      <div className={styles.orderer}>
        <div className={styles.orderInfo}>주문자 정보</div>
        <div className={styles.info}>
          <div>
            <div className={styles.title}>
              <span>주문자</span>
            </div>
            <div className={styles.title}>
              <span>이메일</span>
            </div>
          </div>
          <div>
            <div className={styles.content}>
              <span>{userInfo.displayName}</span>
            </div>
            <div className={styles.content}>
              <span>{userInfo.email}</span>
            </div>
          </div>
        </div>
      </div>
      <ShoppingCart getTotalValue={getTotalValue} />
      <div className={styles.totals}>
        <div className={styles.mark}>
          <span>합계</span>
        </div>
        <div className={styles.price}>
          <span>{`₩ ${totalValue.toLocaleString()}`}</span>
        </div>
      </div>
      <Btn text="확인" targetURL={`/payment/${userInfo.displayName}/payMethod`} active={btnActive} />
    </>
  )
}
