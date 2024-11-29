import { useState } from 'react'

export type SortOption = 'alpha' | 'date' | 'count'
export type SortDirection = 'asc' | 'desc'

export const useCollectionSort = () => {
    const [activeSort, setActiveSort] = useState<SortOption | null>(null)
    const [direction, setDirection] = useState<SortDirection>('asc')

    const resetSort = () => {
        setActiveSort(null)
        setDirection('asc')
    }

    const getSortParams = () => {
        if (!activeSort) return {}

        switch (activeSort) {
            case 'alpha':
                return {
                    sorts: [{ field: 'name', direction }]
                }
            case 'date':
                return {
                    sorts: [{ field: 'created_at', direction }]
                }
            case 'count':
                return {
                    scopes: [{ name: 'orderByVinylsCount', parameters: [direction] }]
                }
        }
    }

    return {
        activeSort,
        direction,
        setActiveSort,
        setDirection,
        getSortParams,
        resetSort
    }
} 