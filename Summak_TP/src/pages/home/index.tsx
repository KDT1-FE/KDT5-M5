import React from 'react'
import styles from './index.module.scss'

import HomeSwiper from '@/components/home/HomeSwiper'
import News from '@/components/home/News'
import ConnectAccountBanner from '@/components/home/ConnectAccountBanner'
import Softwares from '@/components/home/Softwares'
import OnlineStore from '@/components/home/OnlineStore'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeSwiper />
      <News />
      <ConnectAccountBanner />
      <Softwares />
      <OnlineStore />
    </div>
  )
}
