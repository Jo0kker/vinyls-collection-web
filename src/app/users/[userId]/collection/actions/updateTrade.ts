'use server'

import { revalidateTag } from 'next/cache'

import { Search, Trade } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

const UpdateSearch = async (collectionId: number, attributes: object) => {
    const body = JSON.stringify({
        mutate: [
            {
                operation: 'update',
                key: collectionId,
                attributes,
            }
        ]
    })

    await fetchAPI<Search|Trade>('/trades/mutate', {
        method: 'POST',
        withSession: true,
        body: JSON.stringify({
            mutate: [
                {
                    operation: 'update',
                    key: collectionId,
                    attributes,
                }
            ]
        })
    })
    revalidateTag('tradeVinyls')
}

export default UpdateSearch
