import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import {
    QueryClient,
    QueryClientProvider,
    Hydrate
} from '@tanstack/react-query';
import { ProviderCustom } from '@components/ProviderCustom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ProviderCustom>
                    <Component {...pageProps} />
                </ProviderCustom>
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
