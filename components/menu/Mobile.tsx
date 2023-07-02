import React, { useState } from 'react';
import type { MenuItem } from '@components/NavBar';
import MainItem from '@components/menu/mobileMenuComponents/MainItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';

function classNames (...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const subElement = (
    { name, href, icon }: { name: string, href: string, icon: JSX.Element }
) => {
    return (
        <button type="button"
            className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
            New
        </button>
    );
};

const MobileMenu = (
    { user, menuItems, userMenuItems }: MenuItem
) => {
    const [subMenu, setSubMenu] = useState<{name: string; href: string}[]>();

    const homeItem = {
        name: 'Accueil',
        href: '/',
        icon: <FontAwesomeIcon icon={faHome} className={'mr-2'} />,
    };

    const UserItem = {
        name: 'Settings',
        href: '#',
        icon: <FontAwesomeIcon icon={faUser} className={'mr-2'} />,
        subMenu: [
            {
                name: 'Profile',
                href: '/profile',
            },
            {
                name: 'Settings',
                href: '/settings',
            },
            {
                name: 'Sign out',
                href: '/logout',
            }
        ]
    };

    return (

        <div
            className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600 md:hidden">
            <div className="w-full">
                {subMenu?.map((item, index) => (
                    <Link key={index} href={item.href}
                        className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="flex justify-between h-full max-w-md mx-auto">
                {menuItems.map((item, index) => (
                    <MainItem key={index + 1} {...item} setSubMenu={setSubMenu} />
                ))}
                <MainItem key={menuItems.length + 1} setSubMenu={setSubMenu} {...UserItem} />
            </div>
        </div>
    );
};

export default MobileMenu;
