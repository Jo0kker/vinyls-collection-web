'use client'

import { useState } from 'react'

import { faPen, faTrash } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'

import deleteVinyl from '@/app/users/[userId]/collection/[collectionId]/actions/deleteVinyl'
import useModalStore from '@/store/modalStore'
import { CollectionVinyl, Search, Trade } from '@/types'
import { cn } from '@/utils/classNames'
import { prefixImage } from '@/utils/prefixImage'
import { showToast } from '@/utils/toast'

type VinylItemProps = {
    item: Search | CollectionVinyl | Trade
    collectionId: string
    isOwner?: boolean
}

export function VinylItem({ item, collectionId, isOwner }: VinylItemProps) {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const openModal = useModalStore((state) => state.openModal);

    const editVinyl = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        /**
         * For the collection
         * -1: Wishlist (Recherches)
         * -2: Trades (Échanges)
         * other: Collection
         */
        openModal(item, collectionId)
    }

    return (
        <div className="group m-1 flex rounded border-2 border-gray-300">
            <Link
                href={`/vinyls/${item.vinyl_id}`}
                className="relative h-full w-[100px] min-w-[100px]"
            >
                <Image
                    src={prefixImage(item.vinyl?.image)}
                    alt={item.vinyl?.title}
                    width={100}
                    height={100}
                    sizes="100px"
                    className="cursor-pointer"
                    objectFit="cover"
                    style={{ objectFit: 'cover', height: '100%' }}
                />
            </Link>

            <Link href={`/vinyls/${item.vinyl_id}`} className="mx-3 flex-1 truncate py-0.5">
                <h2 className="text-fuchsia-80 truncate text-lg font-bold group-hover:underline">
                    {item.vinyl.title}
                </h2>
                <h3 className="mb-2 truncate text-sm text-fuchsia-800">{item.vinyl.artist}</h3>
                <p className="text-xs font-light">{item.vinyl.released}</p>
            </Link>
            {isOwner && (
                <div className="flex flex-col justify-center px-0.5 pt-0.5">
                    <button
                        className={cn('h-8 w-8 rounded-md hover:bg-red-200', {
                            'cursor-not-allowed': !collectionId,
                            'bg-red-200': isLoadingDelete
                        })}
                        disabled={!collectionId}
                        onClick={e => {
                            e.preventDefault()
                            setIsLoadingDelete(true)
                            deleteVinyl(item.id, collectionId).then(() => {
                                setIsLoadingDelete(false)
                                showToast({ type: 'success', message: 'Vinyle supprimé' })
                            })
                        }}
                    >
                        {isLoadingDelete ? (
                            <Spinner size="sm" color="failure" />
                        ) : (
                            <FontAwesomeIcon icon={faTrash} className="text-red-800" size="sm" />
                        )}
                    </button>
                    <button
                        className={cn('h-8 w-8 rounded-md hover:bg-red-200', {
                            'cursor-not-allowed': !collectionId,
                            'bg-red-200': isLoadingDelete
                        })}
                        disabled={!collectionId}
                        onClick={editVinyl}
                    >
                        <FontAwesomeIcon icon={faPen} className="text-fuchsia-600" size="sm" />
                    </button>
                </div>
            )}
        </div>
    )
}
