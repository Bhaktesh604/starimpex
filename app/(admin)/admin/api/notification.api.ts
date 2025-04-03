import { getAdminAxiosInstance } from "@/config/axios.config";
import { ApiResponse } from "@/interfaces/response.interface";
import { PAGE_LIMIT } from "@/utils/constants";

export const getNotificationListApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT
): Promise<ApiResponse> => {
  let queryParams = `skip=${skip}&limit=${limit}`;

  const resp = await getAdminAxiosInstance().get(
    `/notification?${queryParams}`
  );
  return resp?.data;
};

export const markNotificationReadApi = async (
  id: string
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().get(`/notification/read/${id}`);
  return resp?.data;
};

export const clearSingleNotificationApi = async (
  id: string
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().delete(
    `/notification/clear/${id}`
  );
  return resp?.data;
};

export const clearAllNotificationApi = async (): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().delete(`/notification/clear-all`);
  return resp?.data;
};
