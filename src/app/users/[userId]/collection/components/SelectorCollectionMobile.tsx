'use client'

import { ChangeEvent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    userId: number
}
export const SelectorCollectionMobile = ({userId, children}: PropsWithChildren<Props>) => {
    const router = useRouter();

    const mobileOnChangeCollection = (e: any) => {
        const value = e.target.value;
        router.push(`/users/${userId}/collection/${value}`);
    }

    return (
        <select className={'md:hidden'} onChange={mobileOnChangeCollection}>
            {children}
        </select>
    )
}