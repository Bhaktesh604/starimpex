import { getAdminAxiosInstance } from "@/config/axios.config";
import { ApiResponse } from "@/interfaces/response.interface";
import { PAGE_LIMIT } from "@/utils/constants";

export const getPurchaseListApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT,
  orderId: string | null = null,
  fromDate: string | null = null,
  toDate: string | null = null
): Promise<ApiResponse> => {
  let queryParams = `skip=${skip}&limit=${limit}`;

  if (orderId) {
    queryParams = `${queryParams}&orderId=${decodeURIComponent(orderId)}`;
  }

  if (fromDate) {
    const from = new Date(fromDate);
    from.setUTCHours(0, 0, 0, 0);
    queryParams = `${queryParams}&fromDate=${decodeURIComponent(
      from.toISOString()
    )}`;
  }

  if (toDate) {
    const to = new Date(toDate);
    to.setUTCHours(23, 59, 59, 999);
    queryParams = `${queryParams}&toDate=${decodeURIComponent(
      to.toISOString()
    )}`;
  }

  const resp = await getAdminAxiosInstance().get(
    `/purchase/list?${queryParams}`
  );
  return resp?.data;
};

export const createPurchaseApi = async (
  orderId: string,
  date: string,
  supplierName: string | null = "",
  supplierAddress: string | null = "",
  description: string | null = "",
  items: Array<{
    stoneId: string;
    finalRap: number;
    finalDiscount: number;
    finalPrice: number;
    finalTotalPrice: number;
  }>
): Promise<ApiResponse> => {
  const body = {
    orderId: orderId,
    date: date,
    supplierName: supplierName,
    supplierAddress: supplierAddress,
    description: description,
    items: items,
  };

  const resp = await getAdminAxiosInstance().post(`/purchase/create`, body);
  return resp.data;
};

export const updatePurchaseApi = async (
  purchaseId: string,
  orderId: string,
  date: string,
  supplierName: string | null = null,
  supplierAddress: string | null = null,
  description: string | null = null,
  items: Array<{
    stoneId: string;
    finalRap: number;
    finalDiscount: number;
    finalPrice: number;
    finalTotalPrice: number;
  }>
): Promise<ApiResponse> => {
  const body = {
    orderId: orderId,
    date: date,
    supplierName: supplierName,
    supplierAddress: supplierAddress,
    description: description,
    items: items,
  };

  const resp = await getAdminAxiosInstance().put(
    `/purchase/update/${purchaseId}`,
    body
  );

  return resp.data;
};

export const deletePurchaseApi = async (
  purchaseId: string
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().delete(`/purchase/${purchaseId}`);

  return resp.data;
};

export const getPurchaseDetailsApi = async (
  id: string = ""
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().get(`/purchase/details/${id}`);
  return resp?.data;
};

export const exportPurchaseStonesDetailsToExcel = async (
  purchaseIds: string[] = []
) => {
  const axiosInstance = getAdminAxiosInstance();
  const body = {
    purchaseIds: purchaseIds,
  };

  const resp = await axiosInstance.post(`/purchase/export`, body, {
    responseType: "blob",
  });
  return resp;
};
