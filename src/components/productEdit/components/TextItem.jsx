import React, { useState } from 'react'
import styled from 'styled-components'

const TextItem = ({ product, setProduct, upData, item }) => {
  const [test, setTest] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Wrapper>
      <p
        className={isEdit ? 'hide' : 'input'}
        onClick={() => {
          setIsEdit(!isEdit)
        }}>
        {product[item]}
      </p>

      <div className={isEdit ? 'input' : 'hide'}>
        <input
          type="text"
          defaultValue={product[item]}
          onChange={e => {
            if (item === 'price') {
              const { value } = e.target
              const onlyNumber = value.replace(/[^0-9]/g, '')
              setTest(onlyNumber)
            } else {
              setTest(e.target.value)
            }
            console.log(test)
          }}
        />
        <button
          type="submit"
          onClick={() => {
            if (test === '') {
              setIsEdit(!isEdit)
              return
            }
            const newProduct = { ...product, [item]: test }
            setProduct(newProduct)
            upData({ [item]: test })
            setIsEdit(!isEdit)
          }}>
          변경
        </button>
      </div>
    </Wrapper>
  )
}

export default TextItem

const Wrapper = styled.div`
  width: 400px;
  input {
    width: 300px;
    height: 30px;
    border: none;
    background-color: #9e9e9e;
    border-radius: 5px;
    padding: 10px;
    display: block;
    margin-bottom: 5px;
    font-size: 18px;
    color: #fff;
  }
  .hide {
    display: none;
  }
`
