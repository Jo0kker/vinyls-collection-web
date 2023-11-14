'use server'

import { revalidateTag } from 'next/cache'

import { fetchAPI } from '@/utils/fetchAPI'

const deleteVinyl = async (vinylId: number, collectionId: string | undefined) => {
    switch (collectionId) {
        case '-1':
            await fetchAPI('/searches', {
                method: 'DELETE',
                withSession: true,
                body: JSON.stringify({
                    resources: [vinylId]
                })
            })
            revalidateTag('searchVinyls')
            break
        case '-2':
            await fetchAPI('/trades', {
                method: 'DELETE',
                withSession: true,
                body: JSON.stringify({
                    resources: [vinylId]
                })
            })
            revalidateTag('tradeVinyls')
            break
        default:
            await fetchAPI('/collectionVinyl', {
                method: 'DELETE',
                withSession: true,
                body: JSON.stringify({
                    resources: [vinylId]
                })
            })
            revalidateTag('collectionVinyl')
    }
}

export default deleteVinyl
