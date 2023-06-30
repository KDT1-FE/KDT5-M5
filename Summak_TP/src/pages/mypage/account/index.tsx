import React, { useState, useEffect, MouseEventHandler } from 'react'
import styles from './index.module.scss'
import Sidebar from '@/components/mypage/nav/SideBar'
import { Link } from 'react-router-dom'
import ConnectedAccount from '@/components/mypage/bank/ConnectedAccount'
import { AccountsBalance, Bank } from '@/types/account'
import { getConnectedAccounts, deleteAccount } from '@/apis/payment/account'
import Modal from '@/components/common/Modal'
import useUserInfo from '@/hooks/useUserInfo'

export default function Account() {
  const [accounts, setAccounts] = useState<Bank[]>([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Bank>({
    id: '', // 계좌 ID
    bankName: '', // 은행 이름
    bankCode: '', // 은행 코드
    accountNumber: '', // 계좌 번호
    balance: 0 // 계좌 잔액
  })
  const [userInfo] = useUserInfo()
  //accessToken 가져오기
  const accessToken = localStorage.getItem('token') || ''

  const handleModalOpen: MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement>) => {
    const accountIndex = Number(event.currentTarget.dataset.index)
    const account = accounts[accountIndex]
    setSelectedAccount(account)
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // 잔액 조회 목록 호출
  useEffect(() => {
    getConnectedAccounts(accessToken).then((response: AccountsBalance) => {
      const { totalBalance, accounts } = response
      setTotalBalance(totalBalance)
      setAccounts(accounts)
    })
  }, [])

  // 계좌 해지 함수 호출
  const handleAccountDeletion = async () => {
    const res = await deleteAccount(accessToken, { accountId: selectedAccount.id, signature: true })
    if (res) {
      alert('계좌가 정상적으로 해지되었습니다!')
    } else {
      alert('계좌 해지에 실패했습니다.\n 자세한 사항은 고객센터에 문의해주세요.')
    }
    window.location.reload()
  }

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.banksContainer}>
          <div className={styles.totallAccounts}>
            <div className={styles.totale}>💰 총 계좌 잔액</div>
            <div className={styles.amount}>{totalBalance.toLocaleString()}원</div>
            <div className={styles.underLine}>₩</div>
          </div>
          {/* 추가된 계좌 + 계좌 추가 버튼 영역 */}
          <div className={styles.banksAccounts}>
            <div className={styles.banks}>
              {/* accounts는 배열이라 .map사용 */}
              {accounts.map((account, index) => (
                <button key={index} className={styles.linkedBank} onClick={handleModalOpen} data-index={index}>
                  {/*인덱스 데이터를 버튼에 추가 */}
                  <ConnectedAccount
                    bankName={account.bankName}
                    accountNumber={account.accountNumber}
                    balance={account.balance}
                  />
                </button>
              ))}
              <Link className={styles.addBank} to={`/user/${userInfo.displayName}/account/addAccount`}>
                <div className={styles.btn}>
                  <span className={styles.plus}>+</span>
                  <span className={styles.add}>계좌 추가</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedAccount && (
        <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
          <div className={styles.modalContainer}>
            <div className={styles.inner}>
              <h1 className={styles.title}>{selectedAccount.bankName}</h1>
              <h4 className={styles.subtitle}>계좌를 해지하시겠습니까?</h4>
              <div className={styles.bankAccount}>
                <div className={styles.bankName}>은행 : {selectedAccount.bankName}</div>
                <div className={styles.bankNumber}>계좌번호 : {selectedAccount.accountNumber}</div>
                <div className={styles.bankAmount}>{selectedAccount.balance.toLocaleString()}원</div>
                <div className={styles.bankUnderLine}>₩</div>
              </div>
              <div className={styles.btnContainer}>
                <button type="button" className={`${styles.btnTag} ${styles.enrolled}`} onClick={handleAccountDeletion}>
                  예
                </button>
                <button type="reset" onClick={handleModalClose} className={`${styles.btnTag} ${styles.cancel}`}>
                  아니오
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
