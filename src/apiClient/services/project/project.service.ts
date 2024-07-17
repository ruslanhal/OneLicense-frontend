import {axiosClient} from "../../apiClient";
import {ICreateProject} from "./types/project.reqs.types";

export const createProject = async (data: ICreateProject) => {
  try {
    const response = await axiosClient.post("/project", data);
    console.log("-=-=-=-=-rsxios createProject", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const getProject = async (id: string) => {
  try {
    const response = await axiosClient.get(`/project/${id}`);
    console.log("-=-=-=-=-responsedata getProject", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};
