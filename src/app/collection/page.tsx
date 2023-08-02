import { Search } from '@/types'
import { getSession } from '@/utils/authOptions'
import { cn } from '@/utils/classNames'
import { fetchAPI } from '@/utils/fetchAPI'

import { EmptyList } from './components/EmptyList'
import { VinylItem } from './components/VinylItem'

export default async function CollectionPage() {
    const session = await getSession()
    const searchesList = await fetchAPI<Search[]>(
        `/users/${session?.user.id}/searches?include=vinyl`,
        { withSession: true }
    )

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
