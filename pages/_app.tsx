import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import Banner from "@components/Banner";
import { FooterPerso } from "@components/FooterPerso";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { useBearStore } from "@store/useBearStore";
import axiosApiInstance from "services/interceptorService";
import { AxiosResponse } from "axios";
import { Cookies } from "react-cookie";

export default function App({ Component, pageProps, data }: AppProps | any) {
  // token in cookie
  const cookie = new Cookies();
  const token = cookie.get("token");

  if (token) {
    // user with zustand
    axiosApiInstance.get("/users/me").then((res: AxiosResponse) => {
      useBearStore.setState({ user: res.data });
    });
  }

  return (
    <Layout initialData={data}>
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
            <Component {...pageProps} />
            <FooterPerso />
          </div>
        </div>
      </main>
    </Layout>
  );
}
