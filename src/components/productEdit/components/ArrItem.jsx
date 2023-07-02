import React, { useState } from 'react'
import styled from 'styled-components'

const ArrItem = ({ product, setProduct, upData, item }) => {
  const [newTag, setNewTag] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const removeTag = removeTag => {
    const newTags = product.tags.filter(tag => removeTag !== tag)
    upData({ [item]: newTags })
    const newProduct = { ...product, [item]: newTags }
    setProduct(newProduct)
  }

  const addTag = addTag => {
    if (addTag === '') {
      return
    }
    upData({ [item]: [...product.tags, addTag] })
    const newProduct = { ...product, [item]: [...product.tags, addTag] }
    setProduct(newProduct)
    setNewTag('')
  }

  return (
    <Wrapper onClick={() => setIsEdit(true)}>
      <ul>
        {product.tags
          ? product.tags.map((tag, index) => {
              return (
                <li key={index}>
                  #{tag}
                  <button
                    className="tag-remove"
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      removeTag(tag)
                    }}>
                    삭제
                  </button>
                </li>
              )
            })
          : '태그가 없습니다.'}
      </ul>
      <div className={isEdit ? 'input' : 'hide'}>
        <input
          type="text"
          value={newTag}
          onChange={e => {
            setNewTag(e.target.value)
          }}
        />
        <button
          onClick={e => {
            addTag(newTag)

            e.stopPropagation()
            setIsEdit(false)
          }}>
          태그 추가
        </button>
      </div>
    </Wrapper>
  )
}

export default ArrItem

const Wrapper = styled.div`
  width: 400px;

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

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
  .tag-remove {
    border: 0;
    background: #7e7e7e;
    color: #fff;
    text-align: center;
    outline: none;
    border-radius: 5px;
  }

  .hide {
    display: none;
  }
`
