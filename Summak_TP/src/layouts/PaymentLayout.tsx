import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '@/components/common/UserHeader'
import Footer from '@/components/common/Footer'
import styles from './PaymentLayout.module.scss'

export default function PaymentLayout() {
  return (
    <div>
      <UserHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
