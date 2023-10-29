'use client'

import React, { useState } from 'react'

import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atom/Button'
import { User } from '@/types/User'
import { fetchAPI } from '@/utils/fetchAPI'
import { UserCard } from '@/app/collector/components/UserCard';
import { LoadMore } from '@/app/collector/components/LoadMore';
import { InputText } from '@/components/atom/InputText';

export default async function CollectorPage () {
    const [collectors, setCollectors] = useState<User[]>();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const getCollectors = async () => {
        let body: any = {
            sort: [
                {
                    field: 'created_at',
                    direction: 'desc'
                }
            ],
            page: page,
            limit: 6
        };

        if (search) {
             body['filters'] = [
                {
                    field: 'name',
                    operator: 'like',
                    value: search
                }
            ]
        }

        await fetchAPI<User[]>('/users/search', {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((res) => {
            setCollectors(collectors ? [...collectors, ...res.data] : res.data);
            setPage(page + 1);
        })
    }

    return (
        <>
            <div className="mt-4 flex flex-col rounded bg-white px-4 pt-4 sm:pt-0">
                <div className="mb-4 mt-6 flex flex-row justify-center text-2xl font-bold">
                    <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                    <h1 className="text-fuchsia-800">Liste des collectionneurs</h1>
                    <span className="ml-3 text-orange-400">&#47;&#47;</span>
                </div>
                <div>

                </div>
                {collectors && collectors.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {collectors.map(user => (
                            <UserCard user={user} key={user.id} />
                        ))}
                    </div>
                )}
                <LoadMore />
            </div>
        </>
    )
}
