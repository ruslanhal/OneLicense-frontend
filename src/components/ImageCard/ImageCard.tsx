import {useState} from "react";
import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";

interface Image {
  id: string;
  title: string;
  price: string;
  author: string;
  thumbnailUrl: string;
  originalUrl: string;
  order: number;
}

type Props = {
  title: string;
  author: string;
  imageUrl: string;
  price: string;
  isSupplier?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
};

const ImageCard = ({
  title,
  author,
  imageUrl,
  price,
  isSupplier,
  onClick,
  onDelete,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDeleting(true);

    event.stopPropagation();
    if (onDelete) {
      try {
        onDelete();
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${isDeleting ? styles.loading : ""}`}
      onClick={onClick}
    >
      <div className={styles.deleteIcon}>
        <button onClick={handleDeleteClick} disabled={isDeleting}>
          <DelIcon />
        </button>
      </div>

      {isDeleting ? (
        <div className="w-[200px] h-[300px]"></div>
      ) : (
        <div className={styles.img}>
          <img src={imageUrl} />
        </div>
      )}
      <div className={styles.projectInfo}>
        <p className={styles.title}>{title}</p>
        <p className={styles.span}>{author}</p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button}>{price}</button>
        {isSupplier && <button className={styles.button}>Add to cart</button>}
      </div>
    </div>
  );
};

export default ImageCard;
