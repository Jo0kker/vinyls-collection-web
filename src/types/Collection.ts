import type { User } from './User'

export interface Collection {
    id: number
    name: string
    slug: string
    description: string
    user_id: number
    created_at: Date
    updated_at: Date
    user?: User
}
