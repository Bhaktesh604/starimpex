import { getAdminAxiosInstance } from "@/config/axios.config";
import { ApiResponse } from "@/interfaces/response.interface";

export const adminLoginApi = async (
  username: string = "",
  password: string = "",
  fcmToken: string = ""
): Promise<ApiResponse> => {
  const data:any = {
    username,
    password,
  }
  if(fcmToken){
    data.fcmToken = fcmToken;
  }

  const resp = await getAdminAxiosInstance().post("/auth/login", data);

  return resp.data;
};

export const adminLogoutApi = async (
  fcmToken: string = ""
): Promise<ApiResponse> => {
  const data:any = {}
  if(fcmToken){
    data.fcmToken = fcmToken;
  }

  const resp = await getAdminAxiosInstance().post("/auth/logout", data);

  return resp.data;
};
