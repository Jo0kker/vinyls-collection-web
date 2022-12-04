import { User } from "./User";

export interface Trade {
  id: number;
  label: string;
  artist: string;
  description: string;
  discogs_id: number;
  user_id: number;
  format_vinyl_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}
