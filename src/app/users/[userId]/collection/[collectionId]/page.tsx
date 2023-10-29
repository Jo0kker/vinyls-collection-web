import { Collection, CollectionVinyl } from '@/types';
import { cn } from '@/utils/classNames'
import { fetchAPI, FetchResponse } from '@/utils/fetchAPI'

import { EmptyList } from '../components/EmptyList'
import { VinylItem } from '../components/VinylItem'
import { useState } from 'react';
import { getSession } from '@/utils/authOptions';
import { ButtonEditCollection } from '@/app/users/[userId]/collection/[collectionId]/components/ButtonEditCollection';
import {
    ButtonDeleteCollection
} from '@/app/users/[userId]/collection/[collectionId]/components/ButtonDeleteCollection';
import { revalidatePath } from 'next/cache';

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
    let collectionName;

    if (session?.user?.id === userId) {
        isOwner = true
    }

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
        <div
            className={cn('my-2 grid grid-cols-1', {
                'md:grid-cols-2 lg:grid-cols-3': list.data.length > 0
            })}
        >
            <div className={'flex justify-between'}>
                <h2 className="hidden md:block text-2xl font-bold mb-2 truncate">{isEditable ? collection.data[0].name : collectionName}</h2>
                {isEditable &&
                    <div className="flex flex-row ml-auto">
                        <ButtonEditCollection collection={collection.data[0]} />
                        <ButtonDeleteCollection collectionId={collectionId} userId={userId} />
                    </div>
                }

            </div>
            {list.data.length === 0 && <EmptyList />}

            {list.data.map(item => (
                <VinylItem key={item.id} item={item} collectionId={params.collectionId} />
            ))}
        </div>
    )
}
