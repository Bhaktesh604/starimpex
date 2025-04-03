import { getAdminAxiosInstance } from "@/config/axios.config";

export const exportReportToExcel = async (
  reportType: any,
  fromDate: any,
  toDate: any
) => {
  const axiosInstance = getAdminAxiosInstance();
  const query = new URLSearchParams({
    reportType,
    fromDate,
    toDate,
  }).toString();

  try {
    const response = await axiosInstance.get(`/report/export?${query}`, {
      responseType: "blob",
    });

    return response;
  } catch (error) {
    console.error("Error exporting report to Excel:", error);
    throw error;
  }
};
