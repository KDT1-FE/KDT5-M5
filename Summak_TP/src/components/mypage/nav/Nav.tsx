import React, { useState, useEffect } from 'react'
import styles from './Nav.module.scss'
// import { User } from '@/types/user'
import { Link } from 'react-router-dom'
import { getAuthenticatedUser } from '@/apis/payment/access'

import { userState } from '@/recoil/common/userState'
import useUserInfo from '@/hooks/useUserInfo'

export default function Nav() {
  // const [isLogined, setIsLogined] = useState(false)
  const [userInfo] = useUserInfo()
  const [modify, setModify] = useState(true)

  const navConvert = () => {
    setModify((prevModify) => !prevModify)
  }

  return (
    <nav className={styles.sideNav}>
      <div className={`${styles.nav} ${styles.container}`}>
        <img className={styles.profileImg} src={userInfo.profileImg} alt="" />
        <div className={styles.textBox}>
          <h3 className={styles.displayName}>{userInfo.displayName}</h3>
          <span>{userInfo.email}</span>
        </div>
        <Link
          className={styles.aTag}
          to={modify ? `/user/${userInfo.displayName}/certProfile` : `/user/${userInfo.displayName}`}
          onClick={navConvert}
        >
          {modify ? '정보 수정' : '수정 완료'}
        </Link>
      </div>
    </nav>
  )
}
