import React from 'react'
import styled from 'styled-components'

const ImgItem = ({ product, setProduct, upData, item }) => {
  function upImg(event) {
    const files = event.target.files

    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', e => {
        const newProduct = { ...product, [item]: e.target.result }
        setProduct(newProduct)
        const key = item + 'Base64'
        upData({ [key]: e.target.result })
      })
    }
  }
  return (
    <Wrapper>
      <img
        src={product[item]}
        alt={item}
        onClick={() => {
          document.getElementById(item).click()
        }}
      />
      <input
        id={item}
        type="file"
        onChange={e => upImg(e)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 400px;
  img {
    width: 100%;
  }
  input {
    display: none;
  }
`

export default ImgItem
