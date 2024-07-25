import {axiosClient} from "../../apiClient";
import {ICreateProject, IFileReq} from "./types/project.reqs.types";
import {IPresignedURL} from "./types/project.entities";
import axios from "axios";

export const createProject = async (data: ICreateProject) => {
  try {
    const response = await axiosClient.post("/project", data);
    //  console.log("-=-=-=-=-rsxios createProject", response.data);
    return response.data;
  } catch (error: any) {
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
    // console.log("-=-=-=-=-responsedata getProject", response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const getAllMyProjects = async () => {
  try {
    const response = await axiosClient.get("/project/my-projects");
    // console.log("-=-=-=-=-responsedata getProject", response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const generatePresignedUrls = async (
  projectId: string,
  files: IFileReq[]
) => {
  try {
    const response = await axiosClient.post(`/project/upload/${projectId}`, {
      files,
    });
    console.log("-=-=-=-=-responsedata generatePresignedUrls", response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

interface IWrapperUploadImages {
  url: string;
  formData: FormData;
  progressArr?: number[];
  index: number;
  setUploadProgress?: React.Dispatch<React.SetStateAction<number[]>>;
}

export const wrapperUploadImages = async (
  origData: IWrapperUploadImages,
  thumbnailData: IWrapperUploadImages
) => {
  return await Promise.all([
    uploadImageToS3(origData),
    uploadImageToS3(thumbnailData),
  ]);
};

export const uploadImageToS3 = async ({
  url,
  formData,
  progressArr,
  index,
  setUploadProgress,
}: IWrapperUploadImages) => {
  console.log("-=-=-=-=-=-progressArr", progressArr);
  await axios.post(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (!progressArr?.length || !setUploadProgress) return;
      console.log("-=-=-=-=-=-progressArr", progressArr);
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progressArr[index] = percent;
      setUploadProgress([...progressArr]);
    },
  });
};

export const compressImage = async (buffer: Buffer) => {
  const thumbnailBuffer = await sharp(buffer)
    .resize(300, 300, {fit: "inside", withoutEnlargement: true})
    .toBuffer();

  return thumbnailBuffer;
};
