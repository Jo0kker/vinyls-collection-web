import {array} from "yup";

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
    artists?: []
    genre?: string
    released?: string
    image?: string
    provenance?: string
    type?: string
    discog_id?: number
    discog_url?: string
    discog_videos?: string
    discog_img?: string
    created_at: Date
    updated_at?: Date
}
