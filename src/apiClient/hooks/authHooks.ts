import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "../apiClient";

export const authHook = () => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      const data = axiosClient.get("/auth/me");
      return data;
    },
  });
  return {
    isLoading,
    user,
    error,
  };
};
