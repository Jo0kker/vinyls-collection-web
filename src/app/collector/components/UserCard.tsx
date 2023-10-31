import React from 'react'

import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'

import { User } from '@/types'

type UserCardProps = {
    user: User
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="m-1 flex flex-row rounded border border-8 border-gray-300 hover:bg-gray-400"
        >
            <Image
                src={
                    user.avatar
                        ? user.avatar
                        : 'https://vinyls-collection.fra1.cdn.digitaloceanspaces.com/default_image_vinyl.png'
                }
                alt={user.name}
                width={100}
                height={100}
                className="cursor-pointer"
            />
            <div className="mx-3 flex flex-col justify-center">
                <h2>{user.name}</h2>
                <p className="text-sm">{user.collectionVinyls_count} vinyls</p>
                <p className="text-sm">
                    Dernière connection :
                    {user.last_activity === null
                        ? ' Jamais'
                        : DateTime.fromFormat(user.last_activity, 'yyyy-MM-dd HH:mm:ss').toFormat(
                              ' dd/MM/yyyy'
                          )}
                </p>
            </div>
        </Link>
    )
}
