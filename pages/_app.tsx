import "@styles/globals.scss";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider, Hydrate} from "@tanstack/react-query";
import {Exemple} from "./Exemple";

const queryClient = new QueryClient();
export default function App({ Component, pageProps}: AppProps | any) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Exemple {...pageProps} component={Component} />
            </Hydrate>
        </QueryClientProvider>
    )
}