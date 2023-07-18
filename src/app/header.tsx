'use client'

import { Fragment, useEffect, useState } from 'react'

import {
    faCompactDisc,
    faUserMusic,
    faComment,
    faAlbumCollection
} from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'

import { SoundAnimation } from '@/assets/lottie/SoundAnimation'
import { VinylLoading } from '@/assets/lottie/VinylLoading'
import { cn } from '@/utils/classNames'

const LINKS = (isAuth?: boolean) => [
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
    ...(isAuth
        ? [
              {
                  name: 'Votre espace collectionneur',
                  href: '/collection',
                  icon: <FontAwesomeIcon icon={faAlbumCollection} className="mr-2" />
              }
          ]
        : []),
    {
        name: 'Forum',
        href: '/forum',
        icon: <FontAwesomeIcon icon={faComment} className="mr-2" />
    }
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const session = useSession()

    useEffect(() => {
        if (session.data?.user.error === 'RefreshAccessTokenError') signOut()
    }, [session])

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
                    <div className="relative z-50 flex md:order-2 md:flex md:flex-1 md:justify-end">
                        {session.data ? (
                            <AccountMenu session={session.data} />
                        ) : (
                            <Link href="/login" className="mr-4 md:mr-0">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-3xl border border-red-700 bg-black bg-transparent bg-opacity-10 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-20 hover:text-amber-600"
                                >
                                    Connexion / Inscription
                                </button>
                            </Link>
                        )}
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
                            'z-10 w-full items-center justify-between md:order-1 md:flex md:w-auto',
                            { hidden: !menuOpen }
                        )}
                    >
                        <ul className="mt-4 flex flex-col space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:space-y-0 md:border-0 md:bg-transparent md:p-0">
                            {LINKS(!!session.data).map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-900 hover:bg-slate-200 hover:text-amber-600 md:text-white md:hover:bg-transparent"
                                >
                                    <li className="cursor-pointer rounded-md p-3 font-body text-base font-medium  md:rounded-none md:p-0 ">
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
                    <h1 className="relative mt-8 flex flex-col items-center font-bold leading-relaxed text-white shadow-blue-600 drop-shadow-2xl">
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

function AccountMenu({ session }: { session: Session }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-3xl border border-red-700 bg-black bg-transparent bg-opacity-10 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-20">
                Mon compte
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="truncate text-sm font-medium text-gray-900">
                            {session.user.name}
                        </p>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/settings/profile"
                                    className={cn(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Mon profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/settings"
                                    className={cn(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Paramètres
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={cn(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={() => signOut()}
                                >
                                    Déconnexion
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
