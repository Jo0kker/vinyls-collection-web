'use client'

import React, { useEffect, useRef, useState } from 'react'

import { debounce } from 'lodash';

import { UserCard } from '@/app/collector/components/UserCard';
import { Loading } from '@/assets/lottie/Loading';
import { InputText } from '@/components/atom/InputText';
import { User } from '@/types/User'
import { fetchAPI } from '@/utils/fetchAPI'


export default function CollectorPage () {
    const [collectors, setCollectors] = useState<User[]>();
    const [nextPage, setNextPage] = useState(1);
    const [search, setSearch] = useState('');
    const lastSearchValue = useRef('');
    const [infoPagination, setInfoPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [isLoading, setIsLoading] = useState(true);

    const getCollectors = async () => {
        const body: { [key: string]: unknown } = {
            sort: [
                {
                    field: 'created_at',
                    direction: 'desc'
                }
            ],
            page: nextPage,
            limit: 6
        };

        if (lastSearchValue.current !== '') {
             body['filters'] = [
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
        }).then((res) => {
            setCollectors(collectors ? [...collectors, ...res.data] : res.data);
            setNextPage(nextPage + 1);
            setInfoPagination({
                current_page: res.current_page,
                last_page: res.last_page,
            });
            setIsLoading(false);
        })
    }
    
    const searchDebouce = useRef(debounce((value) => {
        lastSearchValue.current = value;
        getCollectors();
    }, 1000)).current;

    useEffect(() => {
        getCollectors();
    }, []);

    return (
        <>
            <div className="mt-4 flex flex-col rounded bg-white px-4 py-4 sm:pt-0">
                <div className="mb-4 mt-6 flex flex-row justify-center text-2xl font-bold">
                    <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                    <h1 className="text-fuchsia-800">Liste des collectionneurs</h1>
                    <span className="ml-3 text-orange-400">&#47;&#47;</span>
                </div>
                <div className="my-2">
                    <InputText
                      value={search}
                      setValue={(value) => {
                          setSearch(value);
                          searchDebouce(value);
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
                  <div className="flex h-full items-center justify-center">
                      <Loading className="w-10 opacity-40" />
                  </div>
                )}
                {infoPagination.current_page < infoPagination.last_page && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => getCollectors()}
                            className="bg-fuchsia-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Voir plus
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
