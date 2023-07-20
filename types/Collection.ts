import type { User } from './User';
import type { Vinyl } from './Vinyl';

// Info propre a la collection
export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user?: User;
}

// Info sur le contenu d'une collection de vinyl (collection utilisateur)
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

// Info sur le contenu de la collection Search
export interface Search {
    id: number;
    vinyl_id: number;
    vinyl: Vinyl;
    description: string;
    //   discogs_id: number;
    discogs?: object;
    image: string;
    user_id: number;
    format_vinyl_id: number;
    created_at: string;
    updated_at: string;
    user?: User;
}

// Info sur le contenu de la collection Trade
export interface Trade {
    id: number;
    vinyl_id: number;
    vinyl: Vinyl;
    description: string;
    image: string;
    user_id: number;
    format_vinyl_id: number;
    created_at: string;
    updated_at: string;
    user?: User;
}

export type CollectionItem = CollectionVinyl | Search | Trade;