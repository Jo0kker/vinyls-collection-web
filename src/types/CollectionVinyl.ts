import { Media } from '@/types/Media';

import type { Collection } from './Collection'
import type { Vinyl } from './Vinyl'

export interface CollectionVinyl {
    id: number
    collection_id: number
    vinyl_id: number
    format: string
    cover_state: number
    year_purchased: string
    price: number
    is_sellable: number
    description: string
    created_at: Date
    updated_at: Date
    vinyl: Vinyl
    collection?: Collection
    media?: Media[]
}
