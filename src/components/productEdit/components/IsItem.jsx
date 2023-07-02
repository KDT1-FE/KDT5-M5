import React from 'react'
import styled from 'styled-components'

const IsItem = ({ product, setProduct, upData, item }) => {
  return (
    <Wrapper>
      제품 매진 :
      <input
        type="checkbox"
        defaultChecked={product[item]}
        onClick={() => {
          upData({ [item]: !product[item] })
          const newProduct = { ...product, [item]: !product[item] }
          setProduct(newProduct)
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 400px;
`

export default IsItem
