import React, { useState } from "react";
import { useParams } from "react-router-dom";

import iconAddNew from "@/assets/icon_add_new.svg";
import iconSave from "@/assets/icon_save.svg";
import iconLabel from "@/assets/icon_label.svg";
import Project from "@/components/Project/Project";
import { useGetProject } from "@/apiClient/hooks/projectHooks";
import styles from "./MasterProjectPage.module.scss";
import TagsForm from "../../components/TagsForm/TagsForm";

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
  const { projectId } = useParams();
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDragAndDropOpened, setIsDragAndDropOpened] = useState(false);
  const [files, setFiles] = useState<FileInterface[]>([]);
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

  const handleDragAndDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;

    if (fileList) {
      const newFiles: FileInterface[] = Array.from(fileList).map(
        (file, index) => ({
          id: index,
          name: file.name,
          size: file.size,
        })
      );
      setFiles([...files, ...newFiles]);
    }
  };

  const removeItem = (id: string) => {
    const updatedTagsList = tagsList.filter(tag => tag.id !== id);
    setTagsList(updatedTagsList);
  };

  const addItem = (name: string) => {
    const id = Date.now().toString();
    const newTag = { id: id, name: name };
    setTagsList([...tagsList, newTag]);
  };

  const closeForm=(value:boolean)=>{
    setIsTagsOpen(value);
  }

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
          onClick={() =>{ setIsDragAndDropOpened(true);
            setIsTagsOpen(false)
          }}
          className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full"
        >
          <img src={iconAddNew} />
        </button>
        <button
          onClick={() => {
            setIsTagsOpen(true);
            setIsDragAndDropOpened(false);
          }}
          className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full"
        >
          <img src={iconLabel} />
        </button>
        <button
          onClick={() => {}}
          className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full"
        >
          <img src={iconSave} />
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

      {isDragAndDropOpened ? (
        <div className={styles.dragAndDropFormContainer}>
          <input
            onChange={handleDragAndDrop}
            type="file"
            multiple
            className={styles.dragAndDropInput}
          />

          <div className={styles.dragAndDropTextContainer}>
            <div className={styles.dragAndDropTextTitle}>
              Drop files here to send them
            </div>
            <span className={styles.dragAndDropTextSpan}>in a quick way</span>
          </div>
        </div>
      ) : null}

      {isTagsOpen ? (
        <TagsForm closeForm={closeForm} addItem={addItem} tagsList={tagsList} removeItem={removeItem} />
      ) : null}
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
