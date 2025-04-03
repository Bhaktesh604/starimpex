import { getAdminAxiosInstance } from "@/config/axios.config";
import { ApiResponse } from "@/interfaces/response.interface";
import { PAGE_LIMIT } from "@/utils/constants";

export const getUserListApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT
): Promise<ApiResponse> => {
  let queryParams = `skip=${skip}&limit=${limit}`;

  const resp = await getAdminAxiosInstance().get(`/user/list?${queryParams}`);
  return resp?.data;
};

export const changeUserStatusApi = async (
  id: string = "",
  status: string = ""
): Promise<ApiResponse> => {
  const body: any = {
    status,
  };

  const resp = await getAdminAxiosInstance().put(
    "/user/change-status/" + id,
    body
  );

  return resp?.data;
};

export const getUserDetailsApi = async (
  userId: string = ""
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().get(`/user/` + userId);
  return resp?.data;
};

export const getUserCartHistoryApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT,
  fromDate: string | null = "",
  toDate: string | null = ""
): Promise<ApiResponse> => {
  let queryParams = `skip=${skip}&limit=${limit}`;

  if (fromDate) {
    queryParams += `&fromDate=${fromDate}`;
  }
  if (toDate) {
    queryParams += `&toDate=${toDate}`;
  }

  const resp = await getAdminAxiosInstance().get(
    `/user/cart-history?${queryParams}`
  );
  return resp?.data;
};
export const getUserPriceTrackHistoryApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT,
  fromDate: string | null = "",
  toDate: string | null = ""
): Promise<ApiResponse> => {
  let queryParams = `skip=${skip}&limit=${limit}`;

  if (fromDate) {
    queryParams += `&fromDate=${fromDate}`;
  }
  if (toDate) {
    queryParams += `&toDate=${toDate}`;
  }

  const resp = await getAdminAxiosInstance().get(
    `/user/price-track-history?${queryParams}`
  );
  return resp?.data;
};

export const changeUserPasswordApi = async (
  id:string,
  password:string
) => {

  const body: any = {
    password,
  };

  const resp = await getAdminAxiosInstance().put('/user/change-password/'+ id,body);

  return resp?.data
}
