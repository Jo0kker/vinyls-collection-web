import React, { Fragment, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { MenuItem } from '@/app/navBar'
import { VinylLoading } from '@/assets/lottie/VinylLoading'
import { cn } from '@/utils/classNames'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useModalSearchStore from '@/store/modalSearchStore'

const DesktopMenu = ({ session, links }: MenuItem) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const openModal = useModalSearchStore((state) => state.openModal)

    return (
        <nav className="relative z-40 hidden w-full bg-transparent font-roboto md:block">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-4 mx-auto md:px-0">
                <div className="md:flex-1">
                    <Link href="/">
                        <span className="sr-only">Vinyls Collection</span>
                        <VinylLoading className="w-12" />
                    </Link>
                </div>

                <div className="relative z-50 flex md:order-2 md:flex md:flex-1 md:justify-end">
                    {session ? (
                        <AccountMenu session={session} />
                    ) : (
                        <Link href="/login" className="mr-4 md:mr-0">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-transparent bg-black border border-red-700 shadow-sm whitespace-nowrap rounded-3xl bg-opacity-10 hover:bg-opacity-20 hover:text-amber-600"
                            >
                                Connexion / Inscription
                            </button>
                        </Link>
                    )}
                    <button
                        className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-white bg-transparent rounded-md outline-none text-bold hover:bg-gray-100 hover:outline-none focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 md:hidden"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        {menuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
                <div
                    className={cn(
                        'z-10 w-full items-center justify-between md:order-1 md:flex md:w-auto',
                        { hidden: !menuOpen }
                    )}
                >
                    <ul className="flex flex-col items-center p-4 mt-4 space-y-2 font-medium border border-gray-100 rounded-lg justify-normal bg-gray-50 md:mt-0 md:flex-row md:space-x-8 md:space-y-0 md:border-0 md:bg-transparent md:p-0">
                        <li className="p-3 text-base font-medium rounded-md cursor-pointer font-body md:rounded-none md:p-0 ">
                            <button
                                onClick={openModal}
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 mr-2 text-purple-400" size='lg' />
                            </button>
                        </li>
                        {links(!!session, session?.user.id).map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-900 hover:bg-slate-200 hover:text-amber-600 md:text-white md:hover:bg-transparent"
                            >
                                <li className="p-3 text-base font-medium rounded-md cursor-pointer font-body md:rounded-none md:p-0 ">
                                    {link.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export function verifyEmail(session: Session | undefined | null) {
    fetchAPI('/email/resend', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.access_token}`
        }
    })
        .then(() => {
            showToast({
                type: 'success',
                message: 'Email de vérification renvoyé'
            })
        })
        .catch(r => {
            showToast({
                type: 'error',
                message: JSON.parse(r.message).msg
            })
        })
}

function AccountMenu({ session }: { session: Session }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-transparent bg-black border border-red-700 shadow-sm whitespace-nowrap rounded-3xl bg-opacity-10 hover:bg-opacity-20">
                Mon compte
                <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {session.user.name}
                        </p>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/settings/profil"
                                    key="profil"
                                    className={cn(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Mon profil
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/settings/security"
                                    key="security"
                                    className={cn(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Sécurité
                                </Link>
                            )}
                        </Menu.Item>
                        {!session?.user.email_verified_at && (
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => verifyEmail(session)}
                                        className={cn(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Renvoyer l'email de vérification
                                    </button>
                                )}
                            </Menu.Item>
                        )}
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
export default DesktopMenu
