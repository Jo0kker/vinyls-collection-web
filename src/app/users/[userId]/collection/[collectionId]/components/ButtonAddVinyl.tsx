'use client'

import React, { useEffect, useState } from 'react'

import { faPlus, faTurntable, faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'
import { ErrorMessage, Formik } from 'formik'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import * as Yup from 'yup'

import revalidateCacheClient from '@/components/actions/revalidateCacheClient'
import { Accordion, AccordionItem } from '@/components/atom/Accordion'
import { InputText } from '@/components/atom/InputText'
import { Vinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'
import { showToast } from '@/utils/toast'

const ButtonAddVinyl = ({ collectionId }: { collectionId: number }) => {
    const session = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [titleStep, setTitleStep] = useState('Ajouter un vinyls')
    const token = session?.data?.user.access_token
    // step 0: search vinyls in vinyls-collection
    // step 1: search vinyls in discogs
    // step 2: create vinyls manually
    const [indexStep, setIndexStep] = useState(0)
    const [searchName, setSearchName] = useState('')
    const [searchArtist, setSearchArtist] = useState('')
    const [searchYear, setSearchYear] = useState('')
    const [provenance, setProvenance] = useState('')
    const [discogCode, setDiscogCode] = useState('')
    const [formats, setFormats] = useState<{ id?: number; name?: string }[]>([])
    const [vinylsResult, setVinylsResult] = useState<Vinyl[]>()
    // for the accordion component
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMorePage, setHasMorePage] = useState(false)
    const [nextStep, setNextStep] = useState('Recherche sur discogs')
    const revalidateCacheClientSearch = revalidateCacheClient.bind('searchVinyls')
    const [isLoadingAdd, setIsLoadingAdd] = useState(false)

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
        setProvenance('')
        setDiscogCode('')
        setIsLoadingAdd(false)
        setVinylsResult(undefined)
        setOpenIndex(0)
        setCurrentPage(1)
        setHasMorePage(false)
        setIndexStep(0)
    }

    const searchDiscogs = async (page = 1) => {
        return await fetchAPI('/discogs/search', {
            method: 'POST',
            body: JSON.stringify({
                title: searchName,
                artist: searchArtist,
                year: searchYear,
                discog_code: discogCode,
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
        if (provenance) {
            filters.push({
                field: 'provenance',
                operator: 'like',
                value: `%${provenance}%`
            })
        }
        if (discogCode) {
            // code is like "[m27113]" and id is 27113 and m for master or r for release
            const discogId = discogCode
                .replace('[', '')
                .replace(']', '')
                .replace('m', '')
                .replace('r', '')
            const discogType = discogCode.includes('r') ? 'release' : 'master'
            filters.push({
                field: 'discog_id',
                operator: 'like',
                value: `%${discogId}%`
            })
            filters.push({
                field: 'type',
                operator: 'like',
                value: `%${discogType}%`
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
        if (item.id) {
            if (!item.formats) return formats[0].name
            return item.formats[0]
        } else {
            if (formats[0].id) {
                return `${formats[0].name}`
            } else {
                return `${formats[0].name}`
            }
        }
    }

    const getAllVinylFormats = (
        item: any
    ): {
        id?: number
        name?: string
    }[] => {
        if (indexStep === 1) {
            // return item.format with id autogenerated and name not from formats
            if (!item.formats) return formats
            return item.formats.map((f: string | { name: string }) => {
                return {
                    id: Math.floor(Math.random() * 1000000),
                    name: typeof f === 'string' ? f : f.name
                }
            })
        } else {
            return formats
        }
    }

    // handle add vinyl discogs or vinyls-collection create discogs vinyls if not exist
    const handleAddVinyl = (data: { vinyl_id: string; format: string; type?: string }) => {
        setIsLoadingAdd(true)
        const sourceVinyl = data.vinyl_id.includes('vc_') ? 'vc' : 'discogs'
        const vinylId = data.vinyl_id.replace('vc_', '').replace('discogs_', '')

        if (sourceVinyl === 'vc') {
            addVinyl({
                collectionId: collectionId,
                vinylId: parseInt(vinylId),
                format: data.format
            })
        } else {
            fetchAPI('/vinyls/discogs', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    discog_id: vinylId,
                    type: data.type
                })
            })
                .then(r => {
                    const newVinylId = r.id
                    addVinyl({
                        collectionId: collectionId,
                        vinylId: newVinylId,
                        format: data.format
                    })
                })
                .catch(() => {
                    showToast({
                        type: 'error',
                        message: 'Une erreur est survenue, avez-vous confirmé votre mail ?'
                    })
                })
        }
    }

    // add vinyl to collection, (-1) wishlist, (-2) trade
    const addVinyl = ({
        collectionId,
        vinylId,
        format
    }: {
        collectionId: number
        vinylId: number
        format: string
    }) => {
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
                                    vinyl_id: vinylId,
                                    format: format
                                }
                            }
                        ]
                    })
                })
                    .then(async () => {
                        await revalidateCacheClientSearch({ tag: 'searchVinyls' })
                        showToast({
                            type: 'success',
                            message: 'Vinyl ajouté à la liste de souhaits'
                        })
                        setIsOpen(false)
                        resetAll()
                    })
                    .catch(e => {
                        setIsLoadingAdd(false)
                        showToast({
                            type: 'error',
                            message: e.message.message
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
                                    vinyl_id: vinylId,
                                    format: format
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
                        setIsOpen(false)
                        resetAll()
                    })
                    .catch(e => {
                        setIsLoadingAdd(false)
                        showToast({
                            type: 'error',
                            message: e.message.message
                        })
                    })

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
                                    vinyl_id: vinylId,
                                    format: format
                                }
                            }
                        ]
                    })
                })
                    .then(async () => {
                        await revalidateCacheClientSearch({ tag: 'collectionVinyl' })
                        showToast({
                            type: 'success',
                            message: 'Vinyl ajouté à la collection'
                        })
                        setIsOpen(false)
                        resetAll()
                    })
                    .catch(e => {
                        setIsLoadingAdd(false)
                        showToast({
                            type: 'error',
                            message: JSON.parse(e.message).message
                        })
                    })
        }
    }

    const storeVinyl = (data: {
        title: string
        artist: string
        year: string
        genre: string
        image: File | string
        format: string
        provenance: string
    }) => {
        // send data to api
        setIsLoadingAdd(true)
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('artist', data.artist)
        formData.append('released', data.year)
        formData.append('genre', data.genre)
        formData.append('image', data.image)
        formData.append('format', data.format)
        formData.append('provenance', data.provenance)

        fetchAPI('/vinyls', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
            .then(res => {
                const vinylId = res.id
                addVinyl({
                    collectionId: collectionId,
                    vinylId: vinylId,
                    format: data.format
                })
            })
            .catch(e => {
                showToast({
                    type: 'error',
                    message: e.message
                })
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
                    {indexStep !== 2 ? (
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
                                    <span className="w-full text-center italic opacity-40">
                                        Aucun champ n'est obligatoire.
                                    </span>
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
                                    <InputText
                                        className="h-14"
                                        value={provenance}
                                        inputClassName="border-gray-200"
                                        setValue={setProvenance}
                                        name="provenance"
                                        label="Provenance"
                                    />
                                    <InputText
                                        className="h-14"
                                        value={discogCode}
                                        inputClassName="border-gray-200"
                                        setValue={setDiscogCode}
                                        name="discogCode"
                                        label="Discogs Code"
                                    />
                                    <Tooltip
                                        content={
                                            <Image
                                                src="https://vinyls-collection.fra1.cdn.digitaloceanspaces.com/helperCodeDiscog.png"
                                                alt="helper code discogs"
                                                width={1200}
                                                height={1200}
                                                className="h-full w-full rounded-xl"
                                            />
                                        }
                                        placement="bottom"
                                    >
                                        <span className="italic opacity-40">
                                            Comment trouver le code ?
                                        </span>
                                    </Tooltip>
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
                                        {vinylsResult.length === 0 && (
                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-lg font-bold">
                                                    Aucun résultat
                                                </h2>
                                            </div>
                                        )}
                                        {vinylsResult.length > 0 &&
                                            vinylsResult.map(item => (
                                                <div
                                                    key={item.id ? item.id : item.discog_id}
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
                                                        <div className="flex flex-row ">
                                                            {item.discog_id && (
                                                                <Tooltip
                                                                    content="Vinyle importé de Discogs"
                                                                    placement="bottom"
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={faTurntable}
                                                                        color="purple"
                                                                        size="xl"
                                                                    />
                                                                </Tooltip>
                                                            )}
                                                            <h2 className="ml-1 text-lg font-bold">
                                                                {item.title}
                                                            </h2>
                                                        </div>
                                                        <h3 className="text-gray-500">
                                                            {/* if item.artist or item.artists.name join */}
                                                            {item.artist
                                                                ? item.artist
                                                                : item.artists
                                                                      ?.map(
                                                                          (artist: {
                                                                              name: string
                                                                          }) => artist.name
                                                                      )
                                                                      .join(', ')}
                                                        </h3>
                                                        <h4 className="text-sm text-gray-500">
                                                            {item.released}
                                                        </h4>
                                                        <h4 className="text-sm text-gray-500">
                                                            {item.provenance}
                                                        </h4>
                                                        <h4 className="text-sm text-gray-500">
                                                            {item.type}
                                                        </h4>
                                                    </div>
                                                    <Formik
                                                        initialValues={{
                                                            vinyl_id: item.id
                                                                ? `vc_${item.id}`
                                                                : `discogs_${item.discog_id}`,
                                                            format: getVinylFormat(item),
                                                            type: item.type
                                                        }}
                                                        onSubmit={values => {
                                                            handleAddVinyl(values)
                                                        }}
                                                    >
                                                        {({
                                                            handleSubmit,
                                                            handleChange,
                                                            values
                                                        }) => (
                                                            <form
                                                                onSubmit={handleSubmit}
                                                                className="col-span-1 flex flex-col items-center gap-4"
                                                            >
                                                                <input
                                                                    type="hidden"
                                                                    name="vinyl_id"
                                                                    value={values.vinyl_id}
                                                                />
                                                                <input
                                                                    type="hidden"
                                                                    name="type"
                                                                    value={values.type}
                                                                />
                                                                <select
                                                                    name="format"
                                                                    value={values.format}
                                                                    onChange={handleChange}
                                                                    className="w-full rounded-md border-2 p-1"
                                                                >
                                                                    {getAllVinylFormats(item).map(
                                                                        format => (
                                                                            <option
                                                                                key={format.id}
                                                                                value={format.name}
                                                                            >
                                                                                {format.name}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <button
                                                                    type="submit"
                                                                    className="rounded-md bg-fuchsia-900 p-1 text-white hover:bg-opacity-80"
                                                                    disabled={isLoadingAdd}
                                                                >
                                                                    {isLoadingAdd ? (
                                                                        <div className="flex flex-row justify-center gap-1">
                                                                            <FontAwesomeIcon
                                                                                icon={faSpinner}
                                                                                spin
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex flex-row items-center justify-center gap-1">
                                                                            <FontAwesomeIcon
                                                                                icon={faPlus}
                                                                            />
                                                                            <span>Ajouter</span>
                                                                        </div>
                                                                    )}
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
                                                                    setVinylsResult(r.data)
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
                                                        setTitleStep(
                                                            'Recherche sur Discogs en cours...'
                                                        )
                                                        searchDiscogs(1)
                                                            .then(r => {
                                                                setVinylsResult(r.data)
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
                                                            .catch(() => {
                                                                showToast({
                                                                    type: 'error',
                                                                    message:
                                                                        'Identifiant Discogs invalide'
                                                                })
                                                            })
                                                    } else if (indexStep === 1) {
                                                        setIndexStep(2)
                                                        setNextStep('Création manuelle')
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
                    ) : (
                        <Formik
                            initialValues={{
                                title: '',
                                artist: '',
                                year: '',
                                genre: '',
                                image: '',
                                format: '',
                                provenance: ''
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string().required('Le titre est requis'),
                                artist: Yup.string().required("L'artiste est requis"),
                                year: Yup.string().required("L'année est requise"),
                                genre: Yup.string(),
                                image: Yup.mixed().required("L'image est requise"),
                                format: Yup.string().required('Le format est requis'),
                                provenance: Yup.string()
                            })}
                            onSubmit={(values: {
                                title: string
                                artist: string
                                year: string
                                genre: string
                                image: File | string
                                format: string
                                provenance: string
                            }) => {
                                storeVinyl(values)
                            }}
                        >
                            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="center flex flex-col gap-2 px-2 pt-3"
                                >
                                    <InputText
                                        className="h-14"
                                        value={values.title}
                                        onChange={handleChange}
                                        name="title"
                                        inputClassName="border-gray-200"
                                        label="Titre"
                                    />
                                    <ErrorMessage name="title" />
                                    <InputText
                                        className="h-14"
                                        value={values.artist}
                                        onChange={handleChange}
                                        inputClassName="border-gray-200"
                                        name="artist"
                                        label="Artiste"
                                    />
                                    <ErrorMessage name="artist" />
                                    <InputText
                                        className="h-14"
                                        value={values.year}
                                        inputClassName="border-gray-200"
                                        onChange={handleChange}
                                        name="year"
                                        label="Année"
                                    />
                                    <ErrorMessage name="year" />
                                    <InputText
                                        className="h-14"
                                        value={values.genre}
                                        inputClassName="border-gray-200"
                                        onChange={handleChange}
                                        name="genre"
                                        label="Genre"
                                    />
                                    <ErrorMessage name="genre" />
                                    <InputText
                                        className="h-14"
                                        value={values.provenance}
                                        inputClassName="border-gray-200"
                                        onChange={handleChange}
                                        name="provenance"
                                        label="Provenance"
                                    />
                                    <ErrorMessage name="provenance" />
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={e => {
                                            if (
                                                e.currentTarget.files &&
                                                e.currentTarget.files.length > 0
                                            ) {
                                                setFieldValue('image', e.currentTarget.files[0])
                                            }
                                        }}
                                        className="h-14"
                                        accept="image/png, image/jpeg"
                                    />
                                    <ErrorMessage name="image" />
                                    <select
                                        name="format"
                                        value={values.format}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-2 p-1"
                                    >
                                        {formats.map(format => (
                                            <option key={format.id} value={format.name}>
                                                {format.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex justify-center">
                                        <button
                                            className="mb-1 rounded-md bg-fuchsia-900 px-1 py-2 text-white hover:bg-opacity-80"
                                            type="submit"
                                        >
                                            Enregistrer
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ButtonAddVinyl
