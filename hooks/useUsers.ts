import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Cookies } from "react-cookie";
import axiosApiInstance from "../services/interceptorService";
import { useBearStore } from "@store/useBearStore";
import { showToast } from "@utils/utils";
import { useRouter } from "next/router";

export const useLogin = (username: string, password: string) => {
  const router = useRouter();
  return useMutation(() => {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
        {
          grant_type: "password",
          client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
          username: username,
          password: password,
          scope: "",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: AxiosResponse) => {
        const cookie = new Cookies();
        cookie.set("token", response.data.access_token, {
          path: "/",
          maxAge: 31536000, // Expires after 1year
        });
        cookie.set("refresh_token", response.data.refresh_token, {
          path: "/",
          maxAge: 31536000, // Expires after 1year
        });
        cookie.set("expires_in", response.data.expires_in, {
          path: "/",
          maxAge: 31536000, // Expires after 1year
        });
      });
  });
};

export const fetchUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => {
      return axiosApiInstance.get("/users/me").then((res: AxiosResponse) => {
        return res.data;
      });
    },
    onSuccess: (data) => {
      useBearStore.setState({ user: data });
    },
  });
};
