'use server'

import { revalidateTag } from 'next/cache'

import { Search, Trade } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

const UpdateSearch = async (collectionId: number, attributes: object) => {
    await fetchAPI<Search|Trade>('/searches/mutate', {
        method: 'POST',
        withSession: true,
        body: JSON.stringify({
            mutate: [
                {
                    operation: 'update',
                    key: collectionId,
                    attributes
                }
            ]
        })
    })

    revalidateTag('searchVinyls')
}

export default UpdateSearch
