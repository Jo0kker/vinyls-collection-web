'use server'

import { revalidateTag } from 'next/cache';

import { fetchAPI } from '@/utils/fetchAPI';
import { redirect } from 'next/navigation'

export default async (collectionId: number, userId: number) => {
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