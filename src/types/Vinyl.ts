export interface Track {
    duration: string
    position: string
    title: string
    type_: string
}

export interface Video {
    title: string
    uri: string
}

export interface Vinyl {
    id: number
    title: string
    track_list?: string
    artist?: string
    genre?: string
    released?: string
    image?: string
    provenance?: string
    discog_id?: number
    discog_url?: string
    discog_videos?: string
    discog_img?: JSON
    created_at: Date
    updated_at?: Date
}
