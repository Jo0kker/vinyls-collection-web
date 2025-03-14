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
            className="group flex flex-row transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-fuchsia-200 overflow-hidden"
        >
            <div className="relative w-24 h-full min-w-[96px] flex-shrink-0">
                <Image
                    src={
                        user.avatar
                            ? user.avatar
                            : 'https://minio-s0o448og8cs4884cg0wccg8c.54.37.82.33.sslip.io/vinyl-collection/default_image_vinyl.png'
                    }
                    alt={user.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col justify-center p-4">
                <h2 className="font-bold text-lg text-fuchsia-800 group-hover:text-fuchsia-600 transition-colors duration-200">
                    {user.name}
                </h2>
                <div className="mt-1 space-y-0.5">
                    <p className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full mr-2" />
                        {user.collectionVinyls_count} vinyls
                    </p>
                    <p className="text-xs text-gray-500">
                        Dernière connexion :
                        {user.last_activity === null
                            ? ' Jamais'
                            : DateTime.fromFormat(user.last_activity, 'yyyy-MM-dd HH:mm:ss').toFormat(
                                  ' dd/MM/yyyy'
                              )}
                    </p>
                </div>
            </div>
        </Link>
    )
}
