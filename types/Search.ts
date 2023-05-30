import type { User } from './User';
import type { Vinyl } from './Vinyl';

export interface Search {
  id: number;
  vinyl_id: number;
  vinyl: Vinyl;
  description: string;
  discogs_id: number;
  discogs?: object;
  image_path: string;
  user_id: number;
  format_vinyl_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}
