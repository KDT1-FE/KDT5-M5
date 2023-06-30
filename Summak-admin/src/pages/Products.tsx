import { useState, useEffect } from 'react'
import ProductsTable from '../components/ProductsTable'
import Loading from '../components/Loading'
import { getProducts } from '../apis/admin/product'

export default function Product() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([] as Product[])

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(
        (data as Product[]).sort((a, b) => (a.title > b.title ? 1 : -1))
      )
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <div>
      <ProductsTable products={products} />
    </div>
  )
}

export interface Product {
  // 제품 정보
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 설명(최대 100자)
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부
  discountRate: number // 제품 할인율
}
