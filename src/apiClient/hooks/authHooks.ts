import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "../apiClient";
import {IUser} from "@/common/types/user.types";
import {AxiosError} from "axios";

export const authHook = () => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery<IUser, AxiosError>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosClient.get("/auth/me");
      return response.data;
    },
  });
  return {
    isLoading,
    user,
    error,
  };
};
