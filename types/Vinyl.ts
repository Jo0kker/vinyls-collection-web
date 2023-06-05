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
  image_path: string;
  provenance: string;
  discog_id: number;
  discogs?: {
    title: string,
    thumb: string,
    tracklist: Track[],
    videos: Video[]
  };
  created_at: Date;
  updated_at: Date;
}
