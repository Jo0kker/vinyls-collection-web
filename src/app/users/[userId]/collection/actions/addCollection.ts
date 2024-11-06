'use server'

import { revalidateTag } from 'next/cache'

import { fetchAPI } from '@/utils/fetchAPI'

const addCollection = async (collectionName: string, collectionDesc: string) => {
    await fetchAPI('/collections/mutate', {
        method: 'POST',
        withSession: true,
        body: JSON.stringify({
            mutate: [
                {
                    operation: 'create',
                    attributes: {
                        name: collectionName,
                        description: collectionDesc
                    }
                }
            ]
        })
    })

    revalidateTag('collection')
}

export default addCollection
