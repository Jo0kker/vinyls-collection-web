'use client'

import React, {useEffect, useState} from 'react'

import {faPlus} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Modal, Tooltip} from 'flowbite-react'
import {Formik} from 'formik'
import Image from 'next/image'
import {useSession} from 'next-auth/react'

import revalidateCacheClient from '@/components/actions/revalidateCacheClient'
import {Accordion, AccordionItem} from '@/components/atom/accordion'
import {InputText} from '@/components/atom/InputText'
import {Vinyl} from '@/types'
import {fetchAPI} from '@/utils/fetchAPI'
import {prefixImage} from '@/utils/prefixImage'
import {showToast} from '@/utils/toast'

export const ButtonAddVinyl = ({ collectionId }: { collectionId: number }) => {
    const session = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [titleStep, setTitleStep] = useState('Ajouter un vinyls')
    // step 0: search vinyls in vinyls-collection
    // step 1: search vinyls in discogs
    // step 2: create vinyls manually
    const [indexStep, setIndexStep] = useState(0)
    const [searchName, setSearchName] = useState('')
    const [searchArtist, setSearchArtist] = useState('')
    const [searchYear, setSearchYear] = useState('')
    const [formats, setFormats] = useState<{ id?: number; name?: string }[]>([])
    const [vinylsResult, setVinylsResult] = useState<Vinyl[]>()
    // for the accordion component
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
        const filters = []
        if (searchName) {
            filters.push({
                field: 'title',
                operator: 'like',
                value: `%${searchName}%`
            })
        }
        if (searchArtist) {
            filters.push({
                field: 'artist',
                operator: 'like',
                value: `%${searchArtist}%`
            })
        }
        if (searchYear) {
            filters.push({
                field: 'released',
                operator: 'like',
                value: `%${searchYear}%`
            })
        }

        return await fetchAPI('/vinyls/search', {
            method: 'POST',
            body: JSON.stringify({
                search: {
                    filters: filters,
                    limit: 10,
                    page: page
                }
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

    const getVinylFormat = (item: any) => {
        if (indexStep === 1) {
            // find item.formats[0] in formats
            const format = formats.find(f => f.name === item.formats[0])
            if (format) {
                return `${format.id}`
            } else {
                return `${formats[0].id}`
            }
        } else {
            return `${formats[0].id}`
        }
    }

    const getAllVinylFormats = (item: any): {
        id?: number
        name?: string
    }[] => {
        if (indexStep === 1) {
            // return all formats in item.formats
            return item.formats.map((f: string | undefined) => {
                const format = formats.find(f2 => f2.name === f)
                if (format) {
                    return format
                } else {
                    return formats[0]
                }
            })
        } else {
            return formats
        }
    }

    const handleAddVinyl = async (data: { vinyl_id: string; format: string }) => {
        // if data.vinyl_id contains 'vc_' then it's a vinyls-collection vinyl
        // else it's a discogs vinyl
        const token = session?.data?.user.access_token
        const sourceVinyl = data.vinyl_id.includes('vc_') ? 'vc' : 'discogs'
        const vinylId = data.vinyl_id.replace('vc_', '').replace('discogs_', '')
        const revalidateCacheClientSearch = revalidateCacheClient.bind('searchVinyls')

        if (sourceVinyl === 'vc') {
            switch (collectionId) {
                case -1:
                    fetchAPI('/searches/mutate', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            mutate: [
                                {
                                    operation: 'create',
                                    attributes: {
                                        vinyl_id: parseInt(vinylId),
                                        format_vinyl_id: parseInt(data.format)
                                    }
                                }
                            ]
                        })
                    }).then(async () => {
                        await revalidateCacheClientSearch({ tag: 'searchVinyls' })
                        showToast({
                            type: 'success',
                            message: 'Vinyl ajouté à la liste de souhaits'
                        })
                    }).catch(e => {
                        showToast({
                            type: 'error',
                            message: e.message
                        })
                    })
                    break
                case -2:
                    // add to trade
                    fetchAPI('/trades/mutate', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            mutate: [
                                {
                                    operation: 'create',
                                    attributes: {
                                        vinyl_id: parseInt(vinylId),
                                        format_vinyl_id: parseInt(data.format)
                                    }
                                }
                            ]
                        })
                    })
                      .then(async () => {
                        await revalidateCacheClientSearch({ tag: 'tradeVinyls' })
                          showToast({
                              type: 'success',
                              message: 'Vinyl ajouté à la liste de recherches'
                          })
                      })
                      .catch(e => {
                          showToast({
                              type: 'error',
                              message: e.message
                          })
                      })
                    ;

                    break
                default:
                    fetchAPI('/collectionVinyl/mutate', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            mutate: [
                                {
                                    operation: 'create',
                                    attributes: {
                                        collection_id: collectionId,
                                        vinyl_id: parseInt(vinylId),
                                        format_vinyl_id: parseInt(data.format)
                                    }
                                }
                            ]
                        })
                    }).then(async () => {
                        await revalidateCacheClientSearch({ tag: 'collectionVinyl' })
                        showToast({
                            type: 'success',
                            message: 'Vinyl ajouté à la collection'
                        })
                    }).catch(e => {
                        showToast({
                            type: 'error',
                            message: e.message
                        })
                    })
            }
        } else {
            // le vinyl est présent sur discogs mais pas sur vinyls-collection
            // on récup les datas du vinyl sur discogs dans vinylResult
            const vinylData = vinylsResult?.find(v => v.discog_id === parseInt(vinylId))
            console.log(vinylData)
        }
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
                                <div className="m-1 flex flex-col gap-4">
                                    {vinylsResult.map(item => (
                                        <div
                                            key={item.id}
                                            className="grid grid-cols-4 gap-4 rounded-xl border-2 p-2"
                                        >
                                            <div className="col-span-1">
                                                <Image
                                                    src={prefixImage(item.image)}
                                                    alt={item.title}
                                                    width={100}
                                                    height={100}
                                                    className="h-full w-full rounded-xl"
                                                />
                                            </div>
                                            <div className="col-span-2 flex flex-col self-center">
                                                <h2 className="text-lg font-bold">{item.title}</h2>
                                                <h3 className="text-sm text-gray-500">
                                                    {item.artist}
                                                </h3>
                                            </div>
                                            <Formik
                                                initialValues={{
                                                    vinyl_id: item.id
                                                        ? `vc_${item.id}`
                                                        : `discogs_${item.discog_id}`,
                                                    format: getVinylFormat(item)
                                                }}
                                                onSubmit={(values, { setSubmitting }) => {
                                                    handleAddVinyl(values).then(() => {
                                                        setIsOpen(false)
                                                        resetAll()
                                                    })
                                                }}
                                            >
                                                {({ handleSubmit, handleChange, values }) => (
                                                    <form
                                                        onSubmit={handleSubmit}
                                                        className="col-span-1 flex flex-col items-center gap-4"
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="vinyl_id"
                                                            value={values.vinyl_id}
                                                        />
                                                        <select
                                                            name="format"
                                                            value={values.format}
                                                            onChange={handleChange}
                                                            className="rounded-md border-2 p-1"
                                                        >
                                                            {getAllVinylFormats(item).map(format => (
                                                                <option
                                                                    key={format.id}
                                                                    value={format.id}
                                                                >
                                                                    {format.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            type="submit"
                                                            className="rounded-md bg-fuchsia-900 p-1 text-white hover:bg-opacity-80"
                                                        >
                                                            Ajouter
                                                        </button>
                                                    </form>
                                                )}
                                            </Formik>
                                        </div>
                                    ))}
                                    <div className="flex flex-row justify-center gap-4">
                                        {hasMorePage && (
                                            <button
                                                className="rounded-md bg-fuchsia-900 px-1 py-2 text-white hover:bg-opacity-80"
                                                onClick={() => {
                                                    if (indexStep === 0) {
                                                        searchVinyls(currentPage + 1).then(r => {
                                                            setVinylsResult([
                                                                ...vinylsResult,
                                                                ...r.data
                                                            ])
                                                            if (r.last_page > currentPage + 1) {
                                                                setHasMorePage(true)
                                                            } else {
                                                                setHasMorePage(false)
                                                            }
                                                            setCurrentPage(currentPage + 1)
                                                        })
                                                    } else {
                                                        searchDiscogs(currentPage + 1).then(r => {
                                                            setVinylsResult([...r.data])
                                                            if (r.last_page > currentPage + 1) {
                                                                setHasMorePage(true)
                                                            } else {
                                                                setHasMorePage(false)
                                                            }
                                                            setCurrentPage(currentPage + 1)
                                                        })
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
                                                    setTitleStep(
                                                        'Recherche sur Discogs en cours...'
                                                    )
                                                    searchDiscogs(1).then(r => {
                                                        setVinylsResult([...r.data])
                                                        setTitleStep('Résultat de Discogs')
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
                            )}
                        </AccordionItem>
                    </Accordion>
                </Modal.Body>
            </Modal>
        </>
    )
}
