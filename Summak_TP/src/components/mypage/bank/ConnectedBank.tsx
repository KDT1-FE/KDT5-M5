// import BankBtn from '@/components/common/BankBtn'
import React, { useEffect, useState } from 'react'
import styles from './ConnectedBank.module.scss'
import Modal from '@/components/common/Modal'
import getBankLogo from '@/utils/getBankLogo'
import { ACCOUNT_NUMBER_REGEX, PHONE_NUMBER_REGEX, PHONE_NUMBER_FORMAT_REGEX } from '@/utils/constants'
import { postConnectAccount } from '@/apis/payment/account'
import { AccountConnectionRequest } from '@/types/account'

//계좌 연결
// curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account
//   \ -X 'POST'
//   \ -H 'Authorization: Bearer <accessToken>'

interface EnabledBank {
  name: string // 은행 이름
  code: string // 은행 코드
  digits: number[] // 은행 계좌 자릿수
  disabled: boolean // 사용자가 추가한 계좌 여부
}

export default function BankSelect({ name, code, digits, disabled }: EnabledBank) {
  const bankLogo = getBankLogo(name)
  const accessToken = localStorage.getItem('token') || ''
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [accountNum, setAccountNum] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [inputErrorMsg, setInputErrorMsg] = useState('')
  const [inputNumErrorMsg, setInputNumErrorMsg] = useState('')

  const [BankConnectData, setBankConnectData] = useState<AccountConnectionRequest>({
    bankCode: '',
    accountNumber: '',
    phoneNumber: '',
    signature: true
  })
  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  // 전화번호 양식 설정
  const inputHandlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const phoneNumber = e.target.value
    // 0. 입력된 숫자만 추출하여 문자열 생성
    // 1. PHONE_NUMBER_REGEX는 전화번호에서 숫자 이외의 문자를 찾기 위한 정규식 패턴
    // 2. 문자들은 '제거'하여 숫자만을 추출
    const inputDigitsNum = phoneNumber.replace(PHONE_NUMBER_REGEX, '')

    // 0. 문자열 형식 설정
    const formateDigitsNum = inputDigitsNum.slice(0, 11).replace(PHONE_NUMBER_FORMAT_REGEX, '$1-$2-$3')
    setPhoneNum(formateDigitsNum)
  }
  // 계좌번호 양식 설정
  const inputHandleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const accountNum = e.target.value
    const inputAccountNum = accountNum.replace(ACCOUNT_NUMBER_REGEX, '')
    let formateDigitsNum = ''
    let currentIndex = 0

    for (let i = 0; i < digits.length; i++) {
      // digits 배열의 인덱스를 변수로 설정
      // 'currentIndex'부터 'currentIndex+digitCount'범위까지의 부분 문자열 추출
      const digitCount = digits[i]
      const indexDigit = inputAccountNum.slice(currentIndex, currentIndex + digitCount)
      if (indexDigit.length > 0) {
        formateDigitsNum += indexDigit
        // 현재 인덱스(i)가 bankDigits 배열의 마지막 인덱스가 아닌 경우, -를 추가하여 포맷팅합니다.
        if (i < digits.length - 1) {
          formateDigitsNum += '-'
        }
        currentIndex += digitCount
      }
    }
    setAccountNum(formateDigitsNum)
  }

  // postConnectAccount API의 요청 데이터 requestbody 데이터 타입
  const connectAccountData = (data: AccountConnectionRequest) => {
    setBankConnectData(data)
  }
  // postConnectAccount API 사용에 필요한 requestbody 데이터
  useEffect(() => {
    connectAccountData({
      bankCode: code, // 연결할 은행 코드 (필수!)
      accountNumber: accountNum.replace(/-/g, ''), // 연결할 계좌번호 (필수!)
      phoneNumber: phoneNum.replace(/-/g, ''), // 사용자 전화번호 (필수!)
      signature: true // 사용자 서명 (필수!)
    })
  }, [phoneNum, accountNum])

  // 계좌 등록 이벤트 핸들러
  const connetAccountHandler = async () => {
    try {
      await postConnectAccount(accessToken, BankConnectData)
      setIsModalOpen(false)
      alert('계좌가 정상적으로 등록되었습니다!')
    } catch (error) {
      console.error('API POST 호출 실패 : ', error)
    }
  }

  return (
    <>
      <button className={styles.btn} onClick={handleModalOpen} disabled={disabled}>
        <div className={styles.container}>
          <div className={styles.bank}>
            <div className={styles.bankLogo}>
              <img src={bankLogo} alt="logo" />
            </div>
            <div className={styles.bankInfo}>
              <span className={styles.bankName}>{name}</span>
              <span className={styles.bankId}>{code}</span>
            </div>
          </div>
        </div>
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
          <div className={styles.modalContainer}>
            <div className={styles.textContainer}>
              <img className={styles.bankLogo} src={bankLogo} alt="" />
              <h1 className={styles.bankName}>{name}</h1>
            </div>
            <hr className={styles.line} />
            <ol className={styles.listsContainer}>
              <li className={styles.list}>
                <label className={styles.label} htmlFor="account">
                  계좌번호
                </label>
                <form className={styles.inputForm}>
                  <input
                    id="account"
                    className={`${styles.inputTag} ${styles.displayName}`}
                    type="text"
                    name="account"
                    value={accountNum}
                    onChange={inputHandleAccount}
                    placeholder="계좌번호를 입력해주세요."
                    required
                  />
                  <span className={styles.errorMsg}>{inputNumErrorMsg}</span>
                </form>
              </li>
              <li className={styles.list}>
                <label className={styles.label} htmlFor="tel">
                  전화번호
                </label>
                <form className={styles.inputForm}>
                  <input
                    id="tel"
                    className={`${styles.inputTag} ${styles.tel}`}
                    type="text"
                    name="tel"
                    value={phoneNum}
                    onChange={inputHandlePhone}
                    placeholder="전화번호를 입력해주세요."
                    required
                  />
                  <span className={styles.errorMsg}>{inputErrorMsg}</span>
                </form>
              </li>
            </ol>
            <hr className={styles.line} />
            <div className={styles.btnContainer}>
              <button type="reset" onClick={handleModalClose} className={`${styles.btnTag} ${styles.cancel}`}>
                취소
              </button>
              <button
                type="button"
                onClick={connetAccountHandler}
                className={`${styles.btnTag} ${styles.enrolled}`}
                disabled={disabledBtn}
              >
                등록
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
