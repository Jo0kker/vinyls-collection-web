'use server'

import { revalidateTag } from 'next/cache'
import { fetchAPI } from '@/utils/fetchAPI'

const addCollection = async (collectionName: string) => {
    try {
        await fetchAPI('/collections/mutate', {
            method: 'POST',
            withSession: true,
            body: JSON.stringify({
                mutate: [
                    {
                        operation: 'create',
                        attributes: {
                            name: collectionName
                        }
                    }
                ]
            })
        })

        revalidateTag('collection')
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default addCollection
