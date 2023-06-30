import React from 'react'
import styles from './index.module.scss'

export default function ConnectAccountBanner() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Sumtendo Switch</p>
      <a className={styles.link} href="/">
        <p>{'숨텐도 계좌 연결하기 >'}</p>
      </a>
    </div>
  )
}
