import {Vinyl} from "./Vinyl";
import {Collection} from "./Collection";

export interface CollectionVinyl {
  id: number;
  collection_id: number;
  vinyl_id: number;
  format_vinyl_id: number;
  cover_state: number;
  year_purchased: string;
  price: number;
  is_sellable: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  vinyl: Vinyl;
  collection?: Collection;
}
