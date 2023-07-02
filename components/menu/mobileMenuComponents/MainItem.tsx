import Link from 'next/link';

type Item = {
    name: string;
    href: string;
    icon: JSX.Element;
    subMenu?: { name: string; href: string }[];
    setSubMenu?: (value: { name: string; href: string }[]) => void;
};

const MainItem = ({ name, href, icon, subMenu, setSubMenu }: Item) => {
    const onClick = () => {
        if (subMenu) {
            setSubMenu?.(subMenu);
        }
    };

    return (
        <>
            {!subMenu ? (
                <Link
                    href={href}
                    className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                    {icon}
                    <span className="sr-only">{name}</span>
                </Link>
            ) : (
                <>
                    <button
                        data-tooltip-target="tooltip-home"
                        type="button"
                        onClick={onClick}
                        className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        {icon}
                        <span className="sr-only">{name}</span>
                    </button>
                    <div
                        id="tooltip-home"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                        {name}
                        <div className="tooltip-arrow" data-popper-arrow="" />
                    </div>
                </>
            )}
        </>
    );
};

export default MainItem;
