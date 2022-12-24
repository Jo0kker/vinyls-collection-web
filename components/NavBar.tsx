import { Menu, Popover, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useState } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Lottie from "lottie-react";
import vinylsAnimation from "@assets/lottieJson/vinyl-loading.json";
import { useBearStore } from "@store/useBearStore";
import { showToast } from "@utils/utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar: FunctionComponent = () => {
  const user = useBearStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState();

  const menuItems = [
    {
      name: "Les vinyles",
      href: "/vinyls",
    },
    {
      name: "Les collectionneurs",
      href: "/collector",
    },
    {
      name: "Votre espace collectionneur",
      href: "/#",
    },
    {
      name: "Forum",
      href: "/#",
    }
  ];

  const userMenuItems = [
    {
      name: "Mon profil",
      href: "/#",
    },
    {
      name: "Paramètres",
      href: "/#",
    }
  ];

  return (
    <Popover className="relative bg-transparent z-40 font-roboto">
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <span className="sr-only">Vinyls Collection</span>
            <Lottie animationData={vinylsAnimation} className={"w-12"}></Lottie>
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 bg-transparent text-white text-bold hover:outline-none outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
            <Menu as="div" className="relative inline-block text-left">
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
                    <p className="text-sm">Connecté en tant que</p>
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
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
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
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                            onClick={() => {
                              // call state to logout
                              useBearStore.getState().logout();
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
              href="login"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-3xl bg-black bg-opacity-10 hover:bg-opacity-20 border border-red-700 bg-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:text-amber-600"
            >
              Connexion / Inscription
            </Link>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Link href={"/"}>
                  <Lottie
                    animationData={vinylsAnimation}
                    className={"w-12"}
                  ></Lottie>
                </Link>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Fermer menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-1 gap-4">
                {menuItems.map((item, index) => (
                  <Link
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-amber-600"
                    key={index}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                {user ? (
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
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
                          <p className="text-sm">Connecté en tant que</p>
                          <p className="truncate text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Profil
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Paramètres
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                  onClick={() => {
                                    useBearStore.getState().logout();
                                    showToast(
                                      "success",
                                      "Vous êtes déconnecté"
                                    );
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
                    href="login"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-fuchsia-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                  >
                    Connexion / Inscription
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NavBar;
