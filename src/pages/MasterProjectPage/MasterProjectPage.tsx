import React, {useState} from "react";
import {useParams} from "react-router-dom";

import iconAddNew from "@/assets/icon_add_new.svg";
import iconSave from "@/assets/icon_save.svg";
import iconLabel from "@/assets/icon_label.svg";
import Project from "@/components/Project/Project";
import {useGetProject} from "@/apiClient/hooks/projectHooks";

type Props = {};

const MasterProjectPage = (props: Props) => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const {isSuccess, projectData, error, mutate} = createProjectHook();
  const {projectId} = useParams();

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
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-center">{projectData?.title}</h1>
        <h1 className=" focus:outline-none text-[#888888]   text-center ">
          {projectData?.description}
        </h1>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4 mb-5">
        <button
          onClick={() => {}}
          className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full"
        >
          <img src={iconAddNew} />
        </button>
        <button
          onClick={() => {}}
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
      <div className="flex flex-wrap justify-center">
        {projectData && (
          <Project
            title={projectData.title}
            author={"projectData.author"}
            imageUrl={"projectData.imageUrl"}
          />
        )}
      </div>
    </>
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
