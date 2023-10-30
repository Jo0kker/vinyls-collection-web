'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { fetchAPI } from '@/utils/fetchAPI'

const deleteCollection = async (collectionId: number, userId: number) => {
    await fetchAPI('/collections', {
        method: 'DELETE',
        withSession: true,
        body: JSON.stringify({
            resources: [collectionId]
        })
    })

    revalidateTag('collection')
    redirect(`/users/${userId}/collection`)
}

export default deleteCollection
