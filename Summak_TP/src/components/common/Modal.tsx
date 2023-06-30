import React from 'react'
import styles from './Modal.module.scss'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  closeModal: () => void
}

export default function Modal({ children, isOpen, closeModal }: Props) {
  return (
    <>
      <div className={styles.container} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={styles.bg} onClick={() => closeModal()}>
          {''}
        </div>
        <div className={styles.modal}>{children}</div>
      </div>
    </>
  )
}
