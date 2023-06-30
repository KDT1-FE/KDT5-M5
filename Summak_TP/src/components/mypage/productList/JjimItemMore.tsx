import React from 'react'
import styles from './JjimItemMore.module.scss'
import { Product } from '@/types/product'

interface Props {
  item: Product
  onRemove: () => void
}
//api연동 후에 제품 상세페이지 + 썸네일 타이틀?에 '찜하기 버튼' setItem 실행, getItem으로 받아오기만 할 것.

export default function JjimItemMore({ item, onRemove }: Props) {
  return (
    <li className={styles.container}>
      <a className={`${styles.aTag} ${styles.itemList}`} href={'/detail/:productId'}>
        <div className={styles.itemThumbnail}>
          <img className={styles.itemImg} src={item.thumbnail || 'https://example.com/no-image.jpg'} alt="" />
        </div>
        <div className={styles.itemInfo}>
          <div className={`${styles.spanTag} ${styles.itemTitle}`}>
            {item.title} : 제품명이 길 경우 두 줄로 들어갑니다.
          </div>
          <div className={`${styles.spanTag} ${styles.itemPrice}`}>{item.price} 원</div>
        </div>
      </a>
      <button className={styles.btn} onClick={onRemove}>
        <a className={styles.aTag}>X</a>
      </button>
    </li>
  )
}
