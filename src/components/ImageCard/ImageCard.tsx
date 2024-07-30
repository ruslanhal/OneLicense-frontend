import React, { useEffect, useState } from "react";
import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";
import ImageUploadCard from "./ImageUploadCard";
import ImageModal from "../ImageModal/ImageModal";

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
  isSupplier?: boolean;
  imageList?: Image[];
  files: File[];
  uploadProgress: number[];
};

const ImageCard = ({
  isSupplier,
  imageList = [],
  files = [],
  uploadProgress,
}: Props) => {
  const [imageListItems, setImageListItems] = useState<Image[]>([]);
  const [currentCard, setCurrentCard] = useState<{
    id: string;
    order: number;
  } | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openedImage, setOpenedImage] = useState<string>("");

  useEffect(() => {
    if (imageList.length > 0) {
      setImageListItems(imageList);
    }
  }, [imageList]);

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    item: { id: string; order: number }
  ) {
    setCurrentCard(item);
    setIsDragging(true);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDraggedOverItem(null);
    setIsDragging(false);
  }

  function dragOverHandler(
    e: React.DragEvent<HTMLDivElement>,
    item: { id: string }
  ) {
    e.preventDefault();
    setDraggedOverItem(item.id);
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    item: { id: string; order: number }
  ) {
    e.preventDefault();
    if (currentCard === null) return;

    const newList = [...imageListItems];
    const dragIndex = newList.findIndex((c) => c.id === currentCard.id);
    const hoverIndex = newList.findIndex((c) => c.id === item.id);

    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, currentCard);

    const updatedList = newList.map((img, index) => ({
      ...img,
      order: index,
    }));

    setImageListItems(updatedList);
    setCurrentCard(null);
    setDraggedOverItem(null);
    setIsDragging(false);
  }

  const close = () => {
    setOpenedImage("");
  };

  return (
    <div>
      {openedImage !== "" ? (
        <ImageModal url={openedImage} close={() => close()} />
      ) : null}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {files.map((file, index) => (
          <ImageUploadCard
            key={index}
            title={file.name}
            progress={uploadProgress[index]}
          />
        ))}

        {imageListItems
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div
              draggable={true}
              onClick={()=>setOpenedImage(item.originalUrl)}
              className={`${styles.container} ${
                draggedOverItem === item.id ? styles.draggedOver : ""
              }`}
              onDragStart={(e) => dragStartHandler(e, item)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e, item)}
              onDrop={(e) => dropHandler(e, item)}
              key={item.id}
              style={{
                opacity:
                  isDragging && currentCard?.id === item.id ? 1 : undefined,
              }}
            >
              <div className={styles.deleteIcon}>
                <DelIcon />
              </div>

              <div className={styles.img}>
                <img src={item.thumbnailUrl} alt={item.title} />
              </div>

              <div className={styles.projectInfo}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.span}>{item.author}</p>
              </div>

              <div className={styles.buttons}>
                <button className={styles.button}>{item.price}</button>
                {isSupplier && (
                  <button className={styles.button}>Add to cart</button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageCard;
