import {axiosClient} from "../../apiClient";
import {ILoginReq, ISignUpReq} from "../../types/auth.reqs.types";

export const signUp = async (data: ISignUpReq) => {
  try {
    const response = await axiosClient.post("/auth/sign-up", data);
    console.log("-=-=-=-=-responsedata signup", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 400) {
      throw "Please provide all fields.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const login = async (data: ILoginReq) => {
  try {
    const response = await axiosClient.post("/auth/sign-in", data);
    console.log("-=-=-=-=-responsedata login", response.data);
    return response.data;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Wrong credentials.";
    }
    throw "Something went wrong, please try again later.";
  }
};

export const logout = async () => {
  try {
    await axiosClient.post("/auth/sign-out");
    return;
  } catch (error) {
    console.log("-=-=-=-=errro", error);
    if (error?.response?.status === 401) {
      throw "Unauthorized.";
    }
    throw "Something went wrong, please try again later.";
  }
};
