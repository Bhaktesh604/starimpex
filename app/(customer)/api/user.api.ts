import { getUserAxiosInstance } from "@/config/axios.config"

export const getUserProfileApi = async () => {
    const resp = await getUserAxiosInstance().get('/self');

    return resp.data
}

export const changePasswordApi = async () => {
    const resp = await getUserAxiosInstance().post('/change-password');

    return resp.data
}