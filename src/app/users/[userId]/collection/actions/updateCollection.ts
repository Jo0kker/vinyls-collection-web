'use server'

import { revalidateTag } from 'next/cache'

import { Collection } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

const UpdateCollection = async (collectionId: number, attributes: object) => {
    await fetchAPI<Collection[]>('/collections/mutate', {
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

    revalidateTag('collection')
}

export default UpdateCollection
