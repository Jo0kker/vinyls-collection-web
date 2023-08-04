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
    vinyls: CollectionVinyl[]
}

export default function Carousel({ vinyls }: CarouselProps) {
    const [index, setIndex] = useState(0)

    return (
        <div className="relative w-full">
            <div className="relative overflow-hidden rounded-lg lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4 lg:overflow-auto">
                {vinyls.map((item, i) => {
                    const isFocus = i === index
                    const isBefore = index === 0 ? i === vinyls.length - 1 : i === index - 1
                    const isAfter = index === vinyls.length - 1 ? i === 0 : i === index + 1

                    return (
                        <Link key={item.id} href={`/vinyls/${item.id}`}>
                            <div
                                className={cn(
                                    'relative h-[220px] w-full rounded-sm bg-gray-100 duration-200 ease-linear lg:relative lg:col-span-1 lg:mx-auto lg:mb-[3rem] lg:max-w-[220px]',
                                    (isBefore || isAfter) &&
                                        'absolute inset-0 z-10 transform transition-transform',
                                    isFocus
                                        ? ''
                                        : isBefore
                                        ? '-translate-x-full lg:translate-x-0'
                                        : isAfter
                                        ? 'translate-x-full lg:translate-x-0'
                                        : 'hidden lg:block'
                                )}
                            >
                                <Image
                                    src={prefixImage(item.vinyl?.image)}
                                    alt={`Illustation du vinyl ${item.vinyl.title}`}
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    className="lg:rounded-lg"
                                />

                                <div className="absolute inset-x-0 bottom-0 z-10 bg-white/60 px-2 py-1 hover:underline lg:bottom-[-3rem] lg:px-0 lg:py-0">
                                    <h3 className="truncate">{item.vinyl.title}</h3>
                                    <p className="truncate text-sm font-medium">
                                        {item.vinyl.artist}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 lg:hidden">
                {vinyls.map((item, i) => (
                    <button
                        key={`indicator-${item.id}`}
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
                className="absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none lg:hidden"
                onClick={() => setIndex(prev => (prev === 0 ? vinyls.length - 1 : (prev -= 1)))}
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
                </span>
            </button>
            <button
                type="button"
                className="absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none lg:hidden"
                onClick={() => setIndex(prev => (prev === vinyls.length - 1 ? 0 : (prev += 1)))}
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
                    <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                </span>
            </button>
        </div>
    )
}
