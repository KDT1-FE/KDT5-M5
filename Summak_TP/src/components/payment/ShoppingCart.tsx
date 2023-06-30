import React, { useEffect } from 'react'
import styles from './ShoppingCart.module.scss'
import CartItem from './CartItem'
import { useLocation } from 'react-router-dom'
import { UserCartItem } from '@/types/usercart'
import useUserInfo from '@/hooks/useUserInfo'
import useCartItems from '@/hooks/useCartItems'

interface Props {
  getTotalValue?: (value: number) => void
}

export default function ShoppingCart({ getTotalValue }: Props) {
  const [userInfo, _isLoggedIn, _logout] = useUserInfo()
  const [cartItems, _addcartItems, _removeCartItemsByUser, removeOneCartItemByUser] = useCartItems(userInfo)
  const currentLocation = useLocation()
  const userName = userInfo.displayName

  useEffect(() => {
    const encodedUserName = encodeURIComponent(userName)
    const targetPathname = `/payment/${encodedUserName}/checkInfo`

    if (getTotalValue && currentLocation.pathname === targetPathname) {
      const total = cartItems.reduce((acc: number, item: UserCartItem) => acc + item.price, 0)
      getTotalValue(total)
    }
  }, [cartItems, currentLocation.pathname, userName])

  return (
    <div className={styles.container}>
      <div className={styles.cart_header}>
        <span className={styles.title}>상품</span>
        <span className={styles.qty}>수량</span>
        <span className={styles.price}>가격</span>
      </div>
      <div className="cart-container">
        <ul className={styles.cartList}>
          {cartItems.length > 0 ? (
            cartItems.map((item: UserCartItem, index: number) => (
              <CartItem key={index} item={item} onRemove={() => removeOneCartItemByUser(userInfo, index)} />
            ))
          ) : (
            <div> 장바구니에 담긴 물건이 없습니다! </div>
          )}
        </ul>
      </div>
    </div>
  )
}
