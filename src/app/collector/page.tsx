'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { FaSearch } from 'react-icons/fa'

import { UserCard } from '@/app/collector/components/UserCard'
import { Loading } from '@/assets/lottie/Loading'
import { User } from '@/types/User'
import { fetchAPI } from '@/utils/fetchAPI'

export default function CollectorPage() {
    const [collectors, setCollectors] = useState<User[]>()
    const [nextPage, setNextPage] = useState(1)
    const [search, setSearch] = useState('')
    const lastSearchValue = useRef('')
    const [infoPagination, setInfoPagination] = useState({
        current_page: 1,
        last_page: 1
    })
    const [isLoading, setIsLoading] = useState(true)

    const getCollectors = useCallback(async () => {
        const body: { [key: string]: any } = {
            search: {
                sort: [
                    {
                        field: 'created_at',
                        direction: 'desc'
                    }
                ],
                aggregates: [
                    {
                        relation: 'collectionVinyls',
                        type: 'count'
                    }
                ],
                page: nextPage,
                limit: 9
            }
        }

        if (lastSearchValue.current !== '') {
            body['search']['filters'] = [
                {
                    field: 'name',
                    operator: 'like',
                    value: `%${lastSearchValue.current}%`
                }
            ]
        }

        await fetchAPI<User[]>('/users/search', {
            method: 'POST',
            next: {
                revalidate: 0
            },
            body: JSON.stringify(body)
        }).then(res => {
            setCollectors(collectors ? [...collectors, ...res.data] : res.data)
            setNextPage(nextPage + 1)
            setInfoPagination({
                current_page: res.current_page,
                last_page: res.last_page
            })
            setIsLoading(false)
            console.log(res)
        })
    }, [nextPage, lastSearchValue, collectors])

    const searchDebouce = useRef(
        debounce(value => {
            lastSearchValue.current = value
            getCollectors()
        }, 1000)
    ).current

    useEffect(() => {
        getCollectors()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col px-4 py-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Liste des collectionneurs</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            searchDebouce(e.target.value)
                        }}
                        placeholder="Rechercher un collectionneur..."
                        className="w-full py-3 pl-10 pr-4 text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                    />
                </div>
                {search && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="p-2 text-sm text-gray-500">
                            Recherche en cours...
                        </div>
                    </div>
                )}
            </div>

            {collectors && collectors.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {collectors.map(user => (
                            <UserCard user={user} key={user.id} />
                        ))}
                    </div>
                    {infoPagination.current_page < infoPagination.last_page && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => getCollectors()}
                                className="px-6 py-3 font-medium text-white transition-colors duration-200 rounded-lg shadow-md bg-fuchsia-600 hover:bg-fuchsia-700 hover:shadow-lg"
                            >
                                Voir plus de collectionneurs
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <p className="text-lg">Aucun collectionneur trouvé</p>
                    <p className="mt-2 text-sm">Essayez de modifier votre recherche</p>
                </div>
            )}

            {isLoading && (
                <div className="flex items-center justify-center h-full py-12">
                    <Loading className="w-10 opacity-40" />
                </div>
            )}
        </div>
    )
}
