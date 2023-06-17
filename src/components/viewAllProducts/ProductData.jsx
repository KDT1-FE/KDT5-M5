import React, { useState } from 'react'
import noImg from '../../img/noImg.png'
import { singleProductSearch } from '../../store/UserAPI'
import { useEffect } from 'react'

const ProductData = ({ item, data, property, productId, onClick }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [newData, setNewData] = useState(data)
  const [dImg, setDImg] = useState('')

  useEffect(() => {
    singleProductSearch(productId).then(res => {
      setDImg(res.photo)
    })
  }, [])

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
    ///////////////// 태그 ///////////////////
    if (item === '태그') {
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
        // console.log(data)
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

      ////////////////////// 이미지 //////////////////////////
    } else if (item === '썸네일 이미지' || item === '상세 이미지') {
      function imgEl() {
        function uploadImg(event, setState, imgEl) {
          const files = event.target.files

          for (const file of files) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener('load', e => {
              setState(e.target.result)
              console.log(imgEl)

              document.getElementsByClassName(imgEl).src = e.target.result
              // setState(e.target.result)
            })
          }
        }
        if (item === '상세 이미지') {
          productObj[property + 'Base64'] = dImg

          if (dImg) {
            return (
              <>
                <img
                  className={property}
                  src={dImg}
                  alt={'상품이미지'}
                />
                <input
                  type="file"
                  onChange={e => uploadImg(e, setDImg, property)}
                />
                <button onClick={() => onClick(productId, productObj)}>
                  업로드
                </button>
              </>
            )
          } else {
            return (
              <>
                <img
                  className={property}
                  src={dImg ? dImg : noImg}
                  alt={'상품이미지'}
                />
                <input
                  type="file"
                  onChange={e => uploadImg(e, setDImg, property)}
                />
                <button onClick={() => onClick(productId, productObj)}>
                  업로드
                </button>
              </>
            )
          }

          // console.log(productObj)
        } else {
          productObj[property + 'Base64'] = newData
          // console.log(productObj)

          if (data) {
            return (
              <>
                <img
                  className={property}
                  src={newData}
                  alt={'상품이미지'}
                />
                <input
                  type="file"
                  onChange={e => uploadImg(e, setNewData, property)}
                />
                <button onClick={() => onClick(productId, productObj)}>
                  업로드
                </button>
              </>
            )
          } else {
            return (
              <>
                <img
                  className={property}
                  src={newData ? newData : noImg}
                  alt={'상품이미지'}
                />
                <input
                  type="file"
                  onChange={e => uploadImg(e, setNewData, property)}
                />
                <button onClick={() => onClick(productId, productObj)}>
                  업로드
                </button>
              </>
            )
          }
        }
      }
      return imgEl()

      //////////// 제품 매진 여부 ///////////////
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
      /////////////////// 일반 문자열 데이터 ////////////////
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
