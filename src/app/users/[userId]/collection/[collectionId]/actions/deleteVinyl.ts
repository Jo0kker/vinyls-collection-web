'use server'

import { revalidateTag } from 'next/cache'

import { fetchAPI } from '@/utils/fetchAPI'

const deleteVinyl = async (vinylId: number) => {
    await fetchAPI('/collectionVinyl', {
        method: 'DELETE',
        withSession: true,
        body: JSON.stringify({
            resources: [vinylId]
        })
    })

    revalidateTag('collectionVinyl')
}

export default deleteVinyl
