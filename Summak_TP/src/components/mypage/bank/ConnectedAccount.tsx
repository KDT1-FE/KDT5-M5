import React from 'react'
import styles from './ConnectedAccount.module.scss'
import getBankLogo from '@/utils/getBankLogo'

interface BankProps {
  bankName: string
  accountNumber: string
  balance: number
  handleOnClick?: () => void
  isActive?: boolean
}

export default function ConnectedAccount({ bankName, accountNumber, balance }: BankProps) {
  //bankLogo 가져오기
  const bankLogo = getBankLogo(bankName)

  return (
    <div className={styles.container}>
      <div className={styles.bank}>
        <div className={styles.bankLogo}>
          <img src={bankLogo} alt="logo" />
        </div>
        <div className={styles.bankInfo}>
          <div className={styles.bankNames}>
            <span className={styles.bankName}>{bankName}</span>
            <hr className={styles.line} />
          </div>
          <div className={styles.changes}>
            <div className={styles.text}>잔액</div>
            <div className={styles.change}>{balance.toLocaleString()}</div>
          </div>
          <div className={styles.accountNumber}>{accountNumber}</div>
        </div>
      </div>
    </div>
  )
}
