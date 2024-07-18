import React from "react";
import styles from "./CardPrice.module.scss";
import DelIcon from '../../assets/DelIcon.svg'

type Props = {
  title: string;
  author: string;
  imageUrl: string;
  price:string
};

const CardPrice = ({ title, author, imageUrl,price }: Props) => {
  return (
    <div className={styles.container}>
    <img src={DelIcon} className={styles.deleteIcon} />
      <img src={imageUrl} className={styles.img}/>
      <div className={styles.projectInfo}>
        <p className={styles.title}>{title}</p>
        <p className={styles.span}>{author}</p>
      </div>
      <button className={styles.button} >{price}</button>
    </div>
  );
};
``;
export default CardPrice;
