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
      <div className="background">
        <h1>AllProducts</h1>
        <ul>{Products}</ul>
      </div>
    </Wrapper>
  )
}

export default ViewAllProducts

const Wrapper = styled.div`
  background-color: #5f5f5f;
  .background {
    background-color: #2e2e2e;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 70px;
    padding-bottom: 70px;
    color: #fff;
    min-height: calc(100vh - 140px);
  }

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`

const ProductWrapper = styled.li`
  margin: 10px;
  background-color: #5f5f5f;
  border-radius: 5px;

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
    box-sizing: border-box;
    border: 2px solid transparent;
  }

  .item:hover {
    border: 2px solid #fff;
    cursor: pointer;
    box-sizing: border-box;
  }
`
