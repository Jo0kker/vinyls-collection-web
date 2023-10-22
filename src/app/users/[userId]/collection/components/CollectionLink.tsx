'use client'

import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/classNames'

type CollectionLinkProps = {
    href: string
    label: string
}

export function CollectionLink({ href, label }: CollectionLinkProps) {
    const pathname = usePathname()
    const active = pathname === href

    return (
        <Link href={href}>
            <button
                role="link"
                className={cn(
                    'inline-flex w-full max-w-[310px] items-center justify-between rounded-md px-4 py-1 md:px-2',
                    active
                        ? 'bg-fuchsia-300 text-gray-900'
                        : 'bg-fuchsia-100 text-gray-700 hover:bg-fuchsia-200'
                )}
            >
                <div className="truncate text-left md:pr-3">{label}</div>
                <ArrowSmallRightIcon className="hidden h-[1.5rem] md:block" />
            </button>
        </Link>
    )
}
