import React, { useState } from 'react'
import './AddProduct.css'
import Tag from './Tag'
import { addProduct } from '../../store/AdminAPI'

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
    console.log(productObj)
    const res = await addProduct(productObj)
    console.log(res)
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
    <div className="add-product">
      AddProduct
      <form onSubmit={newProductPush}>
        <div>제품이름</div>
        <input
          type="text"
          onChange={e => setProduct(e.target.value)}
        />
        <br />
        <div> 제품가격</div>
        <input
          type="text"
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        <div> 제품 상세 설명</div>
        <input
          type="text"
          onChange={e => setDetail(e.target.value)}
        />
        <br />
        <div> 제품 태그</div>
        <input
          className="tagInputEl"
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            addTags(tags, tag)
            setTag('')
          }}>
          추가
        </button>
        <div>
          <ul>{tagList}</ul>
        </div>
        <br />
        <div> 제품 썸네일</div>
        <input
          type="file"
          onChange={e => uploadImg(e, setThumbnail, 'Thumbnail')}
        />
        <img id="Thumbnail" />
        <br />
        <div> 제품 상세 사진</div>
        <input
          type="file"
          onChange={e => uploadImg(e, setDetailImg, 'DetailImg')}
        />
        <img id="DetailImg" />
        <br />
        {/* 제품 할인율 추후 구현 */}
        {/* <input type="text" /> */}
        <button type="submit">등록</button>
      </form>
    </div>
  )
}

export default AddProduct
