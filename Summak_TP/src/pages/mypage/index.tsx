import React from 'react'
import styles from './index.module.scss'
import Nav from '@/components/mypage/nav/Nav'
import GetList from '@/components/mypage/productList/GetList'
import { Link } from 'react-router-dom'
import useUserInfo from '@/hooks/useUserInfo'

// userInfo는 제가 맘대로 지정해놓은 것이고, 원하는 변수명으로 사용하시면 됩니다!

export default function MyPage() {
  const [userInfo] = useUserInfo()

  return (
    <>
      <div className={styles.container}>
        <Nav />
        <section className={styles.section}>
          <div className={styles.inner}>
            <ul className={styles.mainLists}>
              <li className={`${styles.listTitle} ${styles.account}`}>
                계좌
                <div className={styles.listText}>
                  <Link className={`${styles.aTag} ${styles.listLink}`} to={`/user/${userInfo.displayName}/account`}>
                    💎 계좌조회
                  </Link>
                  <Link
                    className={`${styles.aTag} ${styles.listLink}`}
                    to={`/user/${userInfo.displayName}/account/addAccount`}
                  >
                    💰 계좌추가
                  </Link>
                </div>
              </li>
              <li className={`${styles.listTitle} ${styles.checkInfo}`}>
                장바구니
                <button className={`${styles.btn} ${styles.listText}`}>
                  <Link className={`${styles.aTag} ${styles.listLink}`} to={`/payment/${userInfo.displayName}`}>
                    🛒 장바구니
                  </Link>
                </button>
              </li>
              <li className={`${styles.listTitle} ${styles.Items}`}>
                구매 내역
                <div className={styles.listText}>
                  <button className={`${styles.aTag} ${styles.btn} ${styles.listLink} ${styles.visible}`}>
                    <Link
                      className={`${styles.aTag} ${styles.listLink}`}
                      to={`/user/${userInfo.displayName}/getItemAll`}
                    >
                      💳 구매 내역
                    </Link>
                  </button>
                </div>
              </li>
            </ul>
            <hr className={styles.line} />
            <GetList />
          </div>
        </section>
      </div>
    </>
  )
}
