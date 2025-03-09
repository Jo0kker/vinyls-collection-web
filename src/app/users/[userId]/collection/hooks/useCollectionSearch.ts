import { useEffect, useRef, useState, useCallback } from 'react'
import { Collection } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import debounce from 'lodash/debounce'

export type SortParams = {
    sort?: string
    direction?: 'asc' | 'desc'
    sorts?: { field: string; direction: 'asc' | 'desc' }[]
    scopes?: { name: string; parameters: ('asc' | 'desc')[] }[]
}

export const useCollectionSearch = (userId: string, getSortParams: () => SortParams) => {
    const [collections, setCollections] = useState<Collection[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const previousSortParams = useRef<SortParams>({})

    const debouncedSearch = useRef(
        debounce((query: string, sortParams: SortParams) => {
            searchCollections(query, sortParams)
        }, 300)
    ).current

    const searchCollections = async (query: string, sortParams: SortParams = {}) => {
        setIsLoading(true)
        try {
            const filters = [
                {
                    field: 'user.id',
                    operator: '=',
                    value: userId
                }
            ]

            if (query) {
                filters.push({
                    field: 'name',
                    operator: 'like',
                    value: `%${query}%`
                })
            }

            const response = await fetchAPI('/collections/search', {
                method: 'POST',
                body: JSON.stringify({
                    search: {
                        filters,
                        ...sortParams
                    }
                })
            })

            setCollections(response.data)
        } catch (error) {
            console.error('Erreur lors de la recherche:', error)
        }
        setIsLoading(false)
    }

    // Effet pour la recherche
    useEffect(() => {
        const sortParams = getSortParams()
        debouncedSearch(searchQuery, sortParams)
        
        return () => {
            debouncedSearch.cancel()
        }
    }, [searchQuery])

    // Effet pour le tri
    useEffect(() => {
        const currentSortParams = getSortParams()
        const prevParams = previousSortParams.current
        
        // Vérifie si les paramètres de tri ont changé
        if (JSON.stringify(currentSortParams) !== JSON.stringify(prevParams)) {
            searchCollections(searchQuery, currentSortParams)
            previousSortParams.current = currentSortParams
        }
    }, [getSortParams()])

    // Chargement initial des collections
    useEffect(() => {
        const initialSortParams = getSortParams()
        searchCollections('', initialSortParams)
        previousSortParams.current = initialSortParams
    }, [])

    return {
        collections,
        searchQuery,
        setSearchQuery,
        isLoading,
        searchCollections: debouncedSearch
    }
}