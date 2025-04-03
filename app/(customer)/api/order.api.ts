import { getUserAxiosInstance } from "@/config/axios.config";
import { PAGE_LIMIT } from "@/utils/constants";

export const createOrderApi = async (
  diamondIds: string[] = [],
  remarks: string,
  isTermsAccepted: boolean
) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    items: diamondIds,
    remarks: remarks,
    isTermsAccepted: isTermsAccepted,
  };

  const resp = await axiosInstance.post(`/order/create`, body);
  return resp.data;
};

export const getMyOrderList = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT,
  orderNumber: string | null = "",
  fromOrderDate: string | null = "",
  toOrderDate: string | null = "",
  fromAmount: string | null = "",
  toAmount: string | null = "",
  fromTotalItems: string | null = "",
  toTotalItems: string | null = "",
  fromCarats: string | null = "",
  toCarats: string | null = ""
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (orderNumber) {
    queryParams = `${queryParams}&orderNumber=${decodeURIComponent(
      orderNumber
    )}`;
  }
  if (fromOrderDate) {
    const fromDate = new Date(fromOrderDate);
    fromDate.setHours(0, 0, 0, 0);
    queryParams = `${queryParams}&fromOrderDate=${decodeURIComponent(
      fromDate.toISOString()
    )}`;
  }
  if (toOrderDate) {
    const toDate = new Date(toOrderDate);
    toDate.setHours(23, 59, 59, 999);
    queryParams = `${queryParams}&toOrderDate=${decodeURIComponent(
      toDate.toISOString()
    )}`;
  }
  if (fromAmount) {
    queryParams = `${queryParams}&fromAmount=${decodeURIComponent(fromAmount)}`;
  }
  if (toAmount) {
    queryParams = `${queryParams}&toAmount=${decodeURIComponent(toAmount)}`;
  }
  if (fromTotalItems) {
    queryParams = `${queryParams}&fromTotalItems=${decodeURIComponent(
      fromTotalItems
    )}`;
  }
  if (toTotalItems) {
    queryParams = `${queryParams}&toTotalItems=${decodeURIComponent(
      toTotalItems
    )}`;
  }
  if (fromCarats) {
    queryParams = `${queryParams}&fromCarats=${decodeURIComponent(fromCarats)}`;
  }
  if (toCarats) {
    queryParams = `${queryParams}&toCarats=${decodeURIComponent(toCarats)}`;
  }
  const resp = await getUserAxiosInstance().get(`/order/list?${queryParams}`);

  return resp.data;
};

export const getOrderDetail = async (diamondId: string = "") => {
  if (!diamondId) {
    return;
  }
  const resp = await getUserAxiosInstance().get(`/order/details/${diamondId}`);

  return resp.data;
};

export const exportOrderStonesDetailsToExcel = async (
  orderIds: string[] = []
) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    orderIds: orderIds,
  };

  const resp = await axiosInstance.post(`/order/export`, body, {
    responseType: "blob",
  });
  return resp;
};
