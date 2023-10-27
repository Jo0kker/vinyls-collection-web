import type { PropsWithChildren } from 'react'

import { ButtonAddCollection } from '@/app/users/[userId]/collection/components/ButtonAddCollection'
import { Collection, Search, User } from '@/types'
import { getSession } from '@/utils/authOptions'
import { fetchAPI } from '@/utils/fetchAPI'
import { fetchUserData } from '@/utils/fetchUserData'

import { CollectionLink } from './components/CollectionLink'

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
                <nav className="flex w-full gap-2 overflow-x-auto px-4 md:mx-0 md:w-auto md:flex-col md:p-0">
                    {isOwner && <ButtonAddCollection />}
                    <CollectionLink
                        href={'/users/' + userId + '/collection/-1'}
                        label="Recherches"
                    />
                    <CollectionLink href={'/users/' + userId + '/collection/-2'} label="Échanges" />

                    {collections.data.map(item => (
                        <CollectionLink
                            key={item.id}
                            href={`/collection/${item.id}`}
                            label={item.name}
                        />
                    ))}
                </nav>
                <div className="flex flex-1 flex-col px-4 md:px-0">{children}</div>
            </div>
        </div>
    )
}
