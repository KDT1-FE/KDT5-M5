import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '@/components/common/UserHeader'
import Footer from '@/components/common/Footer'
import styles from './MypageLayout.module.scss'

export default function MyPageLayout() {
  return (
    <div>
      <UserHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
