'use client'

import React, { useState } from 'react'

import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atom/Button'
import { User } from '@/types/User'
import { fetchAPI } from '@/utils/fetchAPI'

export default function CollectorPage({
    users,
    meta
}: {
    users: User[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
}) {
    const [collectors, setCollectors] = useState(users)
    const [currentPage, setCurrentPage] = useState(meta.current_page)
    const loadMore = () => {
        fetchAPI('/users', {
            method: 'POST',
            body: JSON.stringify({
                page: currentPage + 1
            })
        }).then(res => {
            setCollectors([...collectors, ...res.data.data])
            setCurrentPage(res.data.meta.current_page)
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {collectors.map(user => (
                        <Link
                            key={user.id}
                            href={`/users/${user.id}`}
                            className="m-1 flex flex-row rounded border border-8 border-gray-300 hover:bg-gray-400"
                        >
                            <Image
                                src={user.avatar}
                                alt={user.name}
                                width={100}
                                height={100}
                                className="cursor-pointer"
                            />
                            <div className="mx-3 flex flex-col justify-center">
                                <h2>{user.name}</h2>
                                <p className="text-sm">{user.collectionVinyls_count} vinyls</p>
                                <p className="text-sm">
                                    Dernière connection :{' '}
                                    {DateTime.fromFormat(
                                        user.last_activity,
                                        'yyyy-MM-dd HH:mm:ss'
                                    ).toFormat('dd/MM/yyyy')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Button className="my-4" onClick={loadMore}>
                    Charger plus
                </Button>
            </div>
        </>
    )
}

async function getData() {
    const req = await fetchAPI('/users/search', {
        method: 'POST',
        body: JSON.stringify({})
    })
    const users: User[] = req.data.data
    const meta = {
        current_page: req.data.current_page,
        last_page: req.data.last_page,
        per_page: req.data.per_page,
        total: req.data.total
    }

    return {
        props: {
            users,
            meta
        }
    }
}
