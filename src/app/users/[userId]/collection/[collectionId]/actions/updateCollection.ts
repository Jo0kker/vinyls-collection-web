'use server'

import { revalidateTag } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { Collection } from '@/types';

export default async (collectionId: number, newCollectionName: string) => {
    await fetchAPI<Collection[]>('/collections/mutate', {
        method: 'POST',
        withSession: true,
        body: JSON.stringify({
            mutate: [
                {
                    operation: 'update',
                    key: collectionId,
                    attributes: {
                        name: newCollectionName
                    }
                }
            ]
        })
    })

    revalidateTag('collection')
}