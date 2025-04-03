import { getAdminAxiosInstance } from "@/config/axios.config";
import { ApiResponse } from "@/interfaces/response.interface";
import { PAGE_LIMIT } from "@/utils/constants";

export const getOrderListApi = async (
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
): Promise<ApiResponse> => {
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

  const resp = await getAdminAxiosInstance().get(`/order/list?${queryParams}`);
  return resp?.data;
};

export const getOrderDetailsApi = async (
  id: string = ""
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().get(`/order/details/` + id);
  return resp?.data;
};

export const addOrderAdditionalChargesApi = async (
  id: string = "",
  shippingCharge: number | null,
  additionalCharges: Array<[]> | null
): Promise<ApiResponse> => {
  const body: any = {
    shippingCharge,
  };

  if (additionalCharges) {
    body.additionalCharges = additionalCharges;
  }

  const resp = await getAdminAxiosInstance().put(
    "/order/additional-charges/" + id,
    body
  );

  return resp?.data;
};

export const changeOrderStatusApi = async (
  id: string = "",
  status: string = "",
  items: Array<[]> | null
): Promise<ApiResponse> => {
  const body: any = {
    status,
  };

  if (items) {
    body.items = items;
  }

  const resp = await getAdminAxiosInstance().put(
    "/order/change-status/" + id,
    body
  );

  return resp?.data;
};

export const exportOrderStonesDetailsToExcel = async (
  orderIds: string[] = []
) => {
  const axiosInstance = getAdminAxiosInstance();
  const body = {
    orderIds: orderIds,
  };

  const resp = await axiosInstance.post(`/order/export`, body, {
    responseType: "blob",
  });
  return resp;
};

export const getOrderItemsByOrderNumberApi = async (
  orderNumber: string = ""
): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().get(
    `/order/order-items/${orderNumber}`
  );
  return resp?.data;
};

export const createManualOrderApi = async (
  orderDate: string,
  companyName: string,
  companyEmail: string | null = null,
  description: string | null = null,
  orderItems: Array<{
    stoneNo: string;
    lab?: string;
    shape?: string;
    type?: string;
    rap: number;
    ourDiscount: number;
    pricePerCarat: number;
    ourPrice: number;
    caratWeight: number;
  }>
): Promise<ApiResponse> => {
  const body = {
    orderDate: orderDate,
    companyName: companyName,
    companyEmail: companyEmail,
    description: description,
    orderItems: orderItems,
  };

  const resp = await getAdminAxiosInstance().post(`/order/manual/add`, body);

  return resp.data;
};

export const editManualOrderApi = async (
  orderId: string,
  orderDate: string,
  companyName: string,
  companyEmail: string | null = null,
  description: string | null = null,
  orderItems: Array<{
    stoneNo: string;
    lab?: string;
    shape?: string;
    type?: string;
    rap: number;
    ourDiscount: number;
    pricePerCarat: number;
    ourPrice: number;
    caratWeight: number;
  }>
): Promise<ApiResponse> => {
  const body = {
    orderDate: orderDate,
    companyName: companyName,
    companyEmail: companyEmail,
    description: description,
    orderItems: orderItems,
  };

  const resp = await getAdminAxiosInstance().put(
    `/order/manual/update/${orderId}`,
    body
  );

  return resp.data;
};
