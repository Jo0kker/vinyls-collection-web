export const SPECIAL_COLLECTIONS = {
    ALL: -3,
    WISHLIST: -1,
    TRADES: -2,
} as const;

export type SpecialCollection = {
    id: typeof SPECIAL_COLLECTIONS[keyof typeof SPECIAL_COLLECTIONS];
    name: string;
};
