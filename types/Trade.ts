import { User } from "./User";
import {Vinyl} from "./Vinyl";
import {DateTime} from "luxon";

export interface Trade {
  id: number;
  vinyl_id: number;
  vinyl: Vinyl;
  description: string;
  image_path: string;
  user_id: number;
  format_vinyl_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}
