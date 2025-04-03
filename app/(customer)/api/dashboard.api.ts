import { getUserAxiosInstance } from "@/config/axios.config";

export const getDashboardData = async () => {
  const resp = await getUserAxiosInstance().get(`/dashboard/stats`);

  return resp.data;
};
