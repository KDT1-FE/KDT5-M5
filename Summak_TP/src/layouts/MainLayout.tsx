import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHedaer from '@/components/common/MainHeader'
import Footer from '@/components/common/Footer'

export default function MainLayout() {
  return (
    <div>
      <MainHedaer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
