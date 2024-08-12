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
        <header className="w-full px-4 pb-4 text-white md:px-0">
            <NavBar />

            <div className="flex justify-center">
                <div className="mb-14 flex justify-center drop-shadow-2xl">
                    <Link href="/">
                        <div className="relative mt-8 flex flex-col items-center font-bold text-white">
                            <div className="absolute -left-[2rem] -top-[2rem] bottom-0 right-0 z-[-1] opacity-50 sm:-left-[4rem] sm:-top-[6rem]">
                                <SoundAnimation className="w-[12rem] sm:w-[25rem]" />
                            </div>
                            <h1 className="z-10 flex flex-col items-center leading-relaxed shadow-blue-600 drop-shadow-2xl">
                                <span className="bgr bg-gradient-to-l from-red-500 via-yellow-500 to-blue-800 bg-clip-text text-5xl font-black text-transparent sm:text-8xl sm:leading-tight leading-relaxed">
                                    Vinyls
                                </span>
                                <span>Collection</span>
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
