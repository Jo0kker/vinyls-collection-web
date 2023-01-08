import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useBearStore } from "@store/useBearStore";
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";

const axios = require("axios");
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      // get token from COOKIE
      const cookies = new Cookies();
      const accessToken = cookies.get("token");

      if (accessToken) {
        // check if token is expired
        const decodedToken: any = jwtDecode(accessToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          // token is expired
          // remove token from COOKIE
          cookies.remove("token");
          // remove token from store
          useBearStore.getState().logout();

          // try to refresh token
          const refreshToken = cookies.get("refreshToken");
          if (refreshToken) {
            try {
              const response = await axios.post("/api/auth/refresh", {
                refreshToken,
              });
              const newAccessToken = response.data.accessToken;
              const newRefreshToken = response.data.refreshToken;
              // set new token to COOKIE
              cookies.set("token", newAccessToken);
              cookies.set("refreshToken", newRefreshToken);
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          };
        }
      }
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
    if (
      (error.response?.status !== undefined &&
        error.response.status === 403 ||
        error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const cookies = new Cookies();
      const refreshToken = cookies.get("refreshToken");
      const response = await axiosApiInstance.post(
        "http://localhost:8000/oauth/token/refresh",
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
        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;
        // set new token to COOKIE
        cookies.set("token", newAccessToken);
        cookies.set("refreshToken", newRefreshToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
        return axiosApiInstance(originalRequest);
      } else {
        // remove token from COOKIE
        cookies.remove("token");
        cookies.remove("refreshToken");
        //clear redux store
        useBearStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
