import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import { getValidAccounts, addAccount } from '../../apis/api'

interface Bank {
  // 선택 가능한 은행 정보
  name: string // 은행 이름
  code: string // 은행 코드
  digits: number[] // 은행 계좌 자릿수
  disabled: boolean // 사용자가 추가한 계좌 여부
}

interface AddAccountPayload {
  bankCode: string
  accountNumber: string
  phoneNumber: string
  signature: boolean
}

interface BankImageProps {
  bank: string
}

export const AccountAddModal = ({
  setisModalOpen,
}: {
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [dataLoading, setdataLoading] = useState(false)
  const [validAccounts, setvalidAccounts] = useState<Bank[]>([])
  const [selectBank, setselectBank] = useState('004')
  const [phoneNumber, setphoneNumber] = useState('')
  const [checkedAgree, setcheckedAgree] = useState(false)
  const [bankInputs, setbankInputs] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
  } as Record<string, string>)

  const handleClickCancelButton = () => {
    setisModalOpen(false)
  }
  const requestAddAccount = async (payload: AddAccountPayload) => {
    const AddAccount = await addAccount(payload)
    if (!AddAccount) {
      alert('이미 등록된 계좌 입니다.')
    }
  }

  let maxLength = 0
  switch (selectBank) {
    case '004':
      maxLength = 12
      break
    case '088':
      maxLength = 12
      break
    case '020':
      maxLength = 13
      break
    case '081':
      maxLength = 14
      break
    case '089':
      maxLength = 12
      break
    case '090':
      maxLength = 13
      break
    case '011':
      maxLength = 13
      break
  }

  const handleClickAddButton = () => {
    const accountNumber =
      bankInputs.first + bankInputs.second + bankInputs.third + bankInputs.fourth

    if (accountNumber.length === maxLength && phoneNumber.length > 10) {
      const payload = {
        bankCode: selectBank,
        accountNumber: accountNumber,
        phoneNumber: phoneNumber,
        signature: checkedAgree,
      }
      requestAddAccount(payload)
      setisModalOpen(false)
    } else {
      alert('등록할 계좌번호와 휴대폰번호를 정확하게 입력해주세요.')
    }
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setbankInputs({ ...bankInputs, [name]: value })
  }

  const handleClickBank = (code: string) => {
    setselectBank(code)
  }

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  }

  const InputPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setphoneNumber(e.target.value)
  }

  const checkedAgreeChange = () => {
    setcheckedAgree(!checkedAgree)
  }

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const data = await getValidAccounts()
        setvalidAccounts(data)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching valid account:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  return (
    <ModalBackground>
      <ModalWrap>
        <ModalHeader>
          <p>계좌등록</p>
        </ModalHeader>
        <ModalBody>
          {!dataLoading ? (
            validAccounts.length > 0 ? (
              <>
                <BankList>
                  {validAccounts.map((account: Bank, index) => (
                    <BankItem key={index} onClick={() => handleClickBank(account.code)}>
                      <BankImage
                        bank={
                          account.code === selectBank
                            ? '/assets/mypage/' + account.code + '.svg'
                            : '/assets/mypage/' + account.code + '_gray.svg'
                        }
                      ></BankImage>
                      <BankName>{account.name}</BankName>
                    </BankItem>
                  ))}
                </BankList>

                <InputList>
                  {validAccounts.map(
                    (account: Bank, index) =>
                      account.code === selectBank &&
                      validAccounts[index].digits.map((number, idx) => (
                        <input
                          key={account.code + idx}
                          name={
                            idx === 0
                              ? 'first'
                              : idx === 1
                              ? 'second'
                              : idx === 2
                              ? 'third'
                              : idx === 3
                              ? 'fourth'
                              : ''
                          }
                          maxLength={number}
                          type="text"
                          onChange={InputChange}
                          onInput={handleOnInput}
                        />
                      )),
                  )}
                </InputList>
              </>
            ) : (
              <EmptyList>등록가능한 은행이 없습니다.</EmptyList>
            )
          ) : (
            ''
          )}
        </ModalBody>
        <PhoneWrap>
          <p>휴대폰 번호</p>
          <input type="text" onChange={InputPhoneChange} onInput={handleOnInput} maxLength={11} />
        </PhoneWrap>
        <SignatureWrap>
          <p>약관에 동의하고 계좌를 등록하겠습니다.</p>
          <CheckBox type="checkbox" checked={checkedAgree} onChange={checkedAgreeChange} />
        </SignatureWrap>
        <ButtonWrap>
          <AccountCancelButton onClick={handleClickCancelButton}>취소</AccountCancelButton>
          <AccountAddButton onClick={handleClickAddButton} disabled={!checkedAgree}>
            등록
          </AccountAddButton>
        </ButtonWrap>
      </ModalWrap>
    </ModalBackground>
  )
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrap = styled.div`
  z-index: 15;
  width: 500px;
  height: 450px;
  background-color: #fff;
  border: 2px solid #dedede;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModalHeader = styled.div`
  width: 100%;
  height: 53px;
  border-bottom: 1px solid #8e8e8e;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalBody = styled.div`
  width: 100%;
`

const BankList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`

const InputList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
  input {
    height: 46px;
    outline: none;
    border: 1px solid #8e8e8e;
    font-size: 16px;
    padding: 5px;
    border-radius: 6px;
    &:focus {
      border: 1px solid #ffa9be;
    }
  }
  input[maxLength='2'] {
    width: 60px;
  }
  input[maxLength='3'] {
    width: 80px;
  }
  input[maxLength='4'] {
    width: 100px;
  }
  input[maxLength='5'] {
    width: 120px;
  }
  input[maxLength='6'] {
    width: 140px;
  }
  input[maxLength='7'] {
    width: 160px;
  }
`

const ButtonWrap = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  gap: 20px;
`

const AccountAddButton = styled.button`
  width: 76px;
  height: 46px;
  background-color: #ffa9be;
  color: #fff;
  border-radius: 6px;
  &:disabled {
    background-color: #dedede;
  }
`

const AccountCancelButton = styled.button`
  width: 76px;
  height: 46px;
  background-color: #fff;
  border: 1px solid #dedede;
  color: #8e8e8e;
  border-radius: 6px;
`

const BankItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BankImage = styled.div<BankImageProps>`
  // 'styled.div' 함수에 제네릭으로 인터페이스를 전달합니다.
  width: 48px;
  height: 48px;
  background-image: url(${(props) => props.bank});
  background-size: contain;
  cursor: pointer;
`

const BankName = styled.p`
  font-size: 10px;
`
const EmptyList = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #ffa9be;
`

const PhoneWrap = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    width: 100%;
    height: 46px;
    outline: none;
    border: 1px solid #8e8e8e;
    font-size: 16px;
    padding: 5px;
    border-radius: 6px;
    &:focus {
      border: 1px solid #ffa9be;
    }
  }
`

const SignatureWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const CheckBox = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 1.5px solid #8e8e8e;
  border-radius: 2px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #ffa9be;
  }
`
