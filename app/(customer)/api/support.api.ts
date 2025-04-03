import { getUserAxiosInstance } from "@/config/axios.config";

export const getHelpApi = async (message: string) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    message: message,
  };

  const resp = await axiosInstance.post(`/support/help`, body);
  return resp.data;
};

export const sendFeedbackApi = async (rating: number, comment: string) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    rating: rating,
    comment: comment,
  };

  const resp = await axiosInstance.post(`/support/feedback`, body);
  return resp.data;
};

export const sendInquiryApi = async (
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  message: string,
  phone: string | null = "",
  diamondType: string | null = "",
  companyName: string | null = ""
) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    firstName,
    lastName,
    email,
    country,
    message,
    phone,
    diamondType,
    companyName,
  };

  const resp = await axiosInstance.post(`/support/inquiry`, body);
  return resp.data;
};

export const contactUsApi = async (
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  message: string,
  phone: string | null = ""
) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    firstName,
    lastName,
    email,
    country,
    message,
    phone,
  };

  const resp = await axiosInstance.post(`/support/contact`, body);
  return resp.data;
};
