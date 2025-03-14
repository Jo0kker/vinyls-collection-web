'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import { SoundAnimation } from '@/assets/lottie/SoundAnimation'

import NavBar from './navBar'

export default function Header() {
    const session = useSession()

    useEffect(() => {
        if (session.data?.user.error === 'RefreshAccessTokenError') signOut()
    }, [session])

    return (
        <header className="w-full px-4 pb-2 text-white md:px-0">
            <NavBar />

            <div className="flex justify-center">
                <div className="flex justify-center mb-6 drop-shadow-2xl">
                    <Link href="/">
                        <div className="relative flex flex-col items-center mt-4 font-bold text-white">
                            <div className="absolute -left-[1.5rem] -top-[1.5rem] bottom-0 right-0 z-[-1] opacity-50 sm:-left-[3rem] sm:-top-[4rem]">
                                <SoundAnimation className="w-[8rem] sm:w-[16rem]" />
                            </div>
                            <h1 className="z-10 flex flex-col items-center leading-relaxed shadow-blue-600 drop-shadow-2xl">
                                <span className="text-3xl font-black leading-relaxed text-transparent bgr bg-gradient-to-l from-red-500 via-yellow-500 to-blue-800 bg-clip-text sm:text-6xl sm:leading-tight">
                                    Vinyls
                                </span>
                                <span className="text-lg sm:text-xl">Collection</span>
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
