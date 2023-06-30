import React from 'react'
import styles from './GetItem.module.scss'
import { TransactionDetail } from '@/types/product'

interface Props {
  item: TransactionDetail
}

export default function GetItem({ item }: Props) {
  const { product } = item
  return (
    <a className={`${styles.aTag} ${styles.container}`} href={`/detail/${product.productId}`}>
      <div className={styles.itemThumbnail}>
        <img
          className={styles.itemImg}
          src={
            product.thumbnail ||
            'https://store.nintendo.co.kr/media/catalog/product/cache/559013652f8c31ac036888adc145c37f/f/i/file.jpg'
          }
          alt=""
        />
      </div>
      <span className={`${styles.spanTag} ${styles.itemTitle}`}>{product.title}</span>
      <span className={`${styles.spanTag} ${styles.itemPrice}`}>{product.price.toLocaleString()} 원</span>
    </a>
  )
}
