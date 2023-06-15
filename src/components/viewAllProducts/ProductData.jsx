import React, { useState } from 'react'
import noImg from '../../img/noImg.png'

const ProductData = ({ item, data, property, productId, onClick }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [newData, setNewData] = useState(data)

  //태그 추가
  //이미지 변경

  function editProductData() {
    setIsEdit(true)
  }

  const productObj = {}

  function doneProductData(event) {
    event.preventDefault()
    console.log(newData)

    productObj[property] = newData
    onClick(productId, productObj)
    setNewData('')

    setIsEdit(false)
  }

  function contentEl() {
    if (item === '태그') {
      //   if (data === 'test') {
      //     onClick(productId, { tags: ['test', 'TEST'] })
      //   }
      if (data.length === 0) {
        return (
          <>
            <div
              className={`content ${isEdit ? 'hide' : ''}`}
              onClick={editProductData}>
              태그가 없습니다
            </div>

            <div className={`edit-content ${isEdit ? '' : 'hide'}`}>
              <form onSubmit={doneProductData}>
                <input
                  type="text"
                  defaultValue={newData}
                  onChange={e => {
                    setNewData([e.target.value])
                  }}
                />
                <button>추가</button>
              </form>
            </div>
          </>
        )
      } else {
        console.log(data)
        const tags = data.map((tag, tagNum) => {
          const newTags = data.filter(testTag => testTag !== tag)
          return (
            <div key={tagNum}>
              #{tag}
              <button
                type="button"
                onClick={() => {
                  onClick(productId, { tags: newTags })
                  setNewData('')
                }}>
                x
              </button>
            </div>
          )
        })
        return (
          <div className="tag">
            {tags}
            <form onSubmit={doneProductData}>
              <input
                type="text"
                defaultValue={''}
                onChange={e => {
                  setNewData([...data, e.target.value])
                }}
              />
              <button>추가</button>
            </form>
          </div>
        )
      }
    } else if (item === '썸네일 이미지' || item === '상세 이미지') {
      function imgEl() {
        if (data) {
          return (
            <img
              src={data}
              alt={'상품이미지'}
              onClick={onClick}
            />
          )
        } else {
          return (
            <img
              src={noImg}
              alt={'상품이미지'}
              onClick={onClick}
            />
          )
        }
      }
      return imgEl()
    } else if (item === '제품 매진 여부') {
      if (data) {
        return (
          <div>
            <input
              type="checkbox"
              defaultChecked={true}
              onClick={() => onClick(productId, { isSoldOut: false })}
            />
          </div>
        )
      } else {
        return (
          <div>
            <input
              type="checkbox"
              defaultChecked={false}
              onClick={() => onClick(productId, { isSoldOut: true })}
            />
          </div>
        )
      }
    } else {
      return (
        <>
          <div
            className={`content ${isEdit ? 'hide' : ''}`}
            onClick={editProductData}>
            {data ? data : '데이터가 없습니다'}
          </div>

          <div className={`edit-content ${isEdit ? '' : 'hide'}`}>
            <form onSubmit={doneProductData}>
              <input
                type="text"
                defaultValue={newData}
                onChange={e => setNewData(e.target.value)}
              />
              <button>변경</button>
            </form>
          </div>
        </>
      )
    }
  }

  return (
    <div className="item">
      <div className="item-title">{item}</div>
      {contentEl()}
    </div>
  )
}

export default ProductData
