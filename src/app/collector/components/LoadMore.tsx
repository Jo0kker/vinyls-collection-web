'use client'

import { useState } from 'react';
import { User } from '@/types';
import { UserCard } from '@/app/collector/components/UserCard';
import { fetchAPI } from '@/utils/fetchAPI';

export const LoadMore = () => {
    const [collectors, setCollectors] = useState<User[]>();
    const [page, setPage] = useState(2);

    const loadMore = async () => {
        await fetchAPI<User[]>('/users/search', {
            method: 'POST',
            body: JSON.stringify({
                limit: 6,
                sort: [
                    {
                        field: 'created_at',
                        direction: 'desc'
                    }
                ],
                page: page
            })
        }).then((res) => {
            setCollectors(res.data);
            setPage(page + 1);
        })
    }

    return (
        <>
            {collectors && collectors.map(user => (
                <UserCard user={user} key={user.id} />
            ))}

            <button
                onClick={loadMore}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
                Charger plus
            </button>
        </>
    )
}