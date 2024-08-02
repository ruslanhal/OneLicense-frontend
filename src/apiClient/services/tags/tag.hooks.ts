import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {getTAGSofProject} from "./tag.service";
import {ITag} from "./types/tag.entities";

export const useGetTAGSofProject = (projectId: string) => {
  const {
    isLoading,
    data: data,
    error,
    isError,
  } = useQuery<ITag[], AxiosError>({
    queryKey: ["tags", projectId],
    queryFn: async () => {
      const data = await getTAGSofProject(projectId);
      return data;
    },
  });
  return {
    isLoading,
    data,
    error,
  };
};
