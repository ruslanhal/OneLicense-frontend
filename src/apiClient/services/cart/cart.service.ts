import {axiosClient} from "@/apiClient/apiClient";
import {IAddImageToCartReq} from "./types/cart.reqs.types";
import {ICart, ICartProjectImage} from "./types/cart.entities";

export const getCart = async (): Promise<ICart> => {
  try {
    const response = await axiosClient.get("/cart");
    console.log("-=-=-=-=-responsedata getCart", response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const addImageToCart = async (
  reqData: IAddImageToCartReq
): Promise<ICartProjectImage> => {
  try {
    const response = await axiosClient.post("/cart", {...reqData});
    console.log("-=-=-=-=-responsedata addImageToCart", response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const removeImageFromCart = async (cartProjectImageId: string) => {
  try {
    const response = await axiosClient.delete(`/cart/${cartProjectImageId}`);
    console.log("-=-=-=-=-responsedata addImageToCart", response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unathorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};


export const getCartFromProject = async (projectId: string) => {
  try {
    const response = await axiosClient.get(`/cart/project_cart/${projectId}`);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("-=-=-=-=error", error);
    if (error?.response?.status === 401) {
      throw "Unauthorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};

