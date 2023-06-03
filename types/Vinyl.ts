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
  discogs?: {[key: string]: any};
  created_at: Date;
  updated_at: Date;
}

// TODO faire le type de l'objet discogs