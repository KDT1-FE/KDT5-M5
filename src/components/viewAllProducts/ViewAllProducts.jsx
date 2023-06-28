import React, { useEffect, useState } from 'react'
// import './viewAllProducts.css'
import { getProducts } from '../../store/AdminAPI'
import styled from 'styled-components'

const ViewAllProducts = () => {
  //////////////////////////////////////////
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getProducts().then(res => {
      setAllProducts(res)
    })
  }, [])

  const Products = allProducts.map(product => {
    return (
      <ProductWrapper
        key={product.id}
        onClick={() => (window.location.href = `./product/${product.id}`)}>
        <div className="item">
          <img
            src={product.thumbnail}
            alt="thumbnail"
          />
          <p className="title">title : {product.title}</p>
          <p className="id">ID : {product.id}</p>
        </div>
      </ProductWrapper>
    )
  })

  return (
    <Wrapper>
      <ul>{Products}</ul>
    </Wrapper>
  )
}

export default ViewAllProducts

const Wrapper = styled.div`
  padding-top: 70px;
  max-width: 1200px;
  margin: 0 auto;
`

const ProductWrapper = styled.li`
  width: 100%;
  img {
    width: 50px;
    margin-right: 10px;
  }
  p {
    width: 100%;
    margin-right: 10px;
    white-space: nowrap;
  }
  .title {
    overflow: hidden;
  }
  .id {
    width: 350px;
  }

  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    padding: 5px;
  }

  .item:hover {
    border: 1px solid black;
    cursor: pointer;
  }
`
