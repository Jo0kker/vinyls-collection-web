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
            <div className="relative overflow-hidden rounded-lg md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4">
                {collectionVinyls.map((collectionVinyl, i) => {
                    const isFocus = i === index
                    const isBefore = index === 0 ? i === collectionVinyls.length - 1 : i === index - 1
                    const isAfter = index === collectionVinyls.length - 1 ? i === 0 : i === index + 1

                    return (
                        <div key={collectionVinyl.id} className="relative">
                            <div
                                className={cn(
                                    'relative aspect-square w-full max-w-[280px] mx-auto overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-200',
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
                                <Link
                                    href={`/vinyls/${collectionVinyl.vinyl_id}`}
                                    className="group block h-full w-full transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <Image
                                        src={prefixImage(collectionVinyl.vinyl?.image)}
                                        alt={`Illustation du vinyl ${collectionVinyl.vinyl.title}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-lg font-semibold text-white">
                                                {collectionVinyl.vinyl.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-200">
                                                {collectionVinyl.vinyl.artist}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-4 left-1/2 md:hidden">
                {collectionVinyls.map((collectionVinyl, i) => (
                    <button
                        key={`indicator-${collectionVinyl.id}`}
                        type="button"
                        className={cn(
                            'h-2 w-2 rounded-full transition-all duration-200',
                            i === index ? 'w-4 bg-fuchsia-500' : 'bg-fuchsia-500/50'
                        )}
                        aria-current={index === i ? 'true' : 'false'}
                        aria-label={`Vinyl ${i}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>

            <button
                type="button"
                className="absolute top-1/2 left-2 z-30 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl focus:outline-none md:hidden"
                onClick={() =>
                    setIndex(prev => (prev === 0 ? collectionVinyls.length - 1 : (prev -= 1)))
                }
            >
                <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
            </button>
            <button
                type="button"
                className="absolute top-1/2 right-2 z-30 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl focus:outline-none md:hidden"
                onClick={() =>
                    setIndex(prev => (prev === collectionVinyls.length - 1 ? 0 : (prev += 1)))
                }
            >
                <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
            </button>
        </div>
    )
}
