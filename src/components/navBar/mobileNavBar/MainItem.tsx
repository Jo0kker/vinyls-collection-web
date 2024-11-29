import Link from 'next/link'

type Item = {
    name: string
    href?: string
    icon: JSX.Element
    onClick?: () => void
    subContent?: { name: string; href?: string; onClick?: () => void }[]
    subMenu?: { name: string; href?: string; onClick?: () => void }[]
    setSubMenu?: (value: { name: string; href?: string; onClick?: () => void }[]) => void
}

const MainItem = ({ name, href, icon, onClick, subContent, subMenu, setSubMenu }: Item) => {
    const handleClick = () => {
        if (subContent && setSubMenu) {
            setSubMenu(subMenu?.length ? [] : subContent)
        }
    }

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="inline-flex flex-col items-center justify-center p-2 group md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
                {icon}
                <span className="sr-only">{name}</span>
            </button>
        )
    }

    return (
        <>
            {!subContent ? (
                <Link
                    href={href || '#'}
                    className="inline-flex flex-col items-center justify-center p-2 group md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    {icon}
                    <span className="sr-only">{name}</span>
                </Link>
            ) : (
                <>
                    <button
                        data-tooltip-target="tooltip-home"
                        type="button"
                        onClick={handleClick}
                        className="inline-flex flex-col items-center justify-center p-2 group md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
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
    )
}

export default MainItem
