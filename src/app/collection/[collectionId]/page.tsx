import { CollectionVinyl } from '@/types'
import { cn } from '@/utils/classNames'
import { fetchAPI } from '@/utils/fetchAPI'

import { EmptyList } from '../components/EmptyList'
import { VinylItem } from '../components/VinylItem'

type CollectionPageProps = {
    params: { collectionId: string }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const list = await fetchAPI<CollectionVinyl[]>(
        `/collections/${params.collectionId}/collectionVinyl?include=vinyl`,
        { withSession: true }
    )

    return (
        <div
            className={cn('my-2 grid grid-cols-1', {
                'md:grid-cols-2 lg:grid-cols-3': list.data.length > 0
            })}
        >
            {list.data.length === 0 && <EmptyList />}

            {list.data.map(item => (
                <VinylItem key={item.id} item={item} collectionId={params.collectionId} />
            ))}
        </div>
    )
}
