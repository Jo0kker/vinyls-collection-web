'use client'

import { InputText } from '@/components/atom/InputText';
import { useState } from 'react';
import { debounce } from "lodash"


export const SearchInput = () => {
    const [search, setSearch] = useState('');

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        // set search and debounced search
        setSearch(e.currentTarget.value);

        debounce(() => {
            // do something

        })
    }

    const search = async (searchValue: string) => {
        return await fetchAPI<User[]>('/users/search', {
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
        })
    }

    return (
        <InputText value={search} setValue={handleSearch} name={'search'} label={"Rechercher un collectionneur"} />
    )
}