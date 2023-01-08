import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { faChevronDown } from "@fortawesome/pro-light-svg-icons";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type SideBarProps = {
  navItems: any[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

const SideBar = ({ navItems, activeTab, setActiveTab }: SideBarProps) => {
  const getActiveTab = (tab: number) => {
    // search navItems selected whete activeTab is equal to id
    if (navItems.find((item) => item.id === tab)) {
      return tab;
    } else {
      if (navItems.length > 0) {
        return navItems[0].id;
      }
    }
    return {
      name: "Aucune collection",
    };
  };

  return (
    <>
      <nav className="hidden md:block space-y-1" aria-label="Sidebar">
        {navItems.map((item) => (
          <Link key={item.id} href={`/collection/${item.id}`}>
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>
      <Listbox
        value={activeTab}
        onChange={(value) => {
          setActiveTab(navItems[value].id);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {
                (
                  navItems.find((item) => item.id === activeTab) || {
                    name: "Aucune collection",
                  }
                ).name
              }
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {navItems.map((item, index) => (
                <Listbox.Option
                  key={item.name}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-indigo-600" : "text-gray-900",
                      "cursor-default select-none relative py-2 pl-10 pr-4"
                    )
                  }
                  value={index}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-indigo-600",
                            "absolute inset-y-0 left-0 flex items-center pl-3"
                          )}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default SideBar;
