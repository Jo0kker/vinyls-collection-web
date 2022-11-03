import { Popover, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Lottie from "lottie-react";
import vinylsAnimation from "@assets/lottieJson/vinyl-loading.json";

const NavBar: FunctionComponent = () => {
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
          <Link
            href="#"
            className="text-base font-medium text-white hover:text-orange-700"
          >
            Les vinyles
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-white hover:text-orange-700"
          >
            Les collectionneurs
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-white hover:text-orange-700"
          >
            Votre espace collectionneur
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-white hover:text-orange-700"
          >
            Forum
          </Link>
        </Popover.Group>
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <Link
            href="login"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-3xl bg-black bg-opacity-10 hover:bg-opacity-20 border border-red-700 bg-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:text-orange-700"
          >
            Connexion
          </Link>
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
                <div>
                  <Lottie
                    animationData={vinylsAnimation}
                    className={"w-12"}
                  ></Lottie>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-1 gap-4">
                <Link
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-orange-700"
                >
                  Les vinyles
                </Link>
                <Link
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-orange-700"
                >
                  Les collectionneurs
                </Link>
                <Link
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-orange-700"
                >
                  Votre espace collectionneur
                </Link>
                <Link
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-orange-700"
                >
                  Forum
                </Link>
              </div>
              <div className="mt-6">
                <Link
                  href="login"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-fuchsia-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                >
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NavBar;
