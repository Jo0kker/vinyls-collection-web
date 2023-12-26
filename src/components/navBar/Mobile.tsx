import React, { useState } from 'react'

import { faHome, faUser, faRightToBracket } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

import { MenuItem } from '@/app/navBar'
import MainItem from '@/components/navBar/mobileNavBar/MainItem'
import {verifyEmail} from "@/components/navBar/Desktop";
const MobileMenu = ({ session, links }: MenuItem) => {
    const [subMenu, setSubMenu] =
        useState<{ name: string; href?: string; onClick?: () => void }[]>()

    const homeItem = {
        name: 'Accueil',
        href: '/',
        icon: <FontAwesomeIcon icon={faHome} color="purple" className="mr-2" />
    }

    const UserItem = {
        name: 'Settings',
        href: '#',
        icon: <FontAwesomeIcon icon={faUser} color="purple" className="mr-2" />,
        subMenu: [
            {
                name: 'Profil',
                href: '/profil'
            },
            {
                name: 'Settings',
                href: '/settings'
            },
            {
                name: 'Sign out',
                onClick: signOut
            }
        ]
    }

    return (
        <div className="fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 border-t border-gray-200 bg-white pb-2 dark:border-gray-600 dark:bg-gray-700 md:hidden">
            {/* top part of navBar */}
            {subMenu?.length !== 0 && (
                <div className="w-full border-b-2 border-purple-700">
                    {session?.user?.email_verified_at && (
                      <button
                        onClick={() => verifyEmail(session)}
                        className="rounded-lg px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                      >
                          Verifier email
                      </button>
                    )}
                    {subMenu?.map(({href, name, onClick}, index) => (
                      <>
                          {href ? (
                            <Link
                              key={index}
                              href={href ? href : '#'}
                              className="rounded-lg px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                                >
                                    {name}
                                </Link>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => onClick?.()}
                                    className="rounded-lg px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                                >
                                    {name}
                                </button>
                            )}
                        </>
                    ))}
                </div>
            )}
            <div className="mx-auto flex h-full max-w-md justify-between">
                <MainItem name={homeItem.name} href={homeItem.href} icon={homeItem.icon} />
                {links(!!session, session?.user?.id).map(link => (
                    <MainItem key={link.href} href={link.href} name={link.name} icon={link.icon} />
                ))}
                {session ? (
                    <MainItem
                        href={UserItem.href}
                        name={UserItem.name}
                        icon={UserItem.icon}
                        subContent={UserItem.subMenu}
                        subMenu={subMenu}
                        setSubMenu={setSubMenu}
                    />
                ) : (
                    <MainItem
                        href="/login"
                        name="Login"
                        icon={
                            <FontAwesomeIcon
                                icon={faRightToBracket}
                                color="purple"
                                className="mr-2"
                            />
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default MobileMenu
