import React, { useState } from 'react'
import './payment.css'
import DaumPostcode from 'react-daum-postcode'

const Payment = () => {
  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [showPostcodeModal, setShowPostcodeModal] = useState(false)

  const handleDeliveryMessageChange = e => {
    setDeliveryMessage(e.target.value)
  }

  const handleAddressSearch = () => {
    setShowPostcodeModal(true)
  }

  const onCompletePost = data => {
    setShowPostcodeModal(false)
    setPostalCode(data.zonecode)
    setAddress(data.address)
  }

  return (
    <div className="payment-contents">
      <div className="title-box">
        <h2>주문/결제</h2>
      </div>
      <div className="product-info">
        <table className="product-table">
          <thead>
            <tr>
              <th>상품 정보</th>
              <th>판매 가격</th>
              <th>구매 수량</th>
              <th>결제 금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product-details">
                <div className="product-image">
                  <img
                    src="path/to/product-image.jpg"
                    alt="Product Image"
                  />
                </div>
                <div>
                  <h3>Product Name</h3>
                </div>
              </td>
              <td>가격</td>
              <td>갯수s</td>
              <td>총금액</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="payment-info">
        <div className="container">
          <h2>배송지정보</h2>
        </div>
        <table className="recipient-info">
          <tbody>
            <tr>
              <th>받는분</th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input
                  type="text"
                  value={address}
                  readOnly
                />
                <button onClick={handleAddressSearch}>우편번호 찾기</button>
                <input
                  type="text"
                  value={postalCode}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="container">
          <h2>배송 요청사항</h2>
        </div>
        <table className="delivery-requests">
          <tbody>
            <tr>
              <th>배송메시지</th>
              <td>
                <select
                  value={deliveryMessage}
                  onChange={handleDeliveryMessageChange}>
                  <option value="">선택</option>
                  <option value="예약 시간에 배송해주세요">
                    예약 시간에 배송해주세요
                  </option>
                  <option value="부재 시 경비실에 맡겨주세요">
                    부재 시 경비실에 맡겨주세요
                  </option>
                  <option value="직접 입력">직접 입력</option>
                </select>
              </td>
            </tr>
            {deliveryMessage === '직접 입력' && (
              <tr>
                <th>직접 입력</th>
                <td>
                  <input
                    type="text"
                    placeholder="직접 입력"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPostcodeModal && (
        <DaumPostcode
          onComplete={onCompletePost}
          autoClose
          animation
        />
      )}
    </div>
  )
}

export default Payment
