import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import Banner from "@components/Banner";
import { FooterPerso } from "@components/FooterPerso";

export default function App({ Component, pageProps, data }: AppProps | any) {
  return (
    <Layout initialData={data}>
      <Banner />
      <main className={"flex flex-col items-center"}>
        <div className={"container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
          <div
            className={
              "flex flex-col justify-center bg-black bg-opacity-10 p-3 mb-8 rounded"
            }
          >
            <Component {...pageProps} />
            <FooterPerso />
          </div>
        </div>
      </main>
    </Layout>
  );
}
