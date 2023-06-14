import React from 'react'

const productDetail = () => {
  return (
    <>
      <div className="productDetail">
        <section className="product_img">
          <img
            src={thumbnail}
            alt={title}
          />
        </section>
        <div className="product_info">
          <div className="title">${title}</div>
          <div className="info">${description}</div>
          <div className="count"></div>
          <div className="total_price">${price.toLocalString()} 원</div>
          <div className="product_btn">
            <button>장바구니</button>
            <button>구매하기</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default productDetail
