import {axiosClient} from "../../apiClient";
import {ICreateProject, IFileReq} from "./types/project.reqs.types";
import {IPresignedURL} from "./types/project.entities";
import axios from "axios";

export const createProject = async () => {
  try {
    const title = "Project Name";
    const description = "Studio Name";
    const response = await axiosClient.post("/project", {title, description});
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

export const updateProject = async (
  projectId: string,
  key: "title" | "description",
  dataField: string
) => {
  try {
    const payload = {
      [key]: dataField,
    };
    console.log("-=-=-=-=-=payload", payload);
    if (!dataField.length) return;

    const response = await axiosClient.patch(`/project/${projectId}`, payload);
    console.log("-=-=-=-=-=-response", response);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const deleteOneImage = async (projectId: string, imageId: string) => {
  try {
    const response = await axiosClient.delete(`/project/image`, {
      params: {
        projectId: projectId,
        imageId: imageId,
      },
    });
    console.log("-=-=-=-=-=-response", response);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await axiosClient.delete(
      `/project/delete-project/${projectId}`
    );
    console.log("-=-=-=-=-=-response", response);
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

export const searchProjects=async (searchString:string)=>{
  try{
    const response=await axiosClient.post('/project/search', {searchString:searchString});
    console.log(response.data)
    return response.data;

  }
  catch(error:any){
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
}


export const getAllProjects=async ()=>{
  try{
    const response=await axiosClient.get('/project');
    return response.data;
  }
  catch(error:any){
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
}

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

export const resortImages = async (
  projectId: string,
  data: {imageId: string; orderIndex: number}[]
) => {
  try {
    if (!data || !data?.length) return;
    console.log("-=-=-=-=-data", data);
    const response = await axiosClient.patch(
      `/project/resort-images/${projectId}`,
      {imageOrderArr: data}
    );
    console.log("-=-=-=-=-response", response);
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};
