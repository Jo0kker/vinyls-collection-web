'use client'

import { faTrash } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { Spinner } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { CollectionVinyl, Search } from '@/types'
import { cn } from '@/utils/classNames'
import { prefixImage } from '@/utils/prefixImage'
import { showToast } from '@/utils/toast'

type VinylItemProps = {
    item: Search | CollectionVinyl
    collectionId?: string
}

export function VinylItem({ item, collectionId }: VinylItemProps) {
    const router = useRouter()
    const session = useSession()

    const deleteVinyl = useMutation({
        mutationFn: () =>
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/collections/${collectionId}/collectionVinyl/${item.id}`,
                {
                    method: 'delete',
                    headers: {
                        Authorization: `Bearer ${session.data?.user.access_token}`
                    }
                }
            ),
        onSuccess: () => {
            showToast('success', 'Vinyl supprimé de la collection')
            router.refresh()
        },
        onError: () => showToast('error', 'Une erreur est survenue')
    })

    return (
        <Link
            href={`/vinyls/${item.vinyl_id}`}
            className="group m-1 flex rounded border-2 border-gray-300"
        >
            <div className="relative h-full w-[100px] min-w-[100px]">
                <Image
                    src={prefixImage(item.vinyl.image)}
                    alt={item.vinyl.title}
                    fill
                    className="cursor-pointer"
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className="mx-3 flex-1 truncate py-0.5">
                <h2 className="text-fuchsia-80 truncate text-lg font-bold group-hover:underline">
                    {item.vinyl.title}
                </h2>
                <h3 className="mb-2 truncate text-sm text-fuchsia-800">{item.vinyl.artist}</h3>
                <p className="text-xs font-light">{item.vinyl.released}</p>
            </div>

            <div className="flex justify-center px-0.5 pt-0.5">
                <button
                    className={cn('h-8 w-8 rounded-md hover:bg-red-200', {
                        'cursor-not-allowed': !collectionId,
                        'bg-red-200': deleteVinyl.isPending
                    })}
                    disabled={!collectionId}
                    onClick={
                        collectionId
                            ? e => {
                                  e.stopPropagation()
                                  e.preventDefault()
                                  deleteVinyl.mutate()
                              }
                            : undefined
                    }
                >
                    {deleteVinyl.isPending ? (
                        <Spinner size="sm" color="failure" />
                    ) : (
                        <FontAwesomeIcon icon={faTrash} className="text-red-800" size="sm" />
                    )}
                </button>
            </div>
        </Link>
    )
}
