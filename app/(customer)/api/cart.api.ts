import { getUserAxiosInstance } from "@/config/axios.config";
import { PAGE_LIMIT } from "@/utils/constants";

export const addToCartApi = async (diamondIds: string[] = []) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    itemIds: diamondIds,
  };

  const resp = await axiosInstance.post(`/cart/add`, body);
  return resp.data;
};

export const getCartList = async (skip: number = 0, limit: number = PAGE_LIMIT) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  const resp = await getUserAxiosInstance().get(`/cart/list?${queryParams}`);
  return resp.data;
};

export const removeFromCartApi = async (diamondIds: string[] = []) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    data: {
      itemIds: diamondIds,
    },
  };
  const resp = await axiosInstance.delete(`/cart/remove`, body);
  return resp.data;
};
