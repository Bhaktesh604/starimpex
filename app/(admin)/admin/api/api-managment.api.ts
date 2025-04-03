import { getAdminAxiosInstance } from "@/config/axios.config";
import { ApiResponse } from "@/interfaces/response.interface";

export const geApiListApi = async (): Promise<ApiResponse> => {
  const resp = await getAdminAxiosInstance().get(`/diamond-source/list`);
  return resp?.data;
};

export const updateMarkupApi = async (
  sourceType: string = "",
  markupPercentage: number
): Promise<ApiResponse> => {
  const body: any = {
    sourceType,
    markupPercentage
  };

  const resp = await getAdminAxiosInstance().put(
    "/diamond-source/update-markup",
    body
  );

  return resp?.data;
};

export const enableDisableSourceTypeApi = async (
  sourceType: string = "",
  isDisabled: Boolean = false
): Promise<ApiResponse> => {
  const body: any = {
    sourceType,
    isDisabled
  };

  const resp = await getAdminAxiosInstance().put(
    "/diamond-source/active",
    body
  );

  return resp?.data;
};