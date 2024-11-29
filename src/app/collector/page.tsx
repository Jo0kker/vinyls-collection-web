'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { debounce } from 'lodash'

import { UserCard } from '@/app/collector/components/UserCard'
import { Loading } from '@/assets/lottie/Loading'
import { InputText } from '@/components/atom/InputText'
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
            body: JSON.stringify(body)
        }).then(res => {
            setCollectors(collectors ? [...collectors, ...res.data] : res.data)
            setNextPage(nextPage + 1)
            setInfoPagination({
                current_page: res.current_page,
                last_page: res.last_page
            })
            setIsLoading(false)
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
            <div className="my-2">
                <InputText
                    value={search}
                    setValue={value => {
                        setSearch(value)
                        searchDebouce(value)
                    }}
                    name="search"
                    inputStyle={{ borderColor: '#000' }}
                    label="Rechercher un collectionneur"
                />
            </div>
            {collectors && collectors.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {collectors.map(user => (
                        <UserCard user={user} key={user.id} />
                    ))}
                </div>
            )}
            {isLoading && (
                <div className="flex items-center justify-center h-full">
                    <Loading className="w-10 opacity-40" />
                </div>
            )}
            {infoPagination.current_page < infoPagination.last_page && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => getCollectors()}
                        className="px-4 py-2 font-bold text-white rounded bg-fuchsia-800"
                    >
                        Voir plus
                    </button>
                </div>
            )}
        </div>
    )
}
