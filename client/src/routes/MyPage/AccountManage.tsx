import { PageHeader } from '../../components/mypage/PageHeader'
import { styled } from 'styled-components'
import GlobalStyle from '../../styles/GlobalStyles'
import { AccountAddModal } from '../../components/mypage/AccountAddModal'
import { useState, useEffect } from 'react'
import { getUserAccounts, deleteAccount } from '../../apis/api'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'

interface Account {
  id: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  balance: number;
}

export const AccountManage = () => {
  const [dataLoading, setdataLoading] = useState(false)
  const [isModalOpen, setisModalOpen] = useState(false)
  const [accountList, setAccountList] = useState<Account[]>([])

  const handleClickAddAccount = () => {
    setisModalOpen(true)
  }


  const requestDeleteAccount = async (id: string, signature: boolean) => {
    const response = await deleteAccount({ id, signature })
    if (response) {
      window.location.reload()
    }
  }

  const handleClickDeleteAccount = (id: string) => {
    const signature = confirm('삭제하시겠습니까?')
    if (signature) {
      requestDeleteAccount(id, signature)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setdataLoading(true)
        const data = await getUserAccounts()
        setAccountList(data.accounts)
      } catch (error) {
        console.error('Error fetching account list:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Inner>
          <PageHeader title="계좌 관리" />
          <p>등록된 계좌</p>
          {!dataLoading ? (
            accountList.length > 0 ? (
              accountList.map((account) => (
                <AccountWrap key={account.id}>
                  <img src={`/assets/mypage/${account.bankCode}.svg`} alt="" />
                  <p>{account.bankName}</p>
                  <p>{account.accountNumber}</p>
                  <p>
                    잔액:<span>{account.balance}</span>
                  </p>
                  <DeleteButton onClick={() => handleClickDeleteAccount(account.id)}>
                    삭제
                  </DeleteButton>
                </AccountWrap>
              ))
            ) : (
              <EmptyList>등록된 계좌가 없습니다.</EmptyList>
            )
          ) : null}
        </Inner>
        {dataLoading && <LoadingSpinner />}
        {!dataLoading && (
          <AccountAddButton onClick={handleClickAddAccount}>계좌 등록하기</AccountAddButton>
        )}
      </Wrap>
      {isModalOpen && <AccountAddModal setisModalOpen={setisModalOpen} />}
    </>
  )
}



const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Inner = styled.div`
  width: 100%;
`

const AccountWrap = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  align-items: center;
  img {
    width: 48px;
    height: 48px;
  }
`

const DeleteButton = styled.button`
  width: 76px;
  height: 46px;
  border: 1px solid #dedede;
  color: #8e8e8e;
  border-radius: 6px;
  position: absolute;
  right: 0;
`

const AccountAddButton = styled.button`
  width: 304px;
  height: 50px;
  background-color: #ffa9be;
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
  margin-top: 50px;
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
