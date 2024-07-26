import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";

type Props = {
  title: string;
  author: string;
  imageUrl: string;
  price: string;
  isSupplier?: boolean;
  onClick?:()=>void;
};

const ImageCard = ({title, author, imageUrl, price, isSupplier, onClick}: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
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
        {isSupplier ? (
          <button className={styles.button}>Add to cart</button>
        ) : null}
      </div>
    </div>
  );
};

export default ImageCard;
