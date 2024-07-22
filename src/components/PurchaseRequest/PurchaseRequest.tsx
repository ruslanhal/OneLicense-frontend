import React from 'react'
import styles from './PurchaseRequest.module.scss'

export default function PurchaseRequest() {
  return (
    <div className={styles.container}>
        <div className={styles.img}>
            <img />
        </div>

        <div className={styles.requestInfo}>
            <div className={styles.infoTextContainer}>
                <div className={styles.title}>Made By Storey</div>
                <div className={styles.span}>Cliff House - Finnis Architecture & Interiors</div>
                <div className={styles.price}>$45.00 AUD</div>
            </div>

            <div className={styles.buttons}>

            </div>
        </div>
    </div>
  )
}
