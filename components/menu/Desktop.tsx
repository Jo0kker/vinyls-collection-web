import { Fragment } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import vinylsAnimation from '@assets/lottieJson/vinyl-loading.json';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useBearStore } from '@store/useBearStore';
import type { MenuItem } from '@components/NavBar';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const DesktopMenu = ({
    user,
    isMenuOpen,
    setIsMenuOpen,
    menuItems,
    userMenuItems
}: MenuItem) => {
    return (
        <Popover className="hidden relative bg-transparent z-40 font-roboto md:block">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <Link href="/">
                        <span className="sr-only">Vinyls Collection</span>
                        <Lottie
                            animationData={vinylsAnimation}
                            className={'w-12'}
                        />
                    </Link>
                </div>
                <div className="-my-2 -mr-2 md:hidden">
                    <Popover.Button
                        className="inline-flex items-center justify-center rounded-md p-2 bg-transparent text-white text-bold hover:outline-none outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Ouvrir menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                </div>
                <Popover.Group as="nav" className="hidden space-x-5 md:flex">
                    {menuItems.map((item, index) => (
                        <Link
                            href={item.href}
                            className="text-base font-medium text-white hover:text-amber-600"
                            key={index}
                        >
                            {item.name}
                        </Link>
                    ))}
                </Popover.Group>
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    {/* dropdown if user connect */}
                    {user ? (
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                {/* ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-3xl bg-black bg-opacity-10 hover:bg-opacity-20 border border-red-700 bg-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:text-orange-700" */}
                                <Menu.Button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-3xl bg-black bg-opacity-10 hover:bg-opacity-20 border border-red-700 bg-transparent px-4 py-2 text-base font-medium text-white shadow-sm">
                                    Mon compte
                                    <ChevronDownIcon
                                        className="-mr-1 ml-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

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
                                        <p className="text-sm">
                                            Connecté en tant que
                                        </p>
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {user.name}
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        {userMenuItems.map((item, index) => (
                                            <Menu.Item key={index}>
                                                {({ active }) => (
                                                    <Link
                                                        href={item.href}
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                    <div className="py-1">
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-sm'
                                                        )}
                                                        onClick={() => {
                                                            // call state to logout
                                                            useBearStore
                                                                .getState()
                                                                .logout();
                                                        }}
                                                    >
                                                        Déconnexion
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    ) : (
                        <Link
                            href="/login"
                            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-3xl bg-black bg-opacity-10 hover:bg-opacity-20 border border-red-700 bg-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:text-amber-600"
                        >
                            Connexion / Inscription
                        </Link>
                    )}
                </div>
            </div>
        </Popover>
    );
};

export default DesktopMenu;
