'use server'

import { revalidateTag } from 'next/cache'

type RevalidateCacheClient = {
    tag: string
}

// eslint-disable-next-line require-await
const revalidateCacheClient = async ({ tag }: RevalidateCacheClient) => {
    revalidateTag(tag)
}

export default revalidateCacheClient
