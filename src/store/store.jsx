import { create } from 'zustand'

const useStore = create(set => ({
  amount: 0,
  totalPrice: 0,
  setAmount: newAmount => set(state => ({ amount: newAmount })),
  setTotalPrice: newTotalPrice => set(state => ({ totalPrice: newTotalPrice }))
}))

export { useStore }
