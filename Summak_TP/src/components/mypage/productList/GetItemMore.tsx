import React from 'react'
import styles from './GetItemMore.module.scss'
import { TransactionDetail } from '@/types/product'

interface Props {
  item: TransactionDetail
}
export default function GetItemMore({ item }: Props) {
  const { product } = item
  return (
    <li className={styles.container}>
      <a className={`${styles.aTag} ${styles.itemList}`} href={`/detail/${product.productId}`}>
        <div className={styles.itemThumbnail}>
          <img className={styles.itemImg} src={product.thumbnail || 'https://example.com/no-image.jpg'} alt="" />
        </div>
        <div className={styles.itemInfo}>
          <div className={`${styles.spanTag} ${styles.itemTitle}`}>{product.title}</div>
          <div className={`${styles.spanTag} ${styles.itemPrice}`}>{product.price.toLocaleString()} 원</div>
        </div>
      </a>
    </li>
  )
}
