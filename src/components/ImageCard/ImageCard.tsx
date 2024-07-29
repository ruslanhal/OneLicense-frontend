import React, { useEffect, useState } from "react";
import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";
import ImageUploadCard from "./ImageUploadCard";

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
  files:File[],
  uploadProgress:number[]
};

const ImageCard = ({
  isSupplier,
  imageList=[],
  files=[],
  uploadProgress
}: Props) => {
  const [imageListItems, setImageListItems] = useState<Image[]>([]);

  const [currentCard, setCurrentCard] = useState<{
    id: string;
    order: number;
  } | null>(null);

  useEffect(() => {
    if (imageList.length > 0) {
      setImageListItems(imageList);
    }
  }, [imageList]);

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    item: { id: string; order: number }
  ) {
  //  console.log("drag", item);
    setCurrentCard(item);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    item: { id: string; order: number }
  ) {
    e.preventDefault();
    if (currentCard === null) return;

    setImageListItems(
      imageListItems.map((c) => {
        if (c.id === item.id) {
          return {
            ...c,
            order: currentCard.order,
          };
        }

        if (c.id === currentCard.id) {
          return { ...c, order: item.order };
        }
        return c;
      })
    );
  }

  return (
    <div>

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
              className={styles.container}
              onDragStart={(e) => dragStartHandler(e, item)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, item)}
              key={item.id}
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
