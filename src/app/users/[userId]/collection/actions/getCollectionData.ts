'use client'

import { CollectionVinyl } from '@/types'
import { fetchAPI, FetchResponse } from '@/utils/fetchAPI'

export const getCollectionData = async (
    userId: number,
    collectionId: number | null,
    page: number = 1,
    perPage: number = 24
): Promise<FetchResponse<CollectionVinyl[]>> => {
    if (!collectionId) return {
        data: [],
        status: 200,
        total: 0,
        current_page: 1,
        last_page: 1,
        from: 0,
        to: 0,
        per_page: 0,
        id: 0,
        avatar: null
    }

    const baseSearchParams = {
        scopes: [
            {name: 'orderByVinylTitle'},
            {name: 'uniqueVinyls'}
        ],
        filters: [
            {
                field: 'user.id',
                operator: '=',
                value: userId
            }
        ],
        includes: [{ relation: 'vinyl' }, { relation: 'media' }],
        page: page,
        limit: perPage
    }

    switch (collectionId) {
        case -1:
            return await fetchAPI<CollectionVinyl[]>('/searches/search', {
                method: 'POST',
                body: JSON.stringify({
                    search: {
                        ...baseSearchParams,
                    }
                })
            })

        case -2:
            return await fetchAPI<CollectionVinyl[]>('/trades/search', {
                method: 'POST',
                body: JSON.stringify({
                    search: {
                        ...baseSearchParams,
                    }
                })
            })

        default:
            return await fetchAPI<CollectionVinyl[]>('/collectionVinyl/search', {
                method: 'POST',
                body: JSON.stringify({
                    search: {
                        ...baseSearchParams,
                        filters: [
                            {
                                field: 'collection.id',
                                operator: '=',
                                value: collectionId
                            }
                        ],
                        includes: [
                            { relation: 'vinyl' },
                            { relation: 'collection' },
                            { relation: 'media' }
                        ],
                    }
                })
            })
    }
}
