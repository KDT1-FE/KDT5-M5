import React from 'react'
import styles from './index.module.scss'

export default function Search() {
  return (
    <div className={styles.container}>
      <div>
        <span>
          <a href="/">Suntendo Switch</a>
        </span>
        <span>
          <a href="/">숨텐도 선불 번호</a>
        </span>
        <span>
          <a href="/">도움말</a>
        </span>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="검색" />
        <span className={styles.icon} />
      </div>
    </div>
  )
}
