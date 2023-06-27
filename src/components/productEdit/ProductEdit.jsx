import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { singleProductSearch } from '../../store/UserAPI'
import styled from 'styled-components'
import TextItem from './components/TextItem'
import ArrItem from './components/ArrItem'
import ImgItem from './components/ImgItem'
import IsItem from './components/IsItem'
import { deleteProduct, updateProduct } from '../../store/AdminAPI'
import Loading from '../Loading'

const ProductEdit = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    singleProductSearch(productId).then(res => {
      setProduct(res)
    })
    setLoading(false)
  }, [])

  const upData = async newData => {
    setLoading(true)
    await updateProduct(product.id, newData)
    setLoading(false)
  }

  async function remove() {
    setLoading(true)
    await deleteProduct(product.id)
    setLoading(false)
    location.replace('/admin/products')
  }

  // console.log(product)

  return (
    <Wrapper>
      {loading ? <Loading /> : null}
      {product.id}
      <ImgItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'thumbnail'}
      />
      <TextItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'title'}
      />
      <TextItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'description'}
      />
      <TextItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'price'}
      />
      <ArrItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'tags'}
      />

      <ImgItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'photo'}
      />
      <IsItem
        product={product}
        setProduct={setProduct}
        upData={upData}
        item={'isSoldOut'}
      />

      <button onClick={remove}>삭제</button>
    </Wrapper>
  )
}

export default ProductEdit

const Wrapper = styled.div`
  padding-top: 70px;
  div {
    margin-bottom: 20px;
  }
`
