import { Search } from '@/types'
import { getSession } from '@/utils/authOptions'
import { cn } from '@/utils/classNames'
import { fetchAPI } from '@/utils/fetchAPI'

import { EmptyList } from './components/EmptyList'
import { VinylItem } from './components/VinylItem'

type CollectionPageProps = {
    params: {
        userId: string
    }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const session = await getSession()
    const userId: number = parseInt(params.userId)

    const searchesList = await fetchAPI<Search[]>('/searches/search', {
        method: 'POST',
        withSession: true,
        body: JSON.stringify({
            filters: [
                {
                    field: 'user.id',
                    operator: '=',
                    value: userId
                }
            ],
            includes: [{ relation: 'vinyl' }, { relation: 'format' }],
            limit: 6
        })
    })

    return (
        <div
            className={cn('my-2 grid grid-cols-1', {
                'md:grid-cols-2 lg:grid-cols-3': searchesList.data.length > 0
            })}
        >
            {searchesList.data.length === 0 && <EmptyList />}

            {searchesList.data.map(item => (
                <VinylItem key={item.id} item={item} />
            ))}
        </div>
    )
}
