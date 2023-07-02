import Lottie from 'lottie-react';
import loading from '@assets/lottieJson/88944-vinyl-loading.json';
import { Layout } from '@components/Layout';
import { Toaster } from 'react-hot-toast';
import Banner from '@components/Banner';
import NextNProgress from 'nextjs-progressbar';
import { FooterPerso } from '@components/FooterPerso';
import type { PropsWithChildren } from 'react';
import { useMe } from '../hooks/useUsers';

export const ProviderCustom = ({ children }: PropsWithChildren) => {
    const { isSuccess } = useMe({
        enabled: false
    });

    // if (typeof window === 'undefined' || (!isSuccess && !!token)) {
    //     return (
    //         <div
    //             className={
    //                 'flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800'
    //             }
    //         >
    //             <div
    //                 className={
    //                     'flex flex-col justify-center items-center opacity-30 w-1/2 h-1/2'
    //                 }
    //             >
    //                 <Lottie animationData={loading} />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <Layout>
            <Toaster />
            <Banner />
            <main className="flex flex-col items-center">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center bg-black bg-opacity-10 p-3 mb-8 rounded">
                        <NextNProgress />
                        {children}
                        <FooterPerso />
                    </div>
                </div>
            </main>
        </Layout>
    );
};
