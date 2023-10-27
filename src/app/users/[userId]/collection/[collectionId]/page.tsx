import { CollectionVinyl } from '@/types'
import { cn } from '@/utils/classNames'
import { fetchAPI, FetchResponse } from '@/utils/fetchAPI'

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
    const userId = parseInt(params.userId)
    let list: FetchResponse<CollectionVinyl[]>

    if (collectionId === -1) {
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
    } else if (collectionId === -2) {
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
    } else {
        list = await fetchAPI<CollectionVinyl[]>('/collections', {
            method: 'POST',
            body: JSON.stringify({
                filters: [
                    {
                        field: 'id',
                        operator: '=',
                        value: collectionId
                    }
                ],
                includes: [
                    { relation: 'collectionVinyls' },
                    { relation: 'collectionVinyls.vinyl' },
                    { relation: 'collectionVinyls.format' }
                ]
            })
        })
    }

    return (
        <div
            className={cn('my-2 grid grid-cols-1', {
                'md:grid-cols-2 lg:grid-cols-3': list.data.length > 0
            })}
        >
            {list.data.length === 0 && <EmptyList />}

            {list.data.map(item => (
                <VinylItem key={item.id} item={item} collectionId={params.collectionId} />
            ))}
        </div>
    )
}
