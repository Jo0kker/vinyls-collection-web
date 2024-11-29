'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSearch, faXmark } from '@fortawesome/pro-duotone-svg-icons'
import useModalSearchStore from '@/store/modalSearchStore'
import { useFormik } from 'formik'
import { Loading } from '@/assets/lottie/Loading'
import { fetchAPI } from '@/utils/fetchAPI'
import Image from 'next/image'
import Link from 'next/link'
import { prefixImage } from '@/utils/prefixImage'

interface SearchResult {
    id: number
    title: string
    artist: string
    image: string
    released: string
}

export function SearchModal() {
    const { isOpen, closeModal } = useModalSearchStore()
    const [isLoading, setIsLoading] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: async (values) => {
            if (!values.search.trim()) return
            setIsLoading(true)
            try {
                const searchTerms = values.search.trim().split(/\s+/)
                const filters = searchTerms.flatMap(term => [
                    {
                        field: 'title',
                        operator: 'like',
                        value: `%${term}%`,
                    }
                ])

                const response = await fetchAPI('/vinyls/search', {
                    method: 'POST',
                    body: JSON.stringify({
                        search: {
                            filters
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

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100]" onClick={closeModal}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative w-full h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-center min-h-full p-4">
                    <div className="relative w-[95%] sm:w-auto sm:min-w-[600px] max-w-4xl bg-white rounded-lg shadow-xl">
                        <div className="p-4">
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-2 items-center">
                                    <input
                                        type="text"
                                        {...formik.getFieldProps('search')}
                                        placeholder="Rechercher un vinyl..."
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={isLoading || !formik.values.search.trim()}
                                            className="px-4 py-2 text-white rounded-md bg-fuchsia-700 hover:bg-fuchsia-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <FontAwesomeIcon icon={faSearch} />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100"
                                            aria-label="Fermer"
                                        >
                                            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center p-8">
                                            <Loading className="w-32 h-32" />
                                        </div>
                                    ) : searchResults.length === 0 ? (
                                        formik.values.search.trim() && (
                                            <p className="text-center text-gray-500">
                                                Aucun résultat trouvé
                                            </p>
                                        )
                                    ) : (
                                        <div className="space-y-2">
                                            {searchResults.map((result) => (
                                                <Link
                                                    key={result.id}
                                                    href={`/vinyls/${result.id}`}
                                                    className="flex items-center gap-4 p-3 transition-colors border-b border-gray-100 hover:bg-gray-50"
                                                    onClick={closeModal}
                                                >
                                                    <Image
                                                        src={prefixImage(result.image)}
                                                        alt={result.title}
                                                        width={50}
                                                        height={50}
                                                        className="object-cover rounded"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">
                                                            {result.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {result.artist} • {result.released}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
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