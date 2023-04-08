import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axiosApiInstance from "../services/interceptorService";
import { AxiosResponse } from "axios";
import Lottie from "lottie-react";
import loading from "@assets/lottieJson/88944-vinyl-loading.json";
import { Layout } from "@components/Layout";
import { Toaster } from "react-hot-toast";
import Banner from "@components/Banner";
import NextNProgress from "nextjs-progressbar";
import { FooterPerso } from "@components/FooterPerso";
import { FunctionComponent, PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const ProviderCustom: FunctionComponent<Props> = ({ children }) => {
  // token in cookie
  const cookie = new Cookies();
  const token = cookie.get("token");

  const { isLoading, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axiosApiInstance.get("/users/me").then((res: AxiosResponse) => res.data),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div
        className={
          "flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800"
        }
      >
        <div
          className={
            "flex flex-col justify-center items-center opacity-30 w-1/2 h-1/2"
          }
        >
          <Lottie animationData={loading} />
        </div>
      </div>
    );
  }

  return (
    <Layout initialData={userData}>
      <Toaster />
      <Banner />
      <main className={"flex flex-col items-center"}>
        <div className={"container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
          <div
            className={
              "flex flex-col justify-center bg-black bg-opacity-10 p-3 mb-8 rounded"
            }
          >
            <NextNProgress />
            {children}
            <FooterPerso />
          </div>
        </div>
      </main>
    </Layout>
  );
};
