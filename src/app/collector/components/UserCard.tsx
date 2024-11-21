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
            href={`/users/${user.id}/collection`}
            className="flex flex-row m-1 transition-colors border-2 border-gray-300 rounded-lg hover:bg-gray-100"
        >
            <div className="relative w-[110px] h-[110px] min-w-[110px]">
                <Image
                    src={
                        user.avatar
                            ? user.avatar
                            : 'https://vinyls-collection.fra1.cdn.digitaloceanspaces.com/default_image_vinyl.png'
                    }
                    alt={user.name}
                    fill
                    sizes="110px"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col justify-center p-3">
                <h2 className="font-bold text-fuchsia-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.collectionVinyls_count} vinyls</p>
                <p className="text-sm text-gray-600">
                    Dernière connexion :
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
