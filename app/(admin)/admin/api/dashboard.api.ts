import { getAdminAxiosInstance } from "@/config/axios.config";

export const getAdminDashboardData = async () => {
  const resp = await getAdminAxiosInstance().get(`/dashboard/stats`);

  return resp.data;
};
