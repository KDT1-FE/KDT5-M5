import React from 'react'
import styles from './SideBar.module.scss'
import { Link } from 'react-router-dom'
import useUserInfo from '@/hooks/useUserInfo'

export default function SideBarItem() {
  const [userInfo] = useUserInfo()

  // const dummyUser: User = {
  //   email: 'example@example.com', // 사용자 아이디
  //   displayName: 'John Doe', // 사용자 표시 이름
  //   profileImg: '' // 사용자 프로필 이미지 URL
  // }

  return (
    <nav className={styles.navBar}>
      <div className={styles.container}>
        <div className={styles.link}>
          <Link className={styles.aTag} to={`/user/${userInfo.displayName}/getItemAll`}>
            구매 내역
          </Link>
        </div>
        <div className={styles.link}>
          <Link to={`/user/${userInfo.displayName}`} className={styles.mypage}>
            마이 페이지
          </Link>
        </div>
      </div>
    </nav>
  )
}
