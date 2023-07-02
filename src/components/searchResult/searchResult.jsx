import React from 'react'
import { useStore } from '../../store/store'
import ProductList from '../main/ProductList'
import './searchResult.css'

const SearchResult = () => {
  const { searchResult } = useStore()

  return (
    <>
      <div className="product-container result">
        {searchResult.length > 0 ? (
          searchResult.map(product => (
            <ProductList
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
              tags={product.tags}
            />
          ))
        ) : (
          <div className="center-screen">
            <p>검색한 제품이 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchResult
