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
                        <h1 className="z-10 mt-8 flex flex-col items-center font-bold leading-relaxed text-white shadow-blue-600 drop-shadow-2xl">
                            <SoundAnimation className="absolute -top-11 -z-10 w-56 opacity-50 sm:-top-[89px] sm:w-96" />
                            <span className="bgr bg-gradient-to-l from-red-500 via-yellow-500 to-blue-800 bg-clip-text pb-5 text-5xl font-black leading-relaxed text-transparent sm:text-8xl">
                                Vinyls
                            </span>
                            <span>Collection</span>
                        </h1>
                    </Link>
                </div>
            </div>
        </header>
    )
}
