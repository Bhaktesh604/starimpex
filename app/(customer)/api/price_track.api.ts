import { getUserAxiosInstance } from "@/config/axios.config";
import { PAGE_LIMIT } from "@/utils/constants";

export const addToPriceTrackApi = async (diamondIds: string[] = []) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    diamondIds: diamondIds,
  };

  const resp = await axiosInstance.post(`/price-track/add`, body);
  return resp.data;
};

export const getPriceTrackList = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  const resp = await getUserAxiosInstance().get(
    `/price-track/list?${queryParams}`
  );
  return resp.data;
};

export const removeFromPriceTrackApi = async (diamondIds: string[] = []) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    data: {
      diamondIds: diamondIds,
    },
  };
  const resp = await axiosInstance.delete(`/price-track/remove`, body);
  return resp.data;
};
