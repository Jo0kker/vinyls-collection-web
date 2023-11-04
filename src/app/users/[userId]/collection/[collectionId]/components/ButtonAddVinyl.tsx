'use client'

import React, { useEffect, useState } from 'react'

import { faPlus } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Progress, Tooltip } from 'flowbite-react'
import { InputText } from '@/components/atom/InputText'
import { fetchAPI } from '@/utils/fetchAPI'
import Selector from '@/components/atom/Selector'
import { Vinyl } from '@/types'
import { Accordion } from 'flowbite-react'

const ButtonAddVinyl = ({ collectionId }: { collectionId: number }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState('Ajouter un vinyls')
    const [searchName, setSearchName] = useState('')
    const [searchArtist, setSearchArtist] = useState('')
    const [searchYear, setSearchYear] = useState('')
    const [searchFormat, setSearchFormat] = useState('')
    const [formats, setFormats] = useState<{ id?: number; name?: string }[]>([])
    const [vinylsResult, setVinylsResult] = useState<Vinyl[]>()
    const [accOpen, setAccOpen] = useState(2)

    useEffect(() => {
        fetchAPI('/formats/search', {
            method: 'POST'
        }).then(r => {
            setFormats(r.data)
        })
    }, [])

    const handleSearch = () => {
        setState('Recherche en cours...')
        fetchAPI('/vinyls/search', {
            method: 'POST',
            body: JSON.stringify({
                filters: [
                    {
                        field: 'name',
                        operator: 'like',
                        value: searchName
                    },
                    {
                        field: 'artist',
                        operator: 'like',
                        value: searchArtist
                    },
                    {
                        field: 'year',
                        operator: 'like',
                        value: searchYear
                    },
                    {
                        field: 'format.id',
                        operator: '=',
                        value: searchFormat
                    }
                ],
                includes: [{ relation: 'format' }],
                limit: 10
            })
        }).then(r => {
            setState('Résultat de la recherche')
            setFormats(r.data)
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
                show={isOpen}
                position={'center'}
                onClose={() => setIsOpen(false)}
                className={'h-full'}
            >
                <Modal.Header>{state}</Modal.Header>
                <Modal.Body className={'p-0'}>
                    <button
                        onClick={() => {
                            if (accOpen === 1) {
                                setAccOpen(2)
                            } else {
                                setAccOpen(1)
                            }
                        }}
                    >
                        test {accOpen}
                    </button>
                    <p>open 1 : {accOpen === 1 ? 'true' : 'false'}</p>
                    <p>open 2 : {accOpen === 2 ? 'true' : 'false'}</p>
                    <Accordion>
                        <Accordion.Panel isOpen={accOpen === 2}>
                            <Accordion.Title>Formulaire de recherche</Accordion.Title>
                            <Accordion.Content>
                                <form action="" className={'center flex flex-col gap-4'}>
                                    <InputText
                                        className={'h-14'}
                                        value={searchName}
                                        setValue={setSearchName}
                                        name={'name'}
                                        inputClassName={'border-gray-200'}
                                        label={'Titre'}
                                    />
                                    <InputText
                                        className={'h-14'}
                                        value={searchArtist}
                                        setValue={setSearchArtist}
                                        inputClassName={'border-gray-200'}
                                        name={'artist'}
                                        label={'Artiste'}
                                    />
                                    <InputText
                                        className={'h-14'}
                                        value={searchYear}
                                        inputClassName={'border-gray-200'}
                                        setValue={setSearchYear}
                                        name={'year'}
                                        label={'Année'}
                                    />
                                    <div className={'mb-4'}>
                                        <Selector options={formats} label={'Format'} />
                                    </div>
                                    <div className={'flex justify-center'}>
                                        <button
                                            className={
                                                'rounded-md bg-fuchsia-900 px-2 py-3 text-white hover:bg-opacity-80'
                                            }
                                            onClick={handleSearch}
                                        >
                                            Rechercher
                                        </button>
                                    </div>
                                </form>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel isOpen={accOpen === 1}>
                            <Accordion.Title>Is there a Figma file available?</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    Flowbite is first conceptualized and designed using the Figma
                                    software so everything you see in the library has a design
                                    equivalent in our Figma file.
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Check out the
                                    <a
                                        href="https://flowbite.com/figma/"
                                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                                    >
                                        Figma design system
                                    </a>
                                    based on the utility classes from Tailwind CSS and components
                                    from Flowbite.
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>

                    <hr />
                </Modal.Body>
                <Modal.Footer />
            </Modal>
        </>
    )
}

export default ButtonAddVinyl
