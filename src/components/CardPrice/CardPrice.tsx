import React from "react";
import styles from "./CardPrice.module.scss";
import DelIcon from "@/assets/DelIcon";

type Props = {
  title: string;
  author: string;
  imageUrl: string;
  price: string;
  isSupplier?:boolean
};

const CardPrice = ({ title, author, imageUrl, price, isSupplier }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.deleteIcon}>
        <DelIcon />
      </div>
     

      <div className={styles.img}>
        <img src={imageUrl} />
      </div>

      <div className={styles.projectInfo}>
        <p className={styles.title}>{title}</p>
        <p className={styles.span}>{author}</p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button}>{price}</button>
        {isSupplier?<button className={styles.button}>Add to cart</button>:null}
      </div>
    </div>
  );
};
``;
export default CardPrice;
