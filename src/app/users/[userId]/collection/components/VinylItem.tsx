'use client'

import { useState } from 'react'

import { faPen, faTrash, faEye } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'

import deleteVinyl from '@/app/users/[userId]/collection/actions/deleteVinyl'
import useModalItemEditStore from '@/store/modalItemEditStore'
import useModalItemViewStore from '@/store/modalItemViewStore'
import { CollectionVinyl, Search, Trade } from '@/types'
import { cn } from '@/utils/classNames'
import { prefixImage } from '@/utils/prefixImage'
import { showToast } from '@/utils/toast'
import { ViewStyle } from '../types/ViewStyle'

type VinylItemProps = {
    item: Search | CollectionVinyl | Trade
    collectionId: any
    isOwner?: boolean
    onDelete?: () => void
    onRefresh?: () => void
    viewStyle: ViewStyle
}

export function VinylItem({ item, collectionId, isOwner, onDelete, onRefresh, viewStyle }: VinylItemProps) {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const openModal = useModalItemEditStore((state) => state.openModal)
    const openViewModal = useModalItemViewStore((state) => state.openModal)

    const showActions = isOwner && collectionId !== -3
    const showEye = !isOwner && collectionId !== -3

    const editVinyl = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        /**
         * For the collection
         * -1: Wishlist (Recherches)
         * -2: Trades (Échanges)
         * other: Collection
         */
        openModal(item, collectionId, () => {
            // Déclencher le rechargement des données
            if (onRefresh) onRefresh()
        })
    }

    const viewVinyl = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        openViewModal(item, collectionId)
    }

    const getStyleClasses = () => {
        switch (viewStyle) {
            case ViewStyle.GRID:
                return "flex flex-col w-full border border-gray-200 rounded-lg group hover:shadow-md transition-shadow overflow-hidden"
            case ViewStyle.COMPACT:
                return "flex items-center gap-2 p-2 border-b border-gray-200 group hover:bg-gray-50"
            case ViewStyle.DETAILS:
                return "relative w-full aspect-square group overflow-hidden rounded-lg"
            default: // LIST
                return "flex m-1 border-2 border-gray-300 rounded group"
        }
    }

    const getImageClasses = () => {
        switch (viewStyle) {
            case ViewStyle.GRID:
                return "w-full h-[180px] rounded-t-lg"
            case ViewStyle.COMPACT:
                return "w-[50px] h-[50px] rounded"
            case ViewStyle.DETAILS:
                return "w-full h-full"
            default: // LIST
                return "w-[100px] h-full min-w-[100px]"
        }
    }

    return (
        <div className={getStyleClasses()}>
            {viewStyle === ViewStyle.DETAILS ? (
                <>
                    <Link href={`/vinyls/${item.vinyl_id}`} className={getImageClasses()}>
                        <Image
                            src={prefixImage(item.vinyl?.image)}
                            alt={item.vinyl?.title}
                            width={150}
                            height={150}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-2 text-white bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300">
                            <h2 className="text-sm font-bold truncate">
                                {item.vinyl.title}
                            </h2>
                            <p className="text-xs truncate">
                                {item.vinyl.artist}
                            </p>
                        </div>
                    </Link>
                </>
            ) : (
                <>
                    {viewStyle === ViewStyle.GRID ? (
                        <>
                            <Link href={`/vinyls/${item.vinyl_id}`} className="flex-1">
                                <div className="relative">
                                    <Image
                                        src={prefixImage(item.vinyl?.image)}
                                        alt={item.vinyl?.title}
                                        width={180}
                                        height={180}
                                        className="object-cover w-full aspect-square"
                                    />
                                </div>
                                <div className="p-2">
                                    <h2 className="text-sm font-bold truncate text-fuchsia-800 group-hover:text-fuchsia-600">
                                        {item.vinyl.title}
                                    </h2>
                                    <p className="text-xs truncate text-fuchsia-600">
                                        {item.vinyl.artist}
                                    </p>
                                </div>
                            </Link>
                            {showActions && (
                                <div className="flex justify-end border-t border-gray-100 bg-gray-50/50">
                                    <button
                                        className="flex-1 p-2 transition-colors border-r border-gray-100 hover:bg-red-50"
                                        onClick={onDelete}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-red-600 opacity-60 hover:opacity-100" size="sm" />
                                    </button>
                                    <button
                                        className="flex-1 p-2 transition-colors hover:bg-fuchsia-50"
                                        onClick={editVinyl}
                                    >
                                        <FontAwesomeIcon icon={faPen} className="text-fuchsia-600 opacity-60 hover:opacity-100" size="sm" />
                                    </button>
                                </div>
                            )}
                            {showEye && (
                                <div className="flex justify-end border-t border-gray-100 bg-gray-50/50">
                                    <button
                                        className="flex-1 p-2 transition-colors hover:bg-fuchsia-50"
                                        onClick={viewVinyl}
                                    >
                                        <FontAwesomeIcon icon={faEye} className="text-fuchsia-600 opacity-60 hover:opacity-100" size="sm" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link
                                href={`/vinyls/${item.vinyl_id}`}
                                className={getImageClasses()}
                            >
                                <Image
                                    src={prefixImage(item.vinyl?.image)}
                                    alt={item.vinyl?.title}
                                    width={viewStyle === ViewStyle.COMPACT ? 50 : 100}
                                    height={viewStyle === ViewStyle.COMPACT ? 50 : 100}
                                    className="object-cover w-full h-full rounded cursor-pointer"
                                />
                            </Link>

                            <Link
                                href={`/vinyls/${item.vinyl.id}`}
                                className="flex flex-col flex-1 p-4"
                            >
                                <h2 className="mb-1 text-base font-semibold truncate">
                                    {item.vinyl.title}
                                </h2>
                                <h3 className="mb-2 text-sm truncate text-fuchsia-800">{item.vinyl.artist}</h3>
                                <p className="text-xs font-light">{item.vinyl.released}</p>
                            </Link>
                            {showActions && (
                                <div className="flex flex-col justify-center px-0.5 pt-0.5">
                                    <button
                                        className="w-8 h-8 rounded-md hover:bg-red-200"
                                        onClick={onDelete}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-red-800" size="sm" />
                                    </button>
                                    <button
                                        className="w-8 h-8 rounded-md hover:bg-fuchsia-200"
                                        onClick={editVinyl}
                                    >
                                        <FontAwesomeIcon icon={faPen} className="text-fuchsia-600" size="sm" />
                                    </button>
                                </div>
                            )}
                            {showEye && (
                                <div className="flex justify-end border-t border-gray-100 bg-gray-50/50">
                                    <button
                                        className="flex-1 p-2 transition-colors hover:bg-fuchsia-50"
                                        onClick={viewVinyl}
                                    >
                                        <FontAwesomeIcon icon={faEye} className="text-fuchsia-600 opacity-60 hover:opacity-100" size="sm" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}
