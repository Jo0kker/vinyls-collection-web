'use client'

import { useState } from 'react'

import { faCompactDisc, faUserMusic, faComment } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

import { SoundAnimation } from '@/assets/lottie/SoundAnimation'
import { VinylLoading } from '@/assets/lottie/VinylLoading'
import { cn } from '@/utils/classNames'

const LINKS = [
    {
        name: 'Les vinyles',
        href: '/vinyls',
        icon: <FontAwesomeIcon icon={faCompactDisc} className="mr-2" />
    },
    {
        name: 'Les collectionneurs',
        href: '/collector',
        icon: <FontAwesomeIcon icon={faUserMusic} className="mr-2" />
    },
    {
        name: 'Forum',
        href: '/forum',
        icon: <FontAwesomeIcon icon={faComment} className="mr-2" />
    }
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="w-full">
            <nav className="w-full">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-4 md:px-0">
                    <div className="md:flex-1">
                        <Link href="/">
                            <span className="sr-only">Vinyls Collection</span>
                            <VinylLoading className="w-12" />
                        </Link>
                    </div>
                    <div className="flex md:order-2 md:flex  md:flex-1 md:justify-end">
                        <Link href="/login" className="mr-4 md:mr-0">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-3xl border border-red-700 bg-black bg-transparent bg-opacity-10 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-20 hover:text-amber-600"
                            >
                                Connexion / Inscription
                            </button>
                        </Link>
                        <button
                            className="text-bold inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent p-2 text-sm text-white outline-none hover:bg-gray-100 hover:outline-none focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200  md:hidden"
                            onClick={() => setMenuOpen(prev => !prev)}
                        >
                            {menuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                    <div
                        className={cn(
                            'w-full items-center justify-between md:order-1 md:flex md:w-auto',
                            { hidden: !menuOpen }
                        )}
                    >
                        <ul className="mt-4 flex flex-col space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:space-y-0 md:border-0 md:bg-transparent md:p-0">
                            {LINKS.map(link => (
                                <Link key={link.href} href={link.href}>
                                    <li className="cursor-pointer rounded-md p-3 font-body text-base font-medium text-gray-900 hover:bg-slate-200 hover:text-amber-600 md:rounded-none md:p-0 md:text-white md:hover:bg-transparent">
                                        {link.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="flex justify-center">
                <Link href="/">
                    <h1 className="relative z-10 mt-8 flex flex-col items-center font-bold leading-relaxed text-white shadow-blue-600 drop-shadow-2xl">
                        <SoundAnimation className="absolute w-56 opacity-50 sm:-top-[89px] sm:w-96" />
                        <span className="z-10 bg-gradient-to-l from-red-500 via-yellow-500 to-blue-800 bg-clip-text pb-5 text-5xl font-black leading-relaxed text-transparent sm:text-8xl">
                            Vinyls
                        </span>
                        <span className="mt-2">Collection</span>
                    </h1>
                </Link>
            </div>
        </header>
    )
}
