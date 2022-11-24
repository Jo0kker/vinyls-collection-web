import { AxiosRequestConfig, AxiosResponse } from "axios";

const axios = require("axios");
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem("token");
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    } else {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    // set base url
    config.baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axiosApiInstance.post(
        "http://localhost:8000/api/token/refresh/",
        {
          refresh: refreshToken,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);
        return axiosApiInstance(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
