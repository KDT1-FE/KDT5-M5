import React, { useState } from 'react'
import Tag from './Tag'
import { addProduct } from '../../store/AdminAPI'
import styled from 'styled-components'

const AddProduct = () => {
  //제품 추가
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [detail, setDetail] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [thumbnail, setThumbnail] = useState('')
  const [detailImg, setDetailImg] = useState('')

  const productObj = {
    title: product,
    price: Number.parseInt(price),
    description: detail,
    tags: tags,
    thumbnailBase64: thumbnail,
    photoBase64: detailImg,
    discountRate: null
  }

  async function newProductPush(event) {
    event.preventDefault()

    const res = await addProduct(productObj)
    // console.log()
    if (res.id) {
      alert('제품이 추가되었습니다')
      location.reload()
    }
  }

  function uploadImg(event, setState, imgEl) {
    const files = event.target.files
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', e => {
        setState(e.target.result)
        document.getElementById(imgEl).src = e.target.result
      })
    }
  }

  function addTags(tags, tag) {
    const newTags = [...tags, tag]

    setTags(newTags)
    const tagInputEl = document.getElementsByClassName('tagInputEl')
    tagInputEl.value = ''
  }

  function removeTag(tags, tag) {
    const newTags = tags.filter(t => t !== tag)
    setTags(newTags)
  }

  const tagList = tags.map((tag, tagNum) => {
    return (
      <Tag
        tags={tags}
        tag={tag}
        onClick={removeTag}
        key={tagNum}
      />
    )
  })

  return (
    <Warpper>
      <div className="background">
        <h1>AddProduct</h1>

        <form onSubmit={newProductPush}>
          <SubWarpper>
            <p>제품이름</p>
            <input
              type="text"
              onChange={e => setProduct(e.target.value)}
            />
          </SubWarpper>
          <SubWarpper>
            <p>제품가격</p>
            <input
              type="text"
              onChange={e => setPrice(e.target.value)}
            />
          </SubWarpper>
          <SubWarpper>
            <p>제품 상세 설명</p>
            <input
              type="text"
              onChange={e => setDetail(e.target.value)}
            />
          </SubWarpper>
          <SubWarpper>
            <p>제품 태그</p>
            <input
              className="tagInputEl"
              type="text"
              value={tag}
              onChange={e => setTag(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (tag === '') {
                  return
                }
                addTags(tags, tag)
                setTag('')
              }}>
              추가
            </button>
            <div>
              <ul>{tagList}</ul>
            </div>
          </SubWarpper>
          <SubWarpper>
            <p>제품 썸네일</p>
            <input
              type="file"
              onChange={e => uploadImg(e, setThumbnail, 'Thumbnail')}
            />
            <img id="Thumbnail" />
          </SubWarpper>
          <SubWarpper>
            <p>제품 상세 사진</p>
            <input
              type="file"
              onChange={e => uploadImg(e, setDetailImg, 'DetailImg')}
            />
            <img id="DetailImg" />
          </SubWarpper>

          <button type="submit">등록</button>
        </form>
      </div>
    </Warpper>
  )
}

const Warpper = styled.div`
  background-color: #5f5f5f;
  .background {
    background-color: #2e2e2e;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 70px;
    padding-bottom: 70px;
    color: #fff;
  }

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  form img {
    width: 300px;
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

  button:hover {
    background-color: #77af9c;
  }
`

const SubWarpper = styled.div`
  background-color: #5f5f5f;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;

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

  p {
    margin-bottom: 20px;
  }
`

export default AddProduct
