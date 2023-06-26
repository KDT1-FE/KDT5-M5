import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { singleProductSearch, authenticate } from '../../store/UserAPI'
import { getAccounts } from '../../store/AccountAPI'
import './payment.css'
import DaumPostcode from 'react-daum-postcode'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useStore } from '../../store/store'

const Payment = () => {
  const { amount, setAmount, totalPrice, setTotalPrice } = useStore()
  const { category, productId } = useParams()
  const [product, setProduct] = useState(null)
  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [showPostcodeModal, setShowPostcodeModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accountList, setAccountList] = useState([])
  const directMessage = useRef()

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const checkLoginStatus = async () => {
    try {
      const user = await authenticate()
      if (user) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await singleProductSearch(productId)
        setProduct(productData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [productId])

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await getAccounts()
        setAccountList(accounts)
      } catch (error) {
        setAccountList([])
        console.error('계좌를 가져오는 중 오류가 발생했습니다:', error)
      }
    }

    fetchAccounts()
  }, [])

  useEffect(() => {
    if (deliveryMessage === '직접 입력') {
      directMessage.current.focus()
    }
  }, [deliveryMessage])

  if (!product) {
    return <p>제품 정보를 가져오는 중 입니다...</p>
  }

  if (product.id !== productId) {
    return <p>제품을 찾을 수가 없습니다.</p>
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  }

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
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <div>
                  <h3>{product.title}</h3>
                  <p>{category}</p>
                </div>
              </td>
              <td>{product.price} 원</td>
              <td>{amount} 개</td>
              <td>{totalPrice} 원</td>
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
                <input
                  className="recipient_name"
                  type="text"
                  placeholder="성함"
                />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                <input
                  className="contact_number"
                  type="text"
                  placeholder="연락처"
                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <div className="address-wrapper">
                  <input
                    className="address"
                    type="text"
                    value={`${address} ${postalCode}`}
                    readOnly
                  />
                  <button
                    className="search_address"
                    onClick={handleAddressSearch}>
                    우편번호 찾기
                  </button>
                </div>
                <input
                  className="detail_address"
                  type="text"
                  placeholder="상세 정보"
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
                    예약 시간에 배송해주세요.
                  </option>
                  <option value="부재 시 경비실에 맡겨주세요">
                    부재 시 경비실에 맡겨주세요.
                  </option>
                  <option value="배송 전에 미리 연락주세요">
                    배송 전에 미리 연락주세요.
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
                    ref={directMessage}
                    className="direct"
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
        <div className="modal-wrapper">
          <div className="modal">
            <DaumPostcode
              onComplete={onCompletePost}
              autoClose
              animation
            />
            <button
              className="close-modal"
              onClick={() => setShowPostcodeModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="payment-method--container">
        <h2> 결제수단 선택</h2>
        <div className="payment-method">
          <Slider {...settings}>
            {accountList.map(account => (
              <div key={account.id}>
                <img
                  src={`../../../public/card/${account.bankName}.png`}
                  alt={account.bankName}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="payment__change--info">
        결제 수단을 변경하시려면 좌우로 드래그 해주세요.
      </div>
      <Link
        to="/mypage"
        className="paymnet__confirm--link">
        {/* 카드 결제 수단 선택하지 않거나 결제 수단이 없으면 비활성화 로직
        추후에 추가 */}
        <button className="paymnet__confirm">
          총 {totalPrice.toLocaleString()} 원 결제하기
        </button>
      </Link>
    </div>
  )
}

export default Payment
