import React, {useEffect, useState} from "react";
import styles from "./ImageCard.module.scss";
import DelIcon from "@/assets/DelIcon";
import ImageUploadCard from "./ImageUploadCard";
import ImageModal from "../ImageModal/ImageModal";
import {
  deleteOneImage,
  resortImages,
} from "@/apiClient/services/project/project.service";
import ImgCard from "./ImageCard";

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
  const [resortedImages, setresortedImages] = useState<
    | {
        imageId: string;
        orderIndex: number;
      }[]
    | null
  >(null);
  const [currentCard, setCurrentCard] = useState<Image | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openedImage, setOpenedImage] = useState<string>("");

  useEffect(() => {
    return () => {
      resortImages(projectId, resortedImages);
    };
  }, [resortedImages]);

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

    imageListItems.sort((a, b) => a.orderIndex - b.orderIndex);
    const newList = [...imageListItems];
    const dragIndex = newList.findIndex((c) => c.id === currentCard.id);
    const hoverIndex = newList.findIndex((c) => c.id === item.id);

    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, {...currentCard, orderIndex: hoverIndex});

    const updatedList = newList.map((img, index) => ({
      ...img,
      orderIndex: index,
    }));
    updatedList.sort((a, b) => b.orderIndex - a.orderIndex);

    const paramsResorted = updatedList.map((image) => {
      return {imageId: image.id, orderIndex: image.orderIndex};
    });
    setresortedImages(paramsResorted);
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
          // .sort((a, b) => b.orderIndex - a.orderIndex)
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
