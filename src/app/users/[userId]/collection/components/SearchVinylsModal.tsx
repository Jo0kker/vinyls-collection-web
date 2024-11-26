'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faXmark } from '@fortawesome/pro-duotone-svg-icons'
import { InputText } from '@/components/atom/InputText'
import AsyncSelect from 'react-select/async'
import { VinylItem } from './VinylItem'
import { ViewStyle } from '../types/ViewStyle'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchAPI } from '@/utils/fetchAPI'
import { Collection } from '@/types/Collection'

interface SearchVinylsModalProps {
    userId: string
    isOpen: boolean
    onClose: () => void
}

export function SearchVinylsModal({ userId, isOpen, onClose }: SearchVinylsModalProps) {
    const session = useSession()
    const [searchTitle, setSearchTitle] = useState('')
    const [searchArtist, setSearchArtist] = useState('')
    const [searchGenre, setSearchGenre] = useState('')
    const [startYear, setStartYear] = useState('')
    const [endYear, setEndYear] = useState('')
    const [selectedCollection, setSelectedCollection] = useState<any>(null)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async () => {
        setIsLoading(true)
        const filters = [
            {
                field: 'user_id',
                operator: '=',
                value: userId
            }
        ]

        if (searchTitle) {
            filters.push({
                field: 'vinyl.title',
                operator: 'like',
                value: `%${searchTitle}%`
            })
        }
        if (searchArtist) {
            filters.push({
                field: 'vinyl.artist',
                operator: 'like',
                value: `%${searchArtist}%`
            })
        }
        if (searchGenre) {
            filters.push({
                field: 'vinyl.genre',
                operator: 'like',
                value: `%${searchGenre}%`
            })
        }
        if (startYear) {
            filters.push({
                field: 'vinyl.released',
                operator: '>=',
                value: startYear
            })
        }
        if (endYear) {
            filters.push({
                field: 'vinyl.released',
                operator: '<=',
                value: endYear
            })
        }
        if (selectedCollection?.value) {
            filters.push({
                field: 'collection_id',
                operator: '=',
                value: selectedCollection.value
            })
        }

        try {
            const response = await fetchAPI('/collectionVinyl/search', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.data?.user.access_token}`,
                },
                body: JSON.stringify({
                    search: {
                        filters,
                        includes: [
                            { relation: "vinyl" },
                            { relation: "collection" }
                        ]
                    }
                })
            })
            setSearchResults(response.data)
        } catch (error) {
            console.error('Erreur lors de la recherche:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const loadCollections = async (inputValue: string) => {
        const filters = [
            {
                field: 'user.id',
                operator: '=',
                value: userId
            }
        ]

        if (inputValue) {
            filters.push({
                field: 'name',
                operator: 'like',
                value: `%${inputValue}%`
            })
        }

        const response = await fetchAPI('/collections/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.data?.user.access_token}`,
            },
            body: JSON.stringify({
                search: { filters }
            })
        })

        return [
            { value: 'all', label: 'Toutes les collections' },
            { value: 'none', label: 'Sans collection' },
            ...response.data.map((collection: Collection) => ({
                value: collection.id,
                label: collection.name
            }))
        ]
    }

    if (!isOpen) return null

    return (
        <div className="absolute top-0 left-0 w-screen h-screen z-[100]">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/50" 
                onClick={onClose}
            />

            {/* Container */}
            <div className="relative w-full h-full overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4">
                    {/* Modal */}
                    <div className="relative w-[95%] sm:w-auto sm:min-w-[600px] max-w-4xl bg-white rounded-lg shadow-xl">
                        {/* Header */}
                        <div className="sticky top-0 z-[101] flex items-center justify-between p-4 border-b bg-white">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Recherche avancée
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <InputText
                                            label="Titre"
                                            value={searchTitle}
                                            setValue={setSearchTitle}
                                            name="title"
                                            inputClassName="border-gray-200"
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <InputText
                                            label="Artiste"
                                            value={searchArtist}
                                            setValue={setSearchArtist}
                                            name="artist"
                                            inputClassName="border-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <InputText
                                            label="Genre"
                                            value={searchGenre}
                                            setValue={setSearchGenre}
                                            name="genre"
                                            inputClassName="border-gray-200"
                                        />
                                    </div>
                                    <div className="flex w-full gap-4 sm:w-1/2">
                                        <div className="w-1/2">
                                            <InputText
                                                label="Année début"
                                                value={startYear}
                                                setValue={setStartYear}
                                                name="startYear"
                                                type="number"
                                                inputClassName="border-gray-200"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <InputText
                                                label="Année fin"
                                                value={endYear}
                                                setValue={setEndYear}
                                                name="endYear"
                                                type="number"
                                                inputClassName="border-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <AsyncSelect
                                        className="z-[110]"
                                        placeholder="Sélectionner une collection"
                                        value={selectedCollection}
                                        onChange={setSelectedCollection}
                                        loadOptions={loadCollections}
                                        defaultOptions
                                        isClearable
                                        styles={{
                                            menu: (base) => ({
                                                ...base,
                                                zIndex: 111
                                            })
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                    className="w-full px-4 py-2 text-white rounded-md bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                            Recherche en cours...
                                        </span>
                                    ) : (
                                        'Rechercher'
                                    )}
                                </button>

                                <div className="mt-4 max-h-[50vh] overflow-y-auto">
                                    {searchResults.map((result) => (
                                        <VinylItem
                                            key={result.id}
                                            item={result}
                                            collectionId={result.collection_id}
                                            viewStyle={ViewStyle.LIST}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}