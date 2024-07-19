import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import iconSave from "@/assets/icon_save.svg";
import Project from "@/components/Project/Project";
import {useGetProject} from "@/apiClient/hooks/projectHooks";
import styles from "./MasterProjectPage.module.scss";
import TagsForm from "../../components/TagsForm/TagsForm";
import IconAddNew from "@/assets/IconAddNew";
import Tabs from "@/assets/Tabs";
import Save from "@/assets/Save";
import CardPrice from "@/components/CardPrice/CardPrice";
import {axiosClient} from "@/apiClient/apiClient";

type Props = {};

interface Tag {
  id: string;
  name: string;
}

interface Image {
  title: string;
  price: string;
  author: string;
  thumbnailUrl: string;
}

const MasterProjectPage = (props: Props) => {
  const {projectId} = useParams();
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDragAndDropOpened, setIsDragAndDropOpened] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [tagsList, setTagsList] = useState<Tag[]>([
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
  ]);
  const [imageList, setImageList] = useState<Image[]>([]);

  const handleDragAndDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;

    if (!fileList) return;

    const newFiles = Array.from(fileList);

    const filesLength = files.length + newFiles.length;
    if (filesLength > 10) {
      console.error("You can only upload up to 10 files in total.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const formData = new FormData();

    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    console.log(projectId);
    try {
      setIsDragAndDropOpened(false);

      console.log("-=-=-=-=formData", formData);
      const response = await axiosClient.post(
        `/project/upload/${projectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);
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
    const newTag = {id: id, name: name};
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

        // const data = Array.from(response.data);
        // console.log("-=-=-=-=-=-=data", data);
        setImageList(response.data.images);

        console.log("-=-=-=-=imageList", imageList);

        console.log("Images:", imageList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (projectId) {
      fetchFiles();
    }
  }, [projectId]);

  if (!projectId) {
    return <div>Error: Project is not available</div>;
  }

  const {
    isLoading,
    project: projectData,
    error,
    isSuccess,
  } = useGetProject(projectId);

  return (
    <div className={styles.master_project__container}>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-center">{projectData?.title}</h1>
        <h1 className="focus:outline-none text-[#888888] text-center">
          {projectData?.description}
        </h1>
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
            <input
              onChange={handleDragAndDrop}
              type="file"
              multiple
              className={styles.dragAndDropInput}
              accept=".jpg, .jpeg, .png, .gif"
            />
            <div className={styles.dragAndDropFormBackground}></div>

            <div className={styles.dragAndDropTextContainer}>
              <div className={styles.dragAndDropTextTitle}>
                Drop High Resolution files here
              </div>
              <span className={styles.dragAndDropTextSpan}>
                Upload{" "}
                <span style={{borderBottom: "1px solid #343434"}}>
                  High Resolution JPG files
                </span>{" "}
                by dropping them into this window
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {isTagsOpen ? (
        <TagsForm
          closeForm={closeForm}
          addItem={addItem}
          tagsList={tagsList}
          removeItem={removeItem}
        />
      ) : null}
      <div className="flex flex-wrap justify-center">
        {Array.isArray(imageList) &&
          imageList.map((item, index) => (
            <CardPrice
              key={index}
              title={item.title || "vfrrvvrf"}
              price={item.price || "$15"}
              author={item.author || "wdeewddwewded"}
              imageUrl={item.thumbnailUrl || "dcdwe"}
            />
          ))}
      </div>
    </div>
  );
};

export default MasterProjectPage;
