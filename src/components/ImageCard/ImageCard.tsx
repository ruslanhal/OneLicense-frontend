import React, { useState } from "react";
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
  order: number;
  setImageList: (list: Image[]) => void;
  imageList: Image[];
};

const ImageCard = ({
  title,
  author,
  imageUrl,
  price,
  isSupplier,
  onClick,
  order,
  imageList,
  setImageList,
}: Props) => {
  const [currentCardOrder, setCurrentCardOrder] = useState<number | null>(null);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, cardOrder: number) => {
    console.log("Dragging card with order:", cardOrder);
    setCurrentCardOrder(cardOrder);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, targetCardOrder: number) => {
    e.preventDefault();
    if (currentCardOrder === null) return;

    const newList = imageList.map((card) => {
      if (card.order === targetCardOrder) {
        return { ...card, order: currentCardOrder };
      }
      if (card.order === currentCardOrder) {
        return { ...card, order: targetCardOrder };
      }
      return card;
    });

    console.log(newList);

    setImageList(newList);
    setCurrentCardOrder(null); 
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, order)}
      onDragLeave={dragEndHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={(e) => dropHandler(e, order)}
      className={styles.container}
      onClick={onClick}
    >
      <div className={styles.deleteIcon}>
        <DelIcon />
      </div>

      <div className={styles.img}>
        <img src={imageUrl} alt={title} />
      </div>

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
