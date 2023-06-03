import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { Layout } from '@components/Layout';
import Banner from '@components/Banner';
import { FooterPerso } from '@components/FooterPerso';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import { useBearStore } from '@store/useBearStore';
import axiosApiInstance from 'services/interceptorService';
import type { AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loading from '@assets/lottieJson/88944-vinyl-loading.json';

// TODO cf data -> ne me semble pas utilisé, si oui cela correspond à quoi ? (pour la définition du type)
export default function App ({ Component, pageProps, data }: AppProps | any) {
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
    }, []);

    return (
        (isReady && (
            <Layout initialData={data}>
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
