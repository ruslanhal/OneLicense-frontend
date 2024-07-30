import React, {useEffect, useState} from "react";
import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";
import ImageUploadCard from "./ImageUploadCard";
import ImageModal from "../ImageModal/ImageModal";
import {deleteOneImage} from "@/apiClient/services/project/project.service";
import ImgCard from "./ImgCrd";

interface Image {
  id: string;
  title: string;
  price: string;
  author: string;
  thumbnailUrl: string;
  originalUrl: string;
  orderIndex: number;
}

type Props = {
  isSupplier?: boolean;
  imageList?: Image[];
  files: File[];
  uploadProgress: number[];
  projectId: string;
  handleDelete: (imageId: string) => Promise<void>;
};

const ImageCardWraper = ({
  isSupplier,
  imageList = [],
  files = [],
  uploadProgress,
  projectId,
  handleDelete,
}: Props) => {
  const [imageListItems, setImageListItems] = useState<Image[]>([]);
  const [currentCard, setCurrentCard] = useState<Image | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openedImage, setOpenedImage] = useState<string>("");

  useEffect(() => {
    if (imageList.length > 0) {
      setImageListItems(imageList);
    }
  }, [imageList]);

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, item: Image) {
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
    item: {id: string}
  ) {
    e.preventDefault();
    setDraggedOverItem(item.id);
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, item: Image) {
    e.preventDefault();
    if (currentCard === null) return;

    const newList = [...imageListItems];
    const dragIndex = newList.findIndex((c) => c.id === currentCard.id);
    const hoverIndex = newList.findIndex((c) => c.id === item.id);

    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, {...currentCard, orderIndex: hoverIndex});

    const updatedList = newList.map((img, index) => ({
      ...img,
      orderIndex: index,
    }));

    setImageListItems(updatedList);
    setCurrentCard(null);
    setDraggedOverItem(null);
    setIsDragging(false);
  }

  const close = () => {
    setOpenedImage("");
  };

  // const handleDelete = async (imageId: string) => {
  //   await deleteOneImage(projectId, imageId);
  //   const newImageList = imageList.filter((image) => image.id !== imageId);
  //   setImageListItems(newImageList);
  // };

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
          // .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((item) => (
            <ImgCard
              key={item.id}
              item={item}
              isDragging={isDragging}
              currentCardId={currentCard?.id || null}
              onDelete={async () => {
                handleDelete(item.id);
              }}
              onClick={setOpenedImage}
              onDragStart={dragStartHandler}
              onDragEnd={dragEndHandler}
              onDragOver={dragOverHandler}
              onDrop={dropHandler}
              draggedOverItem={draggedOverItem}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageCardWraper;

{
  /* type Props = {
  isSupplier?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  imageList?: Image[];
  files: File[];
  uploadProgress: number[];
};

const ImageCard = ({
  isSupplier,
<<<<<<< HEAD
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
      </div> */
}

// {imageListItems
//   .sort((a, b) => a.orderIndex - b.orderIndex)
//   .map((item) => (
//     <div
//       draggable={true}
//       onClick={() => setOpenedImage(item.originalUrl)}
//       className={`${styles.container} ${
//         draggedOverItem === item.id ? styles.draggedOver : ""
//       } ${isDeleting ? styles.loading : ""}`}
//       onDragStart={(e) => dragStartHandler(e, item)}
//       onDragLeave={(e) => dragEndHandler(e)}
//       onDragEnd={(e) => dragEndHandler(e)}
//       onDragOver={(e) => dragOverHandler(e, item)}
//       onDrop={(e) => dropHandler(e, item)}
//       key={item.id}
//       style={{
//         opacity:
//           isDragging && currentCard?.id === item.id ? 1 : undefined,
//       }}
//     >
//       <div className={styles.deleteIcon}>
//         <button
//           onClick={handleDeleteClick(item.id)}
//           disabled={isDeleting}
//         >
//           <DelIcon />
//         </button>
//       </div>

//       <div className={styles.img}>
//         <img src={item.thumbnailUrl} alt={item.title} />
//       </div>

//       <div className={styles.projectInfo}>
//         <p className={styles.title}>{item.title}</p>
//         <p className={styles.span}>{item.author}</p>
//       </div>

//       <div className={styles.buttons}>
//         <button className={styles.button}>{item.price}</button>
//         {isSupplier && (
//           <button className={styles.button}>Add to cart</button>
//         )}
//       </div>
//     </div>
//   ))}
