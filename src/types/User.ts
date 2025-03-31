export interface User {
    id: number
    name: string
    email: string
    avatar: string
    email_verified_at: Date
    is_subscribed_newsletter: number
    is_blocked: number
    last_activity: string
    first_name: string
    last_name: string
    phone: string
    birth_date: string
    audio_equipment: string
    influence: string
    description: string
    created_at: Date
    updated_at: Date
    deleted_at?: Date
    collections_count?: number
    collectionVinyls_count?: number
    discogs_id?: number
    discogs_token?: string
    discogs_username?: string
    discogs_data?: any
    ability?: string[]
    collection_vinyls_count?: number
}
