import { useState, useEffect } from 'react'
import { User } from '@/types/user'
import { UserCart, UserCartItem } from '@/types/usercart'

type CartItemsHook = [
  userCartItems: UserCart,
  addCartItems: (cartItem: UserCart) => void,
  removeCartItemsByUser: (user: User) => void,
  removeOneCartItemByUser: (user: User, index: number) => void
]
type Nullable<T extends object> = { [K in keyof T]: T[K] | null }

// * cart item을 관리하는 hooks입니다.
const useCartItems = (userInfo: Nullable<User>) => {
  const [cartItems, setCartItems] = useState([] as UserCart)

  // * 유저 정보가 변경될 때마다 로컬스토리지에서 해당 유저의 카트 아이템을 가져옵니다.
  useEffect(() => {
    if (!userInfo.email || !userInfo.displayName) {
      setCartItems([] as UserCart)
      return
    }
    const carts: UserCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const matchedUserCart = carts.filter((item: UserCartItem) => {
      if (item.email === userInfo.email && item.displayName === userInfo.displayName) {
        return true
      } else {
        return false
      }
    })
    setCartItems(matchedUserCart)
  }, [userInfo]) // userInfo가 변경될 때 감시 => userInfo는 비동기함수로 받아오기 떄문에, 랜딩 시 실행하면 빈 배열로 나타남.

  const addCartItems = (freshCartItems: UserCart) => {
    localStorage.setItem('cart', JSON.stringify([...freshCartItems, ...cartItems]))
    setCartItems([...freshCartItems, ...cartItems])
  }

  const removeCartItemsByUser = (user: User) => {
    const carts: UserCart = JSON.parse(localStorage.getItem('cart') || '[]')
    carts.forEach((cart) => {
      if (cart.email === user.email && cart.displayName === user.displayName) {
        const index = carts.indexOf(cart)
        carts.splice(index, 1)
      }
    })
    localStorage.setItem('cart', JSON.stringify(carts))
    setCartItems(carts)
  }

  const removeOneCartItemByUser = (user: User, index: number) => {
    const carts: UserCart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (carts[index].email === user.email && carts[index].displayName === user.displayName) {
      carts.splice(index, 1)
    }
    localStorage.setItem('cart', JSON.stringify(carts))
    setCartItems(carts)
  }

  const cartItemsHook: CartItemsHook = [cartItems, addCartItems, removeCartItemsByUser, removeOneCartItemByUser]
  return cartItemsHook
}

export default useCartItems
