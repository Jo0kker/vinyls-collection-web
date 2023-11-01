import { ButtonDeleteCollection } from '@/app/users/[userId]/collection/[collectionId]/components/ButtonDeleteCollection'
import { ButtonEditCollection } from '@/app/users/[userId]/collection/[collectionId]/components/ButtonEditCollection'
import { ButtonAddCollection } from '@/app/users/[userId]/collection/components/ButtonAddCollection'
import { CollectionLink } from '@/app/users/[userId]/collection/components/CollectionLink'
import { SelectorCollectionMobile } from '@/app/users/[userId]/collection/components/SelectorCollectionMobile'
import { Collection, CollectionVinyl, User } from '@/types'
import { getSession } from '@/utils/authOptions'
import { cn } from '@/utils/classNames'
import { fetchAPI, FetchResponse } from '@/utils/fetchAPI'
import { fetchUserData } from '@/utils/fetchUserData'

import { EmptyList } from '../components/EmptyList'
import { VinylItem } from '../components/VinylItem'

type CollectionPageProps = {
    params: {
        collectionId: string
        userId: string
    }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const collectionId = parseInt(params.collectionId)
    const session = await getSession()
    const userId = parseInt(params.userId)
    let list: FetchResponse<CollectionVinyl[]>
    let isEditable = false
    let isOwner = false
    let collectionName

    if (session?.user?.id === userId) {
        isOwner = true
    }

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

    const collection = await fetchAPI<Collection[]>('/collections/search', {
        method: 'POST',
        withSession: true,
        next: {
            tags: ['collection']
        },
        body: JSON.stringify({
            filters: [
                {
                    field: 'id',
                    operator: '=',
                    value: collectionId
                }
            ],
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

    if (collectionId === -1) {
        collectionName = 'Liste de souhaits'

        list = await fetchAPI<CollectionVinyl[]>('/searches/search', {
            method: 'POST',
            body: JSON.stringify({
                filters: [
                    {
                        field: 'user.id',
                        operator: '=',
                        value: userId
                    }
                ],
                includes: [{ relation: 'vinyl' }, { relation: 'format' }],
                limit: 10
            })
        })
        isEditable = false
    } else if (collectionId === -2) {
        collectionName = 'Liste de recherches'

        list = await fetchAPI<CollectionVinyl[]>('/trades/search', {
            method: 'POST',
            body: JSON.stringify({
                filters: [
                    {
                        field: 'user.id',
                        operator: '=',
                        value: userId
                    }
                ],
                includes: [{ relation: 'vinyl' }, { relation: 'format' }],
                limit: 10
            })
        })
        isEditable = false
    } else {
        list = await fetchAPI<CollectionVinyl[]>('/collectionVinyl/search', {
            method: 'POST',
            next: {
                tags: ['collectionVinyl']
            },
            body: JSON.stringify({
                filters: [
                    {
                        field: 'collection.id',
                        operator: '=',
                        value: collectionId
                    }
                ],
                includes: [
                    { relation: 'vinyl' },
                    { relation: 'format' },
                    { relation: 'collection' }
                ]
            })
        })
        isEditable = isOwner
    }

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

            <div className="flex flex-col md:flex-row">
                <SelectorCollectionMobile userId={userId} defaultValue={collectionId}>
                    <option value="-1">Recherches</option>
                    <option value="-2">Échanges</option>
                    {collections.data.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </SelectorCollectionMobile>
                <nav className="hidden w-56 gap-2 overflow-x-auto px-4 md:mx-0 md:flex md:flex-col md:p-0">
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
                <div className="flex w-64 w-full flex-auto flex-col gap-3">
                    <div className="flex flex-1 flex-col px-4 md:px-0">
                        <div
                            className={cn('my-2 grid grid-cols-1', {
                                'md:grid-cols-2 lg:grid-cols-3': list.data.length > 0
                            })}
                        >
                            <div className="flex justify-between">
                                <h2 className="mb-2 hidden truncate text-2xl font-bold md:block">
                                    {isEditable ? collection.data[0].name : collectionName}
                                </h2>
                                {isEditable && (
                                    <div className="mb-1 ml-auto flex flex-row">
                                        <ButtonEditCollection collection={collection.data[0]} />
                                        <ButtonDeleteCollection
                                            collectionId={collectionId}
                                            userId={userId}
                                        />
                                    </div>
                                )}
                            </div>
                            {list.data.length === 0 && <EmptyList />}

                            {list.data.map(item => (
                                <VinylItem
                                    key={item.id}
                                    item={item}
                                    collectionId={params.collectionId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
