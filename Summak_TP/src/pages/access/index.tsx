import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export default function Access() {
  return (
    <div className={styles.container}>
      <h1 className={styles['subTitle']}>닌텐도 어카운트</h1>
      <div className={styles['select']}>
        <div className={styles['info']}>
          가지고 계신 닌텐도 어카운트로 로그인하거나,
          <br /> 어카운트를 새로 작성해 주십시오.
        </div>
        <div className={styles['accountform']}>
          <div className={styles['has-account']}>
            <h3 className={styles['account-info']}>어카운트가 있는 분</h3>
            <Link to="/access/login">
              <button className={styles['account-btn']}>로그인</button>
            </Link>
          </div>
          <div className={styles['non-account']}>
            <h3 className={styles['account-info']}>어카운트가 없는 분</h3>
            <Link to="/access/agesignup">
              <button className={styles['account-btn']}>신규작성</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
