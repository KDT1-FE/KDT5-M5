import { create } from 'zustand'

const useStore = create(set => ({
  amount: 0,
  totalPrice: 0,
  product: '',
  setAmount: newAmount => set(state => ({ amount: newAmount })),
  setTotalPrice: newTotalPrice => set(state => ({ totalPrice: newTotalPrice })),
  setProduct: newProduct => set(state => ({ product: newProduct }))
}))

export { useStore }
