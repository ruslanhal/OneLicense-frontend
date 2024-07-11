import {TCreatorSchema, TSupplierSchema} from "@/pages/Auth/types/types";
import axios, {AxiosError} from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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

export interface ISignUpReq {
  role: "creator" | "supplier";
  userData: {
    email: string;
    password: string;
  };
  creatorData?: {
    firstName: string;
    surname: string;
  } | null;

  supplierData?: {
    businessName: string;
  } | null;
}

export interface ILoginReq {
  email: string;
  password: string;
}
