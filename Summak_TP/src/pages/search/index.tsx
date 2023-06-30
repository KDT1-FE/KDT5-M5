import React, { useEffect, Suspense } from 'react'
import { useSetRecoilState } from 'recoil'
import { SearchQuery, searchQueryState } from '@/recoil/search/queryStringState'
import { useLocation } from 'react-router-dom'

import { BANNERS } from '@/constants/search'
import SearchSwiper from '@/components/search/SearchSwiper'
import Genre from '@/components/search/Genre'
import SearchBar from '@/components/search/SearchBar'
import Banner from '@/components/search/Banner'
import ProductList from '@/components/search/ProductList'
import PaymentLoading from '@/components/payment/Loading'
import styles from './index.module.scss'

export default function Search() {
  const location = useLocation()
  const setQuery = useSetRecoilState(searchQueryState)

  // * url이 변경되면 새로운 쿼리 스트링을 생성하여 recoil에 저장합니다.
  useEffect(() => {
    setQuery(() => {
      const params = new URLSearchParams(location.search)
      const query = {} as SearchQuery
      for (const [key, value] of params) {
        query[key] = value
      }
      return { ...query }
    })
  }, [location.search])

  return (
    <main className={styles.container}>
      <SearchSwiper />
      <div className={styles.containerWrapper}>
        <div className={styles.cover}>
          <Genre />
          <div>
            {BANNERS.map((banner) => (
              <Banner key={banner.id} banner={banner} />
            ))}
            <SearchBar />
            <Suspense fallback={<PaymentLoading color="#828282" />}>
              <ProductList />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
