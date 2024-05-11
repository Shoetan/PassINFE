import { getToken } from "@/utils/utils";
import axios from "axios"


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "content-type": "application/json",
  }
})

api.interceptors.request.use(
  (config) => {
    const accessToken = getToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api