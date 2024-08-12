import Link from 'next/link'

type Item = {
    name: string
    href: string
    icon: JSX.Element
    subContent?: { name: string; href?: string; onClick?: () => void }[]
    subMenu?: { name: string; href?: string; onClick?: () => void }[]
    setSubMenu?: (value: { name: string; href?: string; onClick?: () => void }[]) => void
}

const MainItem = ({ name, href, icon, subContent, subMenu, setSubMenu }: Item) => {
    const onClick = () => {
        if (subContent && setSubMenu) {
            setSubMenu(subMenu?.length ? [] : subContent)
        }
    }

    return (
        <>
            {!subContent ? (
                <Link
                    href={href}
                    className="group inline-flex flex-col items-center justify-center p-2 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                        className="group inline-flex flex-col items-center justify-center p-2 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        {icon}
                        <span className="sr-only">{name}</span>
                    </button>
                    <div
                        id="tooltip-home"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                        {name}
                        <div className="tooltip-arrow" data-popper-arrow="" />
                    </div>
                </>
            )}
        </>
    )
}

export default MainItem
