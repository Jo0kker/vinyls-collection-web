import { Media } from '@/types/Media';

import type { User } from './User'
import type { Vinyl } from './Vinyl'

export interface Trade {
    id: number
    vinyl_id: number
    vinyl: Vinyl
    description: string
    image_path: string
    user_id: number
    format: string
    created_at: string
    updated_at: string
    user?: User
    media?: Media[]
}
