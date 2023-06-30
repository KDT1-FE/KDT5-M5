import React from 'react'
import styles from './index.module.scss'

type Props = {
  banner: {
    id: string
    src: string
    path: string
    title: string
  }
}
export default function Banner({ banner }: Props) {
  return (
    <div className={styles.container}>
      <a href={banner.path}>
        <img src={banner.src} alt={banner.title} />
      </a>
    </div>
  )
}
