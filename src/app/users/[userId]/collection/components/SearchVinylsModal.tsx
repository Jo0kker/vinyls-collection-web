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
import { prefixImage } from '@/utils/prefixImage'
import Link from 'next/link'
import Image from 'next/image'
import { useFormik } from 'formik'
import { Loading } from '@/assets/lottie/Loading'

interface SearchVinylsModalProps {
    userId: string
    isOpen: boolean
    onClose: () => void
}

function VinylSearchResult({ item }: { item: any }) {
    return (
        <Link 
            href={`/vinyls/${item.vinyl_id}`}
            className="flex items-center gap-4 p-3 transition-colors border-b border-gray-100 hover:bg-gray-50"
        >
            <Image
                src={prefixImage(item.vinyl?.image)}
                alt={item.vinyl?.title}
                width={50}
                height={50}
                className="object-cover rounded"
            />
            <div className="flex-1">
                <h3 className="font-medium text-gray-900 hover:text-fuchsia-600">
                    {item.vinyl.title}
                </h3>
                <p className="text-sm text-gray-600">
                    {item.vinyl.artist} • {item.vinyl.released}
                </p>
            </div>
        </Link>
    )
}

interface SearchFormValues {
    title: string
    artist: string
    genre: string
    startYear: string
    endYear: string
    collection: any
}

export function SearchVinylsModal({ userId, isOpen, onClose }: SearchVinylsModalProps) {
    const session = useSession()
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik<SearchFormValues>({
        initialValues: {
            title: '',
            artist: '',
            genre: '',
            startYear: '',
            endYear: '',
            collection: null
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            const filters = [
                {
                    field: 'user_id',
                    operator: '=',
                    value: userId
                }
            ]

            if (values.title) {
                filters.push({
                    field: 'vinyl.title',
                    operator: 'like',
                    value: `%${values.title}%`
                })
            }
            if (values.artist) {
                filters.push({
                    field: 'vinyl.artist',
                    operator: 'like',
                    value: `%${values.artist}%`
                })
            }
            if (values.genre) {
                filters.push({
                    field: 'vinyl.genre',
                    operator: 'like',
                    value: `%${values.genre}%`
                })
            }
            if (values.startYear) {
                filters.push({
                    field: 'vinyl.released',
                    operator: '>=',
                    value: values.startYear
                })
            }
            if (values.endYear) {
                filters.push({
                    field: 'vinyl.released',
                    operator: '<=',
                    value: values.endYear
                })
            }
            if (values.collection?.value) {
                filters.push({
                    field: 'collection_id',
                    operator: '=',
                    value: values.collection.value
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
    })

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
        <div className="absolute top-0 left-0 w-full min-h-screen z-[100]">
            <div 
                className="absolute inset-0 w-full min-h-screen bg-black/50" 
                onClick={onClose}
            />
            <div className="relative w-full min-h-screen overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4">
                    <div className="relative w-[95%] sm:w-auto sm:min-w-[600px] max-w-4xl bg-white rounded-lg shadow-xl">
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

                        <div className="p-4">
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <InputText
                                            label="Titre"
                                            {...formik.getFieldProps('title')}
                                            name="title"
                                            inputClassName="border-gray-200"
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <InputText
                                            label="Artiste"
                                            {...formik.getFieldProps('artist')}
                                            name="artist"
                                            inputClassName="border-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <InputText
                                            label="Genre"
                                            {...formik.getFieldProps('genre')}
                                            name="genre"
                                            inputClassName="border-gray-200"
                                        />
                                    </div>
                                    <div className="flex w-full gap-4 sm:w-1/2">
                                        <div className="w-1/2">
                                            <InputText
                                                label="Année début"
                                                {...formik.getFieldProps('startYear')}
                                                name="startYear"
                                                type="number"
                                                inputClassName="border-gray-200"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <InputText
                                                label="Année fin"
                                                {...formik.getFieldProps('endYear')}
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
                                        value={formik.values.collection}
                                        onChange={(value) => formik.setFieldValue('collection', value)}
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
                                    type="submit"
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
                                    {isLoading ? (
                                        <div className="flex items-center justify-center p-8">
                                            <Loading className="w-32 h-32" />
                                        </div>
                                    ) : (
                                        searchResults.map((result) => (
                                            <VinylSearchResult
                                                key={result.id}
                                                item={result}
                                            />
                                        ))
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}