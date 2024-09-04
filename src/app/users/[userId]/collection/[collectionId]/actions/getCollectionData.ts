import { CollectionVinyl } from '@/types'
import { fetchAPI, FetchResponse } from '@/utils/fetchAPI'

const getCollectionData = async (
    userId: number,
    collectionId: number,
    page: number
): Promise<FetchResponse<CollectionVinyl[]>> => {
    if (collectionId === -1) {
        return await fetchAPI<CollectionVinyl[]>('/searches/search', {
            method: 'POST',
            next: {
                tags: ['searchVinyls']
            },
            body: JSON.stringify({
                search: {
                    filters: [
                        {
                            field: 'user.id',
                            operator: '=',
                            value: userId
                        }
                    ],
                    includes: [{ relation: 'vinyl' }],
                    limit: 12,
                    page: page ?? 1
                }
            })
        })
    } else if (collectionId === -2) {
        return await fetchAPI<CollectionVinyl[]>('/trades/search', {
            method: 'POST',
            next: {
                tags: ['tradeVinyls']
            },
            body: JSON.stringify({
                search: {
                    filters: [
                        {
                            field: 'user.id',
                            operator: '=',
                            value: userId
                        }
                    ],
                    includes: [{ relation: 'vinyl' }, { relation: 'media' }],
                    limit: 12,
                    page: page ?? 1
                }
            })
        })
    } else {
        return await fetchAPI<CollectionVinyl[]>('/collectionVinyl/search', {
            method: 'POST',
            next: {
                tags: ['collectionVinyl']
            },
            body: JSON.stringify({
                search: {
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
                    limit: 24,
                    page: page ?? 1
                }
            })
        })
    }
}

export default getCollectionData
