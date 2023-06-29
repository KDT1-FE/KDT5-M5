import { create } from 'zustand'

const useStore = create(set => ({
  amount: 0,
  totalPrice: 0,
  products: [],
  setAmount: newAmount => set(state => ({ amount: newAmount })),
  setTotalPrice: newTotalPrice => set(state => ({ totalPrice: newTotalPrice })),
  setProducts: newProducts => set(state => ({ products: newProducts }))
}))

export { useStore }
