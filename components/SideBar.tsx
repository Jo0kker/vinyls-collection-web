import { Dropdown } from "flowbite-react";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type SideBarProps = {
  navItems: any[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

const SideBar = ({ navItems, activeTab, setActiveTab }: SideBarProps) => {
  return (
    <>
      <nav className="hidden md:block space-y-1" aria-label="Sidebar">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={`/collection/${item.id}`}
            className={classNames(
              item.current
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "flex items-center px-3 py-2 text-sm font-medium rounded-md"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            <span className="truncate">{item.name}</span>
            {item.count ? (
              <span
                className={classNames(
                  item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
                  "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
                )}
              >
                {item.count}
              </span>
            ) : null}
          </Link>
        ))}
      </nav>
      <div className={"md:hidden flex justify-center"}>
        <Dropdown label="Liste collection" inline={true}>
          {navItems.map((item) => (
            <Dropdown.Item
              key={item.name}
              onClick={() => setActiveTab(item.id)}
            >
              <Link href={`/collection/${item.id}`}>{item.name}</Link>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </>
  );
};

export default SideBar;
