import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '@/components/common/UserHeader'
import Footer from '@/components/common/Footer'
import styles from './AccessLayout.module.scss'

export default function AccessLayout() {
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
