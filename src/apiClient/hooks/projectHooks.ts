import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosClient} from "../apiClient";
import {IUser} from "@/common/types/user.types";
import {AxiosError} from "axios";
import {createProject, getProject} from "../services/project/project.service";
import {
  ICreateProject,
  IProject,
} from "../services/project/types/project.reqs.types";

export const createProjectHook = (onSuccess: (data: IProject) => void) => {
  const {
    isSuccess,
    data: projectData,
    error,
    mutate,
    mutateAsync,
  } = useMutation<IProject, AxiosError, ICreateProject>({
    mutationKey: ["create-project"],
    mutationFn: async (data: ICreateProject) => {
      const response = await createProject();
      return response.data;
    },
    onSuccess,
  });
  console.log("-=-=-=-=-createProjectHook data", projectData);

  return {
    isSuccess,
    projectData,
    error,
    mutate,
    mutateAsync,
  };
};

export const useGetProject = (id: string) => {
  const {
    isLoading,
    data: project,
    error,
    isSuccess,
  } = useQuery<IProject, AxiosError>({
    queryKey: ["project", id],
    queryFn: async () => {
      const data = await getProject(id);
      return data;
    },
  });
  return {
    isLoading,
    project,
    error,
    isSuccess,
  };
};
