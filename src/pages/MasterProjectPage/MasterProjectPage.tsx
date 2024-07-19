import React, {useState} from "react";
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

interface FileInterface {
  id: number;
  name: string;
  size: number;
}

interface Tag {
  id: string;
  name: string;
}

const MasterProjectPage = (props: Props) => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const {isSuccess, projectData, error, mutate} = createProjectHook();
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
  const handleDragAndDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;

    if (!fileList) return;

    const newFiles = Array.from(fileList);

    const filesLength = files.length + newFiles.length;
    if (filesLength > 10) {
      // Переконайтеся, що ліміт 10 не перевищується
      console.error("You can only upload up to 10 files in total.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const formData = new FormData();

    // Додаємо файли до FormData
    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      console.log("-=-=-=-=formData", formData);
      const response = await axiosClient.post(
        `/project/upload/${projectId}`, // Переконайтеся, що `projectId` має правильне значення
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
        <h1 className=" focus:outline-none text-[#888888]   text-center ">
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
      {/*  <div className="flex flex-wrap justify-center">
        {projectData && (
          <Project
            title={projectData.title}
            author={"projectData.author"}
            imageUrl={"projectData.imageUrl"}
          />
        )}
      </div> */}

      {isDragAndDropOpened && files.length === 0 ? (
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
      ) : null}

      {isTagsOpen ? (
        <TagsForm
          closeForm={closeForm}
          addItem={addItem}
          tagsList={tagsList}
          removeItem={removeItem}
        />
      ) : null}

      <CardPrice
        title="vfrrvvrf"
        price="$15"
        author="wdeewddwewded"
        imageUrl="dcdwe"
      />
    </div>
  );
};

export default MasterProjectPage;

//  {/* <input
//         id="title"
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className=" focus:outline-none  text-2xl text-center focus:none appearance-none"
//         placeholder="Title"
//         required
//       /> */}

//   {/* <input
//   id="description"
//   type="text"
//   value={description}
//   onChange={(e) => setDescription(e.target.value)}
//   className=" focus:outline-none text-[#888888]   text-center focus:none appearance-none"
//   placeholder="Title"
//   required
// /> */}
