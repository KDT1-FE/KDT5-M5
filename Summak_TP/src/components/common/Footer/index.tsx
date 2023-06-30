import React from 'react'
import styles from './index.module.scss'
export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.term}>
          <a href="/common/account.html">이용약관</a>
          <a href="/common/privacy.html">개인정보처리방침</a>
        </div>
        <p className={styles.info}>
          고객지원 문의전화 : 1670-9900 <span className="bl_m">(평일 오전 9시 30분~오후 5시 30분)</span>
          <span className="bl">※ 토/일/공휴일/회사 정기휴일 및 특별휴일 제외</span>
        </p>
        <address>
          ⓒ 2006 Nintendo of Korea Co., Ltd. All Rights Reserved.
          <br />
          <span>상호명 : 한국닌텐도주식회사</span>
          <span>대표자명 : 미우라 타카히로</span>
          사업자등록번호 : 120-87-03578
        </address>
      </div>
    </footer>
  )
}
