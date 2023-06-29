import React, { useState, useEffect } from 'react'
import {
  getBanks,
  getAccounts,
  connectAccounts,
  deleteAccount
} from '../../store/AccountAPI'
import './PaymentMethod.css'

const PaymentMethod = () => {
  const [showModal, setShowModal] = useState(false)
  const [banks, setBanks] = useState([])
  const [selectedBank, setSelectedBank] = useState('')
  const [digitsSum, setDigitsSum] = useState(0)
  const [placeholderText, setPlaceholderText] =
    useState('추가할 은행을 선택해주세요.')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountList, setAccountList] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [signature, setSignature] = useState(false)

  const handleAddAccount = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedBank('')
    setDigitsSum(0)
    setAccountNumber('')
    setPhoneNumber('')
    setSignature(false)
    setPlaceholderText('추가할 은행을 선택해주세요.')
  }

  const handleAccountDigits = () => {
    const selectedBankObj = banks.find(bank => bank.code === selectedBank)
    if (selectedBankObj) {
      const sum = selectedBankObj.digits.reduce((acc, digit) => acc + digit, 0)
      setDigitsSum(sum)
      setPlaceholderText(`'-'을 제외한 ${sum}자리 숫자만 입력해주세요.`)
    } else {
      setDigitsSum(0)
      setPlaceholderText('추가할 은행을 선택해주세요.')
    }
  }

  const handleAccountNumberChange = e => {
    const input = e.target.value
    const numericInput = input.replace(/\D/g, '')
    if (input !== numericInput) {
      alert('숫자만 입력해주세요.')
    }
    setAccountNumber(numericInput)
  }

  const handlePhoneNumber = e => {
    const input = e.target.value
    const numericInput = input.replace(/\D/g, '')
    if (input !== numericInput) {
      alert('숫자만 입력해주세요.')
    }
    setPhoneNumber(numericInput)
  }

  const handleAddButtonClick = async () => {
    if (selectedBank && accountNumber && phoneNumber && signature) {
      try {
        const bankAccount = {
          bankCode: selectedBank,
          accountNumber: accountNumber,
          phoneNumber: phoneNumber,
          signature: signature
        }

        await connectAccounts(bankAccount)
        const updatedAccounts = await getAccounts()
        setAccountList(updatedAccounts)
        handleCloseModal()
      } catch (error) {
        console.error('계좌 추가에 실패했습니다.:', error)
      }
    } else {
      alert('사용하실 은행과 계좌 번호, 연락처를 입력해주세요.')
    }
  }

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bankList = await getBanks()
        setBanks(bankList)
      } catch (error) {
        console.error('은행 목록을 불러오는데 실패했습니다:', error)
      }
    }

    fetchBanks()
  }, [])

  useEffect(() => {
    handleAccountDigits()
  }, [selectedBank])

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

  const handleDelete = async (accountId, signature) => {
    const confirmed = window.confirm('계정을 삭제하시겠습니까?')
    if (confirmed) {
      try {
        const responseValue = await deleteAccount(accountId, true)
        if (responseValue === true) {
          const updatedAccounts = await getAccounts()
          setAccountList(updatedAccounts)
        } else {
          console.error('계정 삭제에 실패했습니다.')
        }
      } catch (error) {
        console.error('계정 삭제 중 오류가 발생했습니다:', error)
      }
    }
  }

  return (
    <section className="mypage__account">
      <div className="mypage__account--container">
        <h2>계좌 관리</h2>
        <div className="mypage__account--user">
          <p className="mypage__account--balance">
            <span className="maypage__account--total-balance">
              총 잔고 합계 :{' '}
              {accountList
                .reduce((total, account) => total + account.balance, 0)
                .toLocaleString()}{' '}
              원
            </span>
          </p>
          <ul className="account-list">
            {accountList.length > 0 ? (
              accountList.map(account => (
                <li
                  key={account.id}
                  className="account__list">
                  <div className="account__list--info">
                    <div>{account.bankName}</div>
                    <div>{account.accountNumber}</div>
                    <div>{account.balance.toLocaleString()} 원</div>
                    <button
                      onClick={() =>
                        handleDelete(
                          account.id,
                          account.accountName,
                          account.signature
                        )
                      }>
                      삭제
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="account__list">계좌를 추가해주세요.</li>
            )}
          </ul>

          <button
            className="create__account--btn"
            onClick={handleAddAccount}>
            계좌 추가
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form className="form">
              <select
                name="bank"
                id="bank"
                value={selectedBank}
                onChange={e => setSelectedBank(e.target.value)}>
                <option value="">-- 선택 --</option>
                {banks.map(bank => (
                  <option
                    key={bank.name}
                    value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
              <label>
                <span>계좌 번호</span>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  placeholder={placeholderText}
                />
              </label>
              <label>
                <span>연락처</span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  placeholder="'-'을 제외한 숫자를 입력해주세요."
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={signature}
                  onChange={e => setSignature(e.target.checked)}
                />{' '}
                개인정보 이용에 동의하십니까?
              </label>
            </form>
            <button
              className="modal__add-btn"
              onClick={handleAddButtonClick}>
              추가
            </button>
            <button
              className="modal__close-btn"
              onClick={handleCloseModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default PaymentMethod
