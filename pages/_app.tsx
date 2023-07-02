import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import {
    QueryClient,
    QueryClientProvider,
    Hydrate
} from '@tanstack/react-query';
import { ProviderCustom } from '@components/ProviderCustom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();
export default function App({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps<{ session: Session; dehydratedState: unknown }>) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ProviderCustom>
                        <Component {...pageProps} />
                    </ProviderCustom>
                </Hydrate>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </SessionProvider>
    );
}
