import axios from "axios";
import { API_BASE_URL, TOKEN_KEY } from "../utils/constants";

export const getUserAxiosInstance = () => {
  return axios.create({
    baseURL: API_BASE_URL + "/user",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      "Content-Type": "application/json",
    },
  });
};

export const getAdminAxiosInstance = () => {
  return axios.create({
    baseURL: API_BASE_URL + "/admin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      "Content-Type": "application/json",
    },
  });
};
