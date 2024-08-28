'use server'

import { revalidateTag } from 'next/cache'

import { fetchAPI } from '@/utils/fetchAPI'

const updateDiscogVinyl = async (vinylId: string) => {
    await fetchAPI(`/vinyls/discog/${vinylId}`, {
        method: 'PUT',
        withSession: true
    })
    
    revalidateTag(`vinyls:${vinylId}`)
}

export default updateDiscogVinyl