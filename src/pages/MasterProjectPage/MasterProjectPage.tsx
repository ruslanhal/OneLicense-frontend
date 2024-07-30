import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useGetProject } from "@/apiClient/hooks/projectHooks";
import styles from "./MasterProjectPage.module.scss";
import TagsForm from "../../components/TagsForm/TagsForm";
import IconAddNew from "@/assets/IconAddNew";
import Tabs from "@/assets/Tabs";
import Save from "@/assets/Save";
import { axiosClient } from "@/apiClient/apiClient";
import ImageCard from "@/components/ImageCard/ImageCard";
import {
  generatePresignedUrls,
  uploadImageToS3,
  wrapperUploadImages,
} from "@/apiClient/services/project/project.service";
import { IPresignedURL } from "@/apiClient/services/project/types/project.entities";
import CancelIcon from "../../assets/icon_cancel.svg";
import Loader from "@/components/Loader/Loader";
import Skeleton from "@/components/Skeleton/Skeleton";

type Props = {};

interface Tag {
  id: string;
  name: string;
}

interface Image {
  id: string;
  title: string;
  price: string;
  author: string;
  thumbnailUrl: string;
  originalUrl: string;
  order: number;
}

const mockTags = [
  {
    id: "1",
    name: "Signorino",
  },
  {
    id: "2",
    name: "Inlite",
  },
  {
    id: "3",
    name: "Made By Storey",
  },
  {
    id: "4",
    name: "Brodware",
  },
];

const MasterProjectPage = (props: Props) => {
  const { projectId } = useParams();
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDragAndDropOpened, setIsDragAndDropOpened] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [tagsList, setTagsList] = useState<Tag[]>(mockTags);
  const [imageList, setImageList] = useState<Image[]>([]);
  const [skeletons, setSkeletons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const [flag, setFlag] = useState(0);

  const handleDragAndDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;

    if (!fileList) return;

    const newFiles = Array.from(fileList);
    console.log("-=-=-=-=-=-=-=newFiles", newFiles);

    const filesLength = files.length + newFiles.length;
    if (filesLength > 10) {
      console.error("You can only upload up to 10 files in total.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    console.log("-=-=-=-=-=-=-files", files);

    try {
      setIsDragAndDropOpened(false);

      if (!projectId) {
        return;
      }

      const filesArr = newFiles.map((file) => {
        return { title: file.name, description: "", mimeType: file.type };
      });

      const presignedUrlArr = await generatePresignedUrls(projectId, filesArr);

      const progressArr = new Array(newFiles.length).fill(0);
      setUploadProgress(progressArr);

      const uploadPromises = Array.from(newFiles).map(async (file, index) => {
        const presignedOrigUrl: IPresignedURL =
          presignedUrlArr[index].presignedOrigUrl;

        const presignedThumbnailUrl =
          presignedUrlArr[index].presignedThumbnailUrl;

        const { url: origUrl, fields: origFields } = presignedOrigUrl;
        const { url: thumbnailUrl, fields: thumbnailFields } =
          presignedThumbnailUrl;

        const origFormData = new FormData();
        const thumbnailFormData = new FormData();

        Object.keys(origFields).forEach((key) => {
          origFormData.append(key, origFields[key]);
        });

        Object.keys(thumbnailFields).forEach((key) => {
          thumbnailFormData.append(key, thumbnailFields[key]);
        });

        origFormData.append("file", file);

        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          alwaysKeepResolution: true,
        };

        const compressedImage = await imageCompression(file, options);

        thumbnailFormData.append("file", compressedImage);

        return wrapperUploadImages(
          {
            url: origUrl,
            formData: origFormData,
            progressArr,
            index,
            setUploadProgress,
          },
          {
            url: thumbnailUrl,
            formData: thumbnailFormData,

            index,
          }
        );
      });

      await Promise.all(uploadPromises);

      setFiles([]);
      setFlag(1);

      console.log("-=-=-=-=-=-=-presignedUrlArr:", presignedUrlArr);
    } catch (e) {
      console.error("Error uploading files:", e);
    }
  };

  const removeItem = (id: string) => {
    const updatedTagsList = tagsList.filter((tag) => tag.id !== id);
    setTagsList(updatedTagsList);
  };

  const addItem = (name: string) => {
    const id = Date.now().toString();
    const newTag = { id: id, name: name };
    setTagsList([...tagsList, newTag]);
  };

  const closeForm = (value: boolean) => {
    setIsTagsOpen(value);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axiosClient.get(`/project/${projectId}`);
        console.log("API response:", response.data);

        let index = 0;
        const newArr = response.data.images.map((item) => {
          index = index + 1;
          return {
            ...item,
            order: index,
          };
        });

        setImageList(newArr);

        console.log("-=-=-=-=imageList", imageList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (projectId) {
      setFlag(0);
      fetchFiles();
    }
  }, [projectId, flag]);

  if (!projectId) {
    return <div>Error: Project is not available</div>;
  }

  useEffect(() => {
    console.log(imageList);
  }, [imageList]);

  const {
    isLoading,
    project: projectData,
    error,
    isSuccess,
  } = useGetProject(projectId);

  if (isTagsOpen) {
    return (
      <div className={styles.master_project__container}>
        {isLoading ? <Loader /> : null}
        <TagsForm
          closeForm={closeForm}
          addItem={addItem}
          tagsList={tagsList}
          removeItem={removeItem}
        />
      </div>
    );
  }


  return (
    <div className={styles.master_project__container}>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-center">{projectData?.title}</h1>
        {isLoading ? <div className=""></div> : null}
        <h1 className="focus:outline-none text-[#888888] text-center">
          {projectData?.description}
        </h1>
        {isLoading ? (
          <div className="w-[120px] h-[20px] bg-[#D3D3D3] rounded-md mb-[12px] animate-blinkTitle"></div>
        ) : null}
        {isLoading ? (
          <div className="w-[90px] h-[10px] bg-[#E8E9EB] rounded-md animate-blinkSpan"></div>
        ) : null}
      </div>
      <div className="flex justify-center items-center gap-2 mt-4 mb-5">
        <button
          onClick={() => {
            setIsDragAndDropOpened(true);
            setIsTagsOpen(false);
          }}
        >
          <IconAddNew />
        </button>
        <button
          onClick={() => {
            setIsTagsOpen(true);
            setIsDragAndDropOpened(false);
          }}
        >
          <Tabs />
        </button>
        <button onClick={() => {}}>
          <Save />
        </button>
      </div>

      {isDragAndDropOpened ? (
        <div className={styles.dragAndDropPosition}>
          <div className={styles.dragAndDropFormContainer}>
            <div className={styles.buttonSection}>
              <button
                onClick={() => setIsDragAndDropOpened(false)}
                className={styles.cancelButton}
              >
                <img src={CancelIcon} width={24} height={24} alt="Cancel" />
              </button>
            </div>
            <input
              onChange={handleDragAndDrop}
              type="file"
              multiple
              className={styles.dragAndDropInput}
              accept=".jpg, .jpeg, .png"
            />
            <div className={styles.dragAndDropFormBackground}></div>

            <div className={styles.dragAndDropTextContainer}>
              <div className={styles.dragAndDropTextTitle}>
                Drop High Resolution files here
              </div>
              <span className={styles.dragAndDropTextSpan}>
                Upload{" "}
                <span style={{ borderBottom: "1px solid #343434" }}>
                  High Resolution JPG files
                </span>{" "}
                by dropping them into this window
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <ImageCard imageList={imageList} files={files} uploadProgress={uploadProgress}/>

      {isLoading ? <Skeleton skeletons={skeletons} /> : null}
    </div>
  );
};

export default MasterProjectPage;
