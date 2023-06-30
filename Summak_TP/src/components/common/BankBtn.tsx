import React from 'react'
import styles from './BankBtn.module.scss'
// 이 파일은 삭제
// 은행 / 잔액
export default function Bank() {
  const banks = ['국민', '신한', 'NH농협', '케이', '하나', '우리', '카카오']

  return (
    <div className={styles.container}>
      <div className={styles.bank}>
        <div className={styles.bankLogo}>
          <img src="#" alt="logo" />
        </div>
        <div className={styles.bankInfo}>
          <span className={styles.bankName}>{banks[0]}은행</span>
          <span className={styles.bankId}>은행코드..정보?</span>
        </div>
      </div>
    </div>
  )
}
