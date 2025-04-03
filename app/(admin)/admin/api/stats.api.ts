import { getAdminAxiosInstance } from "@/config/axios.config";
import { PAGE_LIMIT } from "@/utils/constants";

export const getDiamondSearchStatsApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT,
  fromDate: string | null = "",
  toDate: string | null = ""
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (fromDate) queryParams += `&fromDate=${fromDate}`;
  if (toDate) queryParams += `&toDate=${toDate}`;

  const resp = await getAdminAxiosInstance().get(
    `/stats/diamond-search?${queryParams}`
  );
  return resp?.data;
};
