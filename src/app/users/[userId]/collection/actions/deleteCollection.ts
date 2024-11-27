'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { fetchAPI } from '@/utils/fetchAPI'

const deleteCollection = async (collectionId: number, userId: number) => {
    fetchAPI('/collections', {
        method: 'DELETE',
        withSession: true,
        body: JSON.stringify({
            resources: [collectionId]
        })
    }).then(() => {
        redirect(`/users/${userId}/collection`)
    }).catch((error) => {
        console.error('Erreur lors de la suppression:', error)
    })
}

export default deleteCollection
