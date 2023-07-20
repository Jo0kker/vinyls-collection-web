export interface Track {
  duration: string;
  position: string;
  title: string;
  type_: string;
}

export interface Video {
    title: string;
    uri: string;
  }

export interface Vinyl {
  id: number;
  label: string;
  track_list: string;
  artist: string;
  genre: string;
  year_released: string;
  image: string;
  provenance: string;
  discog_id: number;
  discogs?: {
    title: string,
    thumb: string,
    tracklist: Track[],
    videos: Video[]
  };
  format_vinyl: [],
  created_at: Date;
  updated_at: Date;
}
