import { getAdminAxiosInstance } from "@/config/axios.config";
import { PAGE_LIMIT } from "@/utils/constants";

export const getContactListApi = async (
  skip: number | null = 0,
  limit: number | null = PAGE_LIMIT,
  status: string | null,
  search: string | null
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (search) {
    queryParams += `&search=${search}`;
  }
  if (status) {
    queryParams += `&status=${status}`;
  }

  const resp = await getAdminAxiosInstance().get(
    `/support/contact/list?${queryParams}`
  );

  return resp.data;
};

export const getInquiryListApi = async (
  skip: number | null = 0,
  limit: number | null = PAGE_LIMIT,
  status: string | null,
  search: string | null
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (search) {
    queryParams += `&search=${search}`;
  }
  if (status) {
    queryParams += `&status=${status}`;
  }
  const resp = await getAdminAxiosInstance().get(
    `/support/inquiry/list?${queryParams}`
  );

  return resp.data;
};

export const getFeedbackListApi = async (
  skip: number | null = 0,
  limit: number | null = PAGE_LIMIT,
  userId: string | null = ""
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (userId) {
    queryParams = `${queryParams}&user=${userId}`;
  }

  const resp = await getAdminAxiosInstance().get(
    `/support/feedback/list?${queryParams}`
  );

  return resp.data;
};

export const getCustomerQueryListApi = async (
  skip: number | null = 0,
  limit: number | null = PAGE_LIMIT,
  userId: string | null = "",
  status: string | null = ""
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (userId) {
    queryParams = `${queryParams}&user=${userId}`;
  }
  if (status) {
    queryParams = `${queryParams}&status=${status}`;
  }
  const resp = await getAdminAxiosInstance().get(
    `/support/help/list?${queryParams}`
  );

  return resp.data;
};

export const changeContactRequestStatusApi = async (
  contactId: string,
  status: "pending" | "resolved" | "closed"
) => {
  const payload = {
    status: status,
  };

  const resp = await getAdminAxiosInstance().put(
    `/support/contact/change-status/${contactId}`,
    payload
  );

  return resp.data;
};

export const changeInquiryRequestStatusApi = async (
  inquiryId: string,
  status: "pending" | "resolved" | "closed"
) => {
  const payload = {
    status: status,
  };

  const resp = await getAdminAxiosInstance().put(
    `/support/inquiry/change-status/${inquiryId}`,
    payload
  );

  return resp.data;
};

export const changeCustomerQueryRequestStatusApi = async (
  queryId: string,
  status: "pending" | "resolved" | "closed"
) => {
  const payload = {
    status: status,
  };

  const resp = await getAdminAxiosInstance().put(
    `/support/help/change-status/${queryId}`,
    payload
  );

  return resp.data;
};
