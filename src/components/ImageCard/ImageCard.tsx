import React, { useState } from "react";
import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";
import { authHook } from "@/apiClient/hooks/authHooks";
import { addImageToCart } from "@/apiClient/services/cart/cart.service";

interface Image {
  id: string;
  title: string;
  price: number;
  currency: string;
  author: string;
  thumbnailUrl: string;
  originalUrl: string;
}

type Props = {
  item: Image;
  projectId: string;
  isDragging: boolean;
  currentCardId: string | null;
  onDelete: () => void;
  onClick: (url: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: Image) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, item: Image) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, item: Image) => void;
  draggedOverItem: string | null;
  inCart: boolean;
};

const ImgCard: React.FC<Props> = ({
  item,
  isDragging,
  currentCardId,
  onDelete,
  onClick,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  draggedOverItem,
  projectId,
  inCart,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isLoading: isUserLoading } = authHook();
  const [addedToCart, setAddedToCart] = useState(inCart);

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

  const handleAddImageToCart = async () => {
    console.log(item.id, projectId, item.price);
    if (addedToCart) return;
    const response = await addImageToCart({
      imageId: item.id,
      projectId: projectId,
      price: item.price,
    });
    console.log(response);
  };

  return (
    <div
      draggable={user?.role === "creator" ? true : false}
      onClick={() => onClick(item.originalUrl)}
      className={`${styles.container} ${
        draggedOverItem === item.id ? styles.draggedOver : ""
      } ${isDeleting ? styles.loading : ""}`}
      onDragStart={(e) => onDragStart(e, item)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, item)}
      onDrop={(e) => onDrop(e, item)}
      key={item.id}
      style={
        user?.role === "creator"
          ? {
              opacity: isDragging && currentCardId === item.id ? 1 : undefined,
            }
          : { cursor: "auto" }
      }
    >
      {user?.role === "creator" ? (
        <div className={styles.deleteIcon}>
          <button onClick={handleDeleteClick} disabled={isDeleting}>
            <DelIcon />
          </button>
        </div>
      ) : null}

      <div className={styles.img}>
        <img src={item.thumbnailUrl} alt={item.title} />
      </div>

      <div className={styles.projectInfo}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.span}>{item.author}</p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={(e) => e.stopPropagation()}>
          {item.price}
        </button>
        {user?.role === "supplier" ? (
          <button
            className={
              addedToCart
                ? `${styles.button1} ${styles.selected}`
                : styles.button1
            }
            onClick={(e) => {
              e.stopPropagation();
              setAddedToCart(!addedToCart);
              handleAddImageToCart();
            }}
          >
            {addedToCart ? "In cart" : "Add to cart"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ImgCard;
