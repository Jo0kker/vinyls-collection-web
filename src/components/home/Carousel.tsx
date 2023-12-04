'use client'

import { useState } from 'react'

import { faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import { CollectionVinyl } from '@/types'
import { cn } from '@/utils/classNames'
import { prefixImage } from '@/utils/prefixImage'

type CarouselProps = {
    collectionVinyls: CollectionVinyl[]
}

export default function Carousel({ collectionVinyls }: CarouselProps) {
    const [index, setIndex] = useState(0)

    return (
        <div className="relative w-full">
            <div className="relative overflow-hidden rounded-lg md:grid md:grid-cols-3 md:grid-rows-2 md:overflow-auto lg:gap-4">
                {collectionVinyls.map((collectionVinyl, i) => {
                    const isFocus = i === index
                    const isBefore =
                        index === 0 ? i === collectionVinyls.length - 1 : i === index - 1
                    const isAfter =
                        index === collectionVinyls.length - 1 ? i === 0 : i === index + 1

                    return (
                        <div key={collectionVinyl.id}>
                            <Link
                                href={`/vinyls/${collectionVinyl.vinyl_id}`}
                                className="hover:bg-gray-400 md:mx-4 md:block md:rounded-xl md:border-4 md:bg-gray-200 md:bg-opacity-50 md:pt-4"
                            >
                                <div
                                    className={cn(
                                        'relative h-[220px] w-full rounded-sm bg-gray-100 duration-200 ease-linear md:relative md:col-span-1 md:mx-auto md:mb-[3rem] md:max-w-[220px] md:bg-transparent',
                                        (isBefore || isAfter) &&
                                            'absolute inset-0 z-10 transform transition-transform',
                                        isFocus
                                            ? ''
                                            : isBefore
                                            ? '-translate-x-full md:translate-x-0'
                                            : isAfter
                                            ? 'translate-x-full md:translate-x-0'
                                            : 'hidden md:block'
                                    )}
                                >
                                    <Image
                                        src={prefixImage(collectionVinyl.vinyl?.image)}
                                        alt={`Illustation du vinyl ${collectionVinyl.vinyl.title}`}
                                        fill
                                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                                        className="md:rounded-md"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 z-10 bg-black/70 px-2 py-1 hover:underline md:bottom-[-3rem] md:bg-transparent md:px-0 md:py-0">
                                        <h3 className="truncate text-white md:text-black">
                                            {collectionVinyl.vinyl.title}
                                        </h3>
                                        <p className="truncate text-sm font-medium text-white md:text-black">
                                            {collectionVinyl.vinyl.artist}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 md:hidden">
                {collectionVinyls.map((collectionVinyl, i) => (
                    <button
                        key={`indicator-${collectionVinyl.id}`}
                        type="button"
                        className={cn(
                            'h-3 w-3 rounded-full',
                            i === index ? 'bg-white' : 'bg-white/50'
                        )}
                        aria-current={index === i ? 'true' : 'false'}
                        aria-label={`Vinyl ${i}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>

            <button
                type="button"
                className="absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none md:hidden"
                onClick={() =>
                    setIndex(prev => (prev === 0 ? collectionVinyls.length - 1 : (prev -= 1)))
                }
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
                </span>
            </button>
            <button
                type="button"
                className="absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none md:hidden"
                onClick={() =>
                    setIndex(prev => (prev === collectionVinyls.length - 1 ? 0 : (prev += 1)))
                }
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
                    <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                </span>
            </button>
        </div>
    )
}
