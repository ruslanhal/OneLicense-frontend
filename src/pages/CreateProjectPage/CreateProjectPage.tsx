import React, {useState} from "react";

import labelIcon from "@/assets/Icon_label.svg";
import saveIcon from "@/assets/icon_save.svg";
import Button from "@/components/Button/Button";
import {createProjectHook} from "@/apiClient/hooks/projectHooks";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {
  ICreateProject,
  IProject,
} from "@/apiClient/services/project/types/project.reqs.types";
import {createProject} from "@/apiClient/services/project/project.service";
import {AxiosError} from "axios";

type Props = {};

const CreateProjectPage = (props: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // const handleSuccess = (projectData: IProject) => {
  //   console.log("Project created successfully:", projectData);
  //   navigate(`/master-project/${projectData.id}`);
  // };

  // const {isSuccess, projectData, error, mutateAsync, mutate} =
  //   createProjectHook(handleSuccess);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const data = await createProject({title, description});
  //     console.log("-==-=-=-=-=--response data", data);

  //     navigate(`/master-project/${data.id}`);
  //   } catch (error) {
  //     console.error("Error creating project:", error);
  //   }
  // };
  return (
    <div className="flex flex-col items-center">
      {/* <form onSubmit={handleSubmit} className="flex flex-col items-center "> */}
      <div className="flex flex-col items-center">
        <textarea
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" focus:outline-none  text-2xl text-center focus:none appearance-none"
          placeholder="Title"
          required
        />
      </div>

      <div className="flex flex-col items-center mb-4">
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" focus:outline-none text-[#888888]   text-center focus:none appearance-none"
          placeholder="Description"
          required
        />
      </div>
      <Button text="Create Project" styleType="button_create_dark" />
      {/* </form> */}
    </div>
  );
};

export default CreateProjectPage;
