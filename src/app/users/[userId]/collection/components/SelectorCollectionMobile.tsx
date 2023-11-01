'use client'

import React, { PropsWithChildren } from 'react'

import { useRouter } from 'next/navigation'

type Props = {
    userId: number
    defaultValue: number
}
export const SelectorCollectionMobile = ({
    userId,
    defaultValue,
    children
}: PropsWithChildren<Props>) => {
    const router = useRouter()

    const mobileOnChangeCollection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        router.push(`/users/${userId}/collection/${value}`)
    }

    return (
        <select
            className="md:hidden"
            onChange={mobileOnChangeCollection}
            defaultValue={defaultValue}
        >
            {children}
        </select>
    )
}
