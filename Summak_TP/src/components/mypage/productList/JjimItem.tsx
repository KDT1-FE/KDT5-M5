import React from 'react'
import styles from './JjimItem.module.scss'
import { Product } from '@/types/product'

interface Props {
  item: Product
}

export default function JjimItem({ item }: Props) {
  return (
    <a className={`${styles.aTag} ${styles.container}`} href={'/detail/:productId'}>
      <div className={styles.itemThumbnail}>
        <img
          className={styles.itemImg}
          src={
            item.thumbnail ||
            'https://store.nintendo.co.kr/media/catalog/product/cache/8e3c84988db1fdb90470f4d01453d879/b/6/b6bc7bd67a7ea937ea28b6383752d88a7628afb1c1ef196b1f83659c4447fa85.jpg'
          }
          alt=""
        />
      </div>
      <span className={`${styles.spanTag} ${styles.itemTitle}`}>
        {item.title} : 제품명이 들어가는 자리제품명제품명제품명
      </span>
      <span className={`${styles.spanTag} ${styles.itemPrice}`}>{item.price} 원</span>
    </a>
  )
}
