import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { getPurchaseList, TransactionDetail } from '../apis/api'
import { useState, useEffect, useMemo } from 'react'

interface List {
  timePaid?: string
}

interface Product {
  price: number
}

interface PurchaseList extends List {
  product: Product
}

export const SalesChart = () => {
  const [purchaseList, setpurchaseList] = useState<TransactionDetail[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const purchases = await getPurchaseList()
        setpurchaseList(purchases)
      } catch (error) {
        console.error('Error fetching list:', error)
      }
    })()
  }, [])

  function countSales(lists: PurchaseList[], month: string): PurchaseList[] {
    return lists.filter((list) => list.timePaid?.substr(5, 2) === month)
  }
  const countjune = useMemo(() => countSales(purchaseList, '06'), [purchaseList])
  const countjuly = useMemo(() => countSales(purchaseList, '07'), [purchaseList])

  function countTotal(lists: PurchaseList[]) {
    let total = 0
    lists.map((list) => (total = list.product.price + total))
    return total
  }
  const countjunetotal = useMemo(() => countTotal(countjune), [countjune])
  const countjulytotal = useMemo(() => countTotal(countjuly), [countjuly])

  const data = [
    { name: '1월', 매출: 0 },
    { name: '2월', 매출: 0 },
    { name: '3월', 매출: 0 },
    { name: '4월', 매출: 0 },
    { name: '5월', 매출: 0 },
    { name: '6월', 매출: countjunetotal },
    { name: '7월', 매출: countjulytotal },
    { name: '8월', 매출: 0 },
    { name: '9월', 매출: 0 },
    { name: '10월', 매출: 0 },
    { name: '11월', 매출: 0 },
    { name: '12월', 매출: 0 },
  ]

  return (
    <BarChart width={1000} height={200} data={data}>
      <XAxis dataKey="name" stroke="#191919" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="매출" fill="#ffa9be" barSize={30} />
    </BarChart>
  )
}
