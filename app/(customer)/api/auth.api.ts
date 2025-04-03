import { getUserAxiosInstance } from "../../../config/axios.config";
import { ApiResponse } from "../../../interfaces/response.interface";

export const signupApi = async (
  firstName: string = "",
  lastName: string = "",
  companyName: string = "",
  address: string = "",
  state: string = "",
  city: string = "",
  country: string = "",
  email: string = "",
  password: string = "",
  mobileNumber: string = "",
  telephoneNumber: string = "",
  messengerType: string = "",
  messengerIdNumber: string = "",
  website: string = "",
  notes: string = ""
): Promise<ApiResponse> => {
  const body: any = {
    firstName,
    lastName,
    companyName,
    address,
    state,
    city,
    country,
    email,
    password,
  };

  if (mobileNumber) {
    body.mobileNumber = mobileNumber;
  }

  if (telephoneNumber) {
    body.telephoneNumber = telephoneNumber;
  }

  if (messengerType) {
    body.messengerType = messengerType;
  }

  if (messengerIdNumber) {
    body.messengerIdNumber = messengerIdNumber;
  }

  if (website) {
    body.website = website;
  }

  if (notes) {
    body.notes = notes;
  }

  const resp = await getUserAxiosInstance().post("/auth/signup", body);

  return resp.data;
};

export const loginApi = async (
  email: string = "",
  password: string = ""
): Promise<ApiResponse> => {
  const resp = await getUserAxiosInstance().post("/auth/login", {
    email,
    password,
  });

  return resp.data;
};

export const logoutApi = async (): Promise<ApiResponse> => {
  const resp = await getUserAxiosInstance().get("/auth/logout");

  return resp.data;
};

export const forgotPasswordApi = async (email: string = "") => {
  const resp = await getUserAxiosInstance().post("/auth/forgot-password", {
    email,
  });
  return resp.data;
};

export const resetPasswordApi = async (
  password: string = "",
  email: string = "",
  hash: string = ""
) => {
  const resp = await getUserAxiosInstance().post("/auth/reset-password", {
    password,
    email,
    hash,
  });
  return resp.data;
};
