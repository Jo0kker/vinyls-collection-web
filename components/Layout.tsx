import Link from 'next/link';
import Lottie from 'lottie-react';

import NavBar from '@components/NavBar';
import vinylsAnimation from '@assets/lottieJson/17807-sound-animation.json';

import type { FunctionComponent, PropsWithChildren } from 'react';

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div
            className={
                'bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800 w-auto min-h-screen'
            }
        >
            <NavBar />
            <div className={'flex justify-center mb-14 drop-shadow-2xl'}>
                <Link href={'/'}>
                    <h1
                        className={
                            'leading-relaxed flex flex-col mt-8 items-center text-white font-bold z-10 drop-shadow-2xl shadow-blue-600'
                        }
                    >
                        <Lottie
                            animationData={vinylsAnimation}
                            className={
                                'sm:w-96 w-56 absolute sm:-top-[89px] opacity-50 -top-11 -z-10'
                            }
                        />
                        <span
                            className={
                                'font-black text-transparent text-5xl pb-5 leading-relaxed sm:text-8xl bg-clip-text bg-gradient-to-l bgr from-red-500 via-yellow-500 to-blue-800'
                            }
                        >
                            Vinyls
                        </span>
                        <br />
                        Collection
                    </h1>
                </Link>
            </div>
            {children}
        </div>
    );
};
