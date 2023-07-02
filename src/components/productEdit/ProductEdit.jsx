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
      <div className="background">
        <SubWapper>
          <h1>ID : {product.id}</h1>
          <p>제품명</p>
          <TextItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'title'}
          />
          <p>썸네일</p>
          <ImgItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'thumbnail'}
          />
          <p>제품 설명</p>
          <TextItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'description'}
          />
          <p>제품 가격</p>
          <TextItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'price'}
          />
          <p>태그</p>
          <ArrItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'tags'}
          />
          <p>제품 상세 이미지</p>
          <ImgItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'photo'}
          />
          <p>제품 매진 여부</p>
          <IsItem
            product={product}
            setProduct={setProduct}
            upData={upData}
            item={'isSoldOut'}
          />
          <button onClick={remove}>제품 삭제</button>
        </SubWapper>
      </div>
    </Wrapper>
  )
}

export default ProductEdit

const Wrapper = styled.div`
  background-color: #5f5f5f;
  .background {
    background-color: #2e2e2e;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 70px;
    padding-bottom: 70px;
    color: #fff;
  }

  p {
    margin-bottom: 10px;
  }

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  button {
    height: 35px;
    border: none;
    display: inline-block;
    box-sizing: border-box;
    padding: 15px 30px;
    border-radius: 5px;
    background-color: #b7ffb5;
    text-decoration: none;
    text-align: center;
    line-height: 10px;
  }
`
const SubWapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  div {
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 10px;
    background-color: #5f5f5f;
  }
`
