'use client'

import React, { useEffect, useState } from 'react'

import { faPlus } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'
import Image from 'next/image'

import { Accordion, AccordionItem } from '@/components/atom/accordion'
import { InputText } from '@/components/atom/InputText'
import Selector from '@/components/atom/Selector'
import { Vinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

export const ButtonAddVinyl = ({ collectionId }: { collectionId: number }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [titleStep, setTitleStep] = useState('Ajouter un vinyls')
    const [indexStep, setIndexStep] = useState(0)
    const [searchName, setSearchName] = useState('')
    const [searchArtist, setSearchArtist] = useState('')
    const [searchYear, setSearchYear] = useState('')
    const [formats, setFormats] = useState<{ id?: number; name?: string }[]>([])
    const [vinylsResult, setVinylsResult] = useState<Vinyl[]>()
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMorePage, setHasMorePage] = useState(false)
    const [nextStep, setNextStep] = useState('Recherche sur discogs')

    const handleToggle = (index: number) => {
        if (openIndex === index) {
            // If the same index is clicked again, close the panel
            setOpenIndex(null)
        } else {
            // Open the panel at the current index
            setOpenIndex(index)
        }
    }

    useEffect(() => {
        fetchAPI('/formats/search', {
            method: 'POST'
        }).then(r => {
            setFormats(r.data)
        })
    }, [])

    const resetAll = () => {
        setSearchName('')
        setSearchArtist('')
        setSearchYear('')
        setVinylsResult(undefined)
        setOpenIndex(0)
        setCurrentPage(1)
        setHasMorePage(false)
    }

    const searchDiscogs = async (page = 1) => {
        return await fetchAPI('/discogs/search', {
            method: 'POST',
            body: JSON.stringify({
                title: searchName,
                artist: searchArtist,
                year: searchYear,
                page: page,
                per_page: 10
            })
        })
    }

    const searchVinyls = async (page = 1) => {
        return await fetchAPI('/vinyls/search', {
            method: 'POST',
            body: JSON.stringify({
                filters: [
                    {
                        field: 'title',
                        operator: 'like',
                        value: `%${searchName}%`
                    },
                    {
                        field: 'artist',
                        operator: 'like',
                        value: `%${searchArtist}%`
                    },
                    {
                        field: 'released',
                        operator: 'like',
                        value: `%${searchYear}%`
                    }
                ],
                limit: 10,
                page: page
            })
        })
    }

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIndexStep(0)
        setNextStep('Recherche sur discogs')
        setTitleStep('Recherche en cours...')
        searchVinyls().then(r => {
            setTitleStep('Résultat de Vinyls-collection')
            setOpenIndex(1)
            setVinylsResult(r.data)
            setCurrentPage(1)
            if (r.last_page > 1) {
                setHasMorePage(true)
            } else {
                setHasMorePage(false)
            }
        })
    }

    const handleSearchDiscogs = () => {
        setIndexStep(1)
        setTitleStep('Recherche en cours...')
        searchDiscogs().then(r => {
            setTitleStep('Résultat de discogs')
            setOpenIndex(1)
            setVinylsResult(r.data)
            setCurrentPage(1)
            if (r.last_page > 1) {
                setHasMorePage(true)
            } else {
                setHasMorePage(false)
            }
        })
    }

    return (
        <>
            <Tooltip content="Ajouter un vinyls" placement="top" className="mr-1">
                <button
                    className="mr-1 inline-flex items-center rounded-md border px-2 py-2 hover:bg-emerald-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Tooltip>
            <Modal
                style={{ height: '100%' }}
                show={isOpen}
                position="center"
                onClose={() => {
                    setIsOpen(false)
                    setTitleStep('Ajouter un vinyls')
                    resetAll()
                }}
            >
                <Modal.Header>{titleStep}</Modal.Header>
                <Modal.Body className="px-1 pb-4">
                    <Accordion openIndex={openIndex} onToggle={handleToggle}>
                        <AccordionItem
                            title="Rechercher un vinyls"
                            isOpen={openIndex === 0}
                            onToggle={() => {}}
                        >
                            <form
                                onSubmit={handleSearch}
                                className="center flex flex-col gap-2 px-2 pt-3"
                            >
                                <InputText
                                    className="h-14"
                                    value={searchName}
                                    setValue={setSearchName}
                                    name="name"
                                    inputClassName="border-gray-200"
                                    label="Titre"
                                />
                                <InputText
                                    className="h-14"
                                    value={searchArtist}
                                    setValue={setSearchArtist}
                                    inputClassName="border-gray-200"
                                    name="artist"
                                    label="Artiste"
                                />
                                <InputText
                                    className="h-14"
                                    value={searchYear}
                                    inputClassName="border-gray-200"
                                    setValue={setSearchYear}
                                    name="year"
                                    label="Année"
                                />
                                <div className="flex justify-center">
                                    <button
                                        className="mb-1 rounded-md bg-fuchsia-900 px-1 py-2 text-white hover:bg-opacity-80"
                                        onClick={handleSearch}
                                    >
                                        Rechercher
                                    </button>
                                </div>
                            </form>
                        </AccordionItem>
                        <AccordionItem
                            title={titleStep}
                            isOpen={openIndex === 1}
                            onToggle={() => {}}
                            className="mt-2"
                        >
                            {vinylsResult && (
                                <>
                                    <div className="m-1 flex flex-col gap-4">
                                        {vinylsResult.map(item => (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-4 gap-4 rounded-xl border-2 p-2"
                                            >
                                                <div className="col-span-1">
                                                    <Image
                                                        src={item.image ?? '/images/vinyl.svg'}
                                                        alt={item.title}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full rounded-xl"
                                                    />
                                                </div>
                                                <div className="col-span-2 flex flex-col self-center">
                                                    <h2 className="text-lg font-bold">
                                                        {item.title}
                                                    </h2>
                                                    <h3 className="text-sm text-gray-500">
                                                        {item.artist}
                                                    </h3>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-center gap-4">
                                                    <Selector label="Format" options={formats} />
                                                    <button className="rounded-md bg-fuchsia-900 p-1 text-white hover:bg-opacity-80">
                                                        Ajouter
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex flex-row justify-center gap-4">
                                            {hasMorePage && (
                                                <button
                                                    className="rounded-md bg-fuchsia-900 px-1 py-2 text-white hover:bg-opacity-80"
                                                    onClick={() => {
                                                        if (indexStep === 0) {
                                                            searchVinyls(currentPage + 1).then(
                                                                r => {
                                                                    setVinylsResult([
                                                                        ...vinylsResult,
                                                                        ...r.data
                                                                    ])
                                                                    if (
                                                                        r.last_page >
                                                                        currentPage + 1
                                                                    ) {
                                                                        setHasMorePage(true)
                                                                    } else {
                                                                        setHasMorePage(false)
                                                                    }
                                                                    setCurrentPage(currentPage + 1)
                                                                }
                                                            )
                                                        } else {
                                                            searchDiscogs(currentPage + 1).then(
                                                                r => {
                                                                    setVinylsResult([...r.data])
                                                                    if (
                                                                        r.last_page >
                                                                        currentPage + 1
                                                                    ) {
                                                                        setHasMorePage(true)
                                                                    } else {
                                                                        setHasMorePage(false)
                                                                    }
                                                                    setCurrentPage(currentPage + 1)
                                                                }
                                                            )
                                                        }
                                                    }}
                                                >
                                                    Voir plus
                                                </button>
                                            )}
                                            <button
                                                className="rounded-md bg-fuchsia-900 px-1 py-2 text-white hover:bg-opacity-80"
                                                onClick={() => {
                                                    if (indexStep === 0) {
                                                        searchDiscogs(1).then(r => {
                                                            setVinylsResult([...r.data])
                                                            if (r.last_page > 1) {
                                                                setHasMorePage(true)
                                                            } else {
                                                                setHasMorePage(false)
                                                            }
                                                            setCurrentPage(1)
                                                            setIndexStep(1)
                                                            setNextStep('Création manuelle')
                                                        })
                                                    }
                                                }}
                                            >
                                                {nextStep}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </AccordionItem>
                    </Accordion>
                </Modal.Body>
            </Modal>
        </>
    )
}
