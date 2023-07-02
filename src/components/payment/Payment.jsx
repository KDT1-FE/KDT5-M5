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
import {
  nh_bank,
  kb_bank,
  k_bank,
  shinhan_bank,
  woori_bank,
  kakao_bank,
  hana_bank
} from './CardImg'

const Payment = () => {
  const { amount, totalPrice, products, setProducts } = useStore()
  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [showPostcodeModal, setShowPostcodeModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accountList, setAccountList] = useState([])
  const [recipientName, setRecipientName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [selectAccount, setSelectAccount] = useState('')
  const directMessage = useRef()

  const bankImgs = {
    하나은행: hana_bank,
    케이뱅크: k_bank,
    카카오뱅크: kakao_bank,
    우리은행: woori_bank,
    신한은행: shinhan_bank,
    NH농협은행: nh_bank,
    KB국민은행: kb_bank
  }

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
        alert('새로고침을 하면 값이 초기화되어 결제가 진행되지않습니다.')
        const productData = await Promise.all(
          productIds.map(async productId => {
            const product = await singleProductSearch(productId)
            const matchedProduct = products.find(p => p.id === productId)
            if (matchedProduct) {
              product.amount = matchedProduct.amount
            }
            return product
          })
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
    phoneNumber,
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

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('productInCart'))
    setProducts(storage)
  }, [])

  const validateForm = () => {
    if (
      recipientName.trim() !== '' &&
      phoneNumber.trim() !== '' &&
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
    return <p className="default-info">결제 상품이 없습니다.</p>
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

        for (const product of products) {
          const paymentAmount = amount || product.amount

          for (let i = 0; i < paymentAmount; i++) {
            const buy = await buyProducts(product.id, selectAccount)
            if (!buy) {
              isSuccess = false
              break
            }
          }
          if (!isSuccess) {
            break
          }
        }

        if (isSuccess) {
          localStorage.removeItem('productInCart')
          alert(`제품을 성공적으로 구매했습니다.`)
        } else {
          alert('제품 구매에 실패했습니다.')
        }
      } else {
        alert('제품이 존재하지 않습니다.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeliveryMessageChange = e => {
    setDeliveryMessage(e.target.value)
  }

  const handleRecipientNameChange = e => {
    const input = e.target.value
    const filteredInput = input.replace(/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]/g, '')

    if (input !== filteredInput) {
      e.target.value = filteredInput
      alert('문자만 입력해주세요.')
    }
    setRecipientName(filteredInput)
  }

  const handlePhoneNumberChange = e => {
    const input = e.target.value
    const numericInput = input.replace(/\D/g, '')
    if (input !== numericInput) {
      alert('숫자만 입력해주세요.')
    }
    setPhoneNumber(numericInput)
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
          const productTotalPrice =
            product.price * (amount ? amount : product.amount)

          return (
            <tr key={product.id}>
              <td className="product-details">
                <div className="product-image">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <div className="product-title">
                  <h3>{product.title}</h3>
                </div>
              </td>
              <td className="product-price">
                {product.price.toLocaleString()} 원
              </td>
              <td className="product-amount">
                {amount ? amount : product.amount} 개
              </td>
              <td className="product-totalPrice">
                {productTotalPrice.toLocaleString()} 원
              </td>
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
            <tr className="product-info--detail">
              <th className="product-info--title">상품 정보</th>
              <th className="product-info--price">판매 가격</th>
              <th className="product-info--amount">구매 수량</th>
              <th className="product-info--total">결제 금액</th>
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
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
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
                  {bankImgs[account.bankName]}
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
