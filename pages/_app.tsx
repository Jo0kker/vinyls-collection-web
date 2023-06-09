import Lottie from 'lottie-react';
import { Cookies } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import NextNProgress from 'nextjs-progressbar';

import '@styles/globals.scss';
import Banner from '@components/Banner';
import { Layout } from '@components/Layout';
import { useBearStore } from '@store/useBearStore';
import { FooterPerso } from '@components/FooterPerso';
import axiosApiInstance from '@services/interceptorService';
import loading from '@assets/lottieJson/88944-vinyl-loading.json';

import type { AppProps } from 'next/app';
import type { AxiosResponse } from 'axios';

export default function App ({ Component, pageProps }: AppProps) {
    const [isReady, setIsReady] = useState(false);

    // token in cookie
    const cookie = new Cookies();
    const token = cookie.get('token');

    useEffect(() => {
        if (token) {
            axiosApiInstance.get('/users/me').then((res: AxiosResponse) => {
                useBearStore.setState({ user: res.data });
                setIsReady(true);
            });
        }
        setIsReady(true);
    }, [token]);

    return (
        (isReady && (
            <Layout>
                <Toaster />
                <Banner />
                <main className={'flex flex-col items-center'}>
                    <div className={'container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
                        <div
                            className={
                                'flex flex-col justify-center bg-black bg-opacity-10 p-3 mb-8 rounded'
                            }
                        >
                            <NextNProgress />
                            <Component {...pageProps} />
                            <FooterPerso />
                        </div>
                    </div>
                </main>
            </Layout>
        )) || (
            <div
                className={
                    'flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800'
                }
            >
                <div
                    className={
                        'flex flex-col justify-center items-center opacity-30 w-1/2 h-1/2'
                    }
                >
                    <Lottie animationData={loading} />
                </div>
            </div>
        )
    );
}
