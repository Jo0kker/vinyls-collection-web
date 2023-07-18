import type { PropsWithChildren } from 'react'

import { Collection } from '@/types'
import { getSession } from '@/utils/authOptions'
import { fetchAPI } from '@/utils/fetchAPI'

import { CollectionLink } from './components/CollectionLink'

export default async function CollectionLayoyt({ children }: PropsWithChildren) {
    const session = await getSession()
    const collections = await fetchAPI<Collection[]>(`/users/${session?.user.id}/collections`)

    return (
        <div className="mt-4 flex flex-col rounded bg-white py-4">
            <div className="mb-4 flex flex-row justify-center px-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Gestion de vos collections</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:px-4">
                <nav className="flex w-full gap-2 overflow-x-auto px-4 md:mx-0 md:w-auto md:flex-col md:p-0">
                    <CollectionLink href="/collection" label="Recherches" />

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
