import type { PropsWithChildren } from 'react'

import { ButtonAddCollection } from '@/app/users/[userId]/collection/components/ButtonAddCollection'
import { Collection, Search, User } from '@/types'
import { getSession } from '@/utils/authOptions'
import { fetchAPI } from '@/utils/fetchAPI'
import { fetchUserData } from '@/utils/fetchUserData'

import { CollectionLink } from './components/CollectionLink'
import { Select } from 'flowbite-react';
import { SelectorCollectionMobile } from '@/app/users/[userId]/collection/components/SelectorCollectionMobile';

type pageProps = {
    params: {
        userId: string
    }
}

export default async function CollectionLayout({ params, children }: PropsWithChildren<pageProps>) {
    const session = await getSession()
    const userId: number = parseInt(params.userId)
    const isOwner = session?.user?.id == userId

    const collections = await fetchAPI<Collection[]>('/collections/search', {
        method: 'POST',
        withSession: true,
        next: {
            tags: ['collection']
        },
        body: JSON.stringify({
            filters: [
                {
                    field: 'user.id',
                    operator: '=',
                    value: userId
                }
            ],
            includes: [{ relation: 'collectionVinyls' }, { relation: 'user' }],
            limit: 6
        })
    })

    const getOwnerData = async (): Promise<User> => {
        if (isOwner && session?.user !== undefined) {
            return session.user
        } else {
            const user = await fetchUserData(userId)
            if (user) {
                return user
            } else {
                throw new Error('User not found')
            }
        }
    }

    const ownerData = await getOwnerData()

    return (
        <div className="mt-4 flex flex-col rounded bg-white py-4">
            <div className="mb-4 flex flex-row justify-center px-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>

                {isOwner ? (
                    <h1 className="text-emerald-800">Ma collection</h1>
                ) : (
                    <h1 className="text-emerald-800">Collection de {ownerData.name}</h1>
                )}
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:px-4">
                <SelectorCollectionMobile userId={userId}>
                    <option value="-1">Recherches</option>
                    <option value="-2">Échanges</option>
                    {collections.data.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </SelectorCollectionMobile>
                <nav className="hidden md:flex w-56 gap-2 overflow-x-auto px-4 md:mx-0 md:flex-col md:p-0">
                    {isOwner && <ButtonAddCollection />}
                    <CollectionLink
                        href={'/users/' + userId + '/collection/-1'}
                        label="Recherches"
                    />
                    <CollectionLink href={'/users/' + userId + '/collection/-2'} label="Échanges" />

                    {collections.data.map(item => (
                        <CollectionLink
                            key={item.id}
                            href={`/users/${userId}/collection/${item.id}`}
                            label={item.name}
                            isDeletable={isOwner}
                        />
                    ))}
                </nav>
                <div className={'flex flex-col flex-auto w-64 gap-3 w-full'}>
                    <div className="flex flex-1 flex-col px-4 md:px-0">{children}</div>
                </div>
            </div>
        </div>
    )
}
