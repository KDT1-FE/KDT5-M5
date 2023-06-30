import React from 'react'
import styles from './index.module.scss'

export default function OnlineStore() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>쉽고 간편한 다운로드 버전으로도 즐길 수 있습니다.</h2>
      <ul className={styles.storeList}>
        <li>
          <p>{'다운로드 구입하기 > '}</p>
        </li>
        <li>
          <p>{'Sumtendo Suich / Sumtendo 3DS'}</p>
          <p>숨텐도 계좌 연동 안내</p>
        </li>
        <li>
          <p>{'Sumtendo Suich'}</p>
          <p>{'숨텐도 구입하기'}</p>
        </li>
      </ul>
    </div>
  )
}
