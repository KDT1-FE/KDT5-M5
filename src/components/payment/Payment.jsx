import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { singleProductSearch, authenticate } from '../../store/UserAPI'
import { getAccounts } from '../../store/AccountAPI'
import { buyProducts } from '../../store/ProductTransactions'
import './payment.css'
import DaumPostcode from 'react-daum-postcode'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useStore } from '../../store/store'

const Payment = () => {
  const { amount, totalPrice, products, setProducts } = useStore()
  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [showPostcodeModal, setShowPostcodeModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accountList, setAccountList] = useState([])
  const [recipientName, setRecipientName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [selectAccount, setSelectAccount] = useState('')
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
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productIds = products.map(product => product.id)
        const productData = await Promise.all(
          productIds.map(productId => singleProductSearch(productId))
        )
        setProducts(productData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [])

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
    validateForm()
  }, [
    recipientName,
    contactNumber,
    address,
    deliveryMessage,
    addressDetail,
    directMessage
  ])

  useEffect(() => {
    const fetchAccountID = async () => {
      try {
        const accounts = await getAccounts()
        setAccountList(accounts)
        if (accounts.length > 0) {
          setSelectAccount(accounts[0].id)
        }
      } catch (error) {
        setAccountList([])
        console.error('계좌를 가져오는 중 오류가 발생했습니다:', error)
      }
    }

    fetchAccountID()
  }, [])

  const validateForm = () => {
    if (
      recipientName.trim() !== '' &&
      contactNumber.trim() !== '' &&
      address.trim() !== '' &&
      addressDetail.trim() !== '' &&
      deliveryMessage.trim() !== ''
    ) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  if (!products || products.length === 0) {
    return <p>장바구니에 상품이 없습니다.</p>
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const handleBuyProduct = async () => {
    try {
      if (products) {
        let isSuccess = true
        for (const productId of products.map(product => product.id)) {
          const buy = await buyProducts(productId, selectAccount)
          if (!buy) {
            isSuccess = false
            break
          }
        }
        if (isSuccess) {
          alert('제품을 성공적으로 구매했습니다.')
        } else {
          alert('제품 구매에 실패했습니다.')
        }
      } else {
        alert('제품이 없습니다.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeliveryMessageChange = e => {
    setDeliveryMessage(e.target.value)
  }

  const handleRecipientNameChange = e => {
    setRecipientName(e.target.value)
  }

  const handleContactNumberChange = e => {
    setContactNumber(e.target.value)
  }

  const handleAddressDetailChange = e => {
    setAddressDetail(e.target.value)
  }

  const handleAddressSearch = () => {
    setShowPostcodeModal(true)
  }

  const onCompletePost = data => {
    setShowPostcodeModal(false)
    setPostalCode(data.zonecode)
    setAddress(data.address)
  }

  const renderProductTable = () => {
    return (
      <tbody>
        {products.map(product => {
          const productTotalPrice = product.price * amount

          return (
            <tr key={product.id}>
              <td className="product-details">
                <div className="product-image">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <div>
                  <h3>{product.title}</h3>
                </div>
              </td>
              <td>{product.price.toLocaleString()} 원</td>
              <td>{amount} 개</td>
              <td>{productTotalPrice.toLocaleString()} 원</td>
            </tr>
          )
        })}
      </tbody>
    )
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
          {renderProductTable()}
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
                  onChange={handleRecipientNameChange}
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
                  onChange={handleContactNumberChange}
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
                  onChange={handleAddressDetailChange}
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
          {accountList.length > 0 ? (
            <Slider
              {...settings}
              afterChange={index => {
                const selectedAccount = accountList[index]
                if (selectedAccount) {
                  setSelectAccount(selectedAccount.id)
                }
              }}>
              {accountList.map(account => (
                <div key={account.id}>
                  <img
                    src={`../../../public/card/${account.bankName}.png`}
                    alt={account.bankName}
                  />
                  <div className="account-balace">
                    잔액 : {account.balance.toLocaleString()} 원
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Link
              to="/mypage/paymentmethod"
              className="payment__add-link">
              <button className="payment__add-btn">결제 수단 추가</button>
            </Link>
          )}
        </div>
      </div>
      <div className="payment__change--info">
        결제 수단을 변경하시려면 좌우로 드래그 해주세요.
      </div>
      <Link
        to="/mypage/getOrderList"
        className={`paymnet__confirm--link${isFormValid ? '' : ' disabled'}`}>
        <button
          onClick={handleBuyProduct}
          className={`paymnet__confirm${!isFormValid ? ' disabled' : ''}`}
          disabled={!isFormValid}>
          총 {totalPrice.toLocaleString()} 원 결제하기
        </button>
      </Link>
    </div>
  )
}

export default Payment
