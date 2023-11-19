import type { User } from './User'
import type { Vinyl } from './Vinyl'

export interface Search {
    id: number
    vinyl_id: number
    vinyl: Vinyl
    description?: string
    user_id: number
    format?: string
    created_at: string
    updated_at: string
    user?: User
}
