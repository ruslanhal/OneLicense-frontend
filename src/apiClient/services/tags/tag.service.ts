import {axiosClient} from "@/apiClient/apiClient";
import {ITag} from "./types/tag.entities";

export const createTag = async (title: string) => {
  try {
    const response = await axiosClient.post("/tag", {title});
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const addTagToProject = async (
  key: "title" | "tagId",
  value: string,
  projectId: string
) => {
  try {
    const payload = {
      [key]: value,
    };
    const response = await axiosClient.post(`/tag/${projectId}`, payload);
    console.log("-=-=-=-=-=-response data", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const getAllTags = async (): Promise<ITag[]> => {
  try {
    const response = await axiosClient.get(`/tag`);
    console.log("-=-=-=-=-=-getAllTags response data", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const getTAGSofProject = async (projectId: string): Promise<ITag[]> => {
  try {
    const response = await axiosClient.get(`/tag/tags/${projectId}`);
    //console.log("-=-=-=-=-=-getTAGSofProject response data", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const getPROJECTSofTag = async (tagId: string) => {
  try {
    const response = await axiosClient.get(`/tag/projects/${tagId}`);
    console.log("-=-=-=-=-=-getPROJECTSofTag response data", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const removeTAGfromProject = async (
  tagId: string,
  projectId: string
) => {
  try {
    const response = await axiosClient.delete(`/tag`, {
      params: {
        projectId,
        tagId,
      },
    });
    console.log("-=-=-=-=-=-removeTAGfromProject response data", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};
