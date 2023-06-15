import React, { useEffect, useState } from 'react'
import './viewAllProducts.css'
import { getProducts, updateProduct } from '../../store/AdminAPI'
import ProductData from './ProductData'

const ViewAllProducts = () => {
  const [allProducts, setAllProducts] = useState([])
  const [changedProduct, setChangedProduct] = useState('')

  useEffect(() => {
    getProducts().then(res => {
      setAllProducts(res)
    })
  }, [changedProduct])

  const Products = allProducts.map((product, productNum) => {
    async function edit(productId, updatedData) {
      const res = await updateProduct(productId, updatedData)
      setChangedProduct(res)
    }

    return (
      <li key={productNum}>
        <h2>{product.id}</h2>

        <div className="product">
          <ProductData
            item={'제품명'}
            data={product.title}
            property={'title'}
            productId={product.id}
            onClick={edit}
          />

          <ProductData
            item={'가격'}
            data={product.price}
            property={'price'}
            productId={product.id}
            onClick={edit}
          />

          <ProductData
            item={'제품 설명'}
            data={product.description}
            property={'description'}
            productId={product.id}
            onClick={edit}
          />

          <ProductData
            item={'태그'}
            data={product.tags}
            property={'tags'}
            productId={product.id}
            onClick={edit}
          />

          <ProductData
            item={'썸네일 이미지'}
            data={product.thumbnail}
            property={'thumbnail'}
            productId={product.id}
            onClick={edit}
          />

          <ProductData
            item={'상세 이미지'}
            data={product.photo}
            property={'photo'}
            productId={product.id}
            onClick={edit}
          />

          <ProductData
            item={'제품 매진 여부'}
            data={product.isSoldOut}
            property={'isSoldOut'}
            productId={product.id}
            onClick={edit}
          />
        </div>
      </li>
    )
  })

  return (
    <div className="all-products">
      ViewAllProducts
      <div>
        <ul>{Products}</ul>
      </div>
    </div>
  )
}

export default ViewAllProducts
