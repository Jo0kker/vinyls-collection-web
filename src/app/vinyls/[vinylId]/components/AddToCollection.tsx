'use client'

import { useEffect, useState } from 'react'

import { Badge, Modal } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import AsyncSelect from 'react-select/async'

import { Button } from '@/components/atom/Button'
import { Collection } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

const AddToCollection = () => {
    const session = useSession()
    console.log(session)
    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const fetchCollections = async (search: string) => {
            if (!session.data) {
                return null
            }

            const data: any = {
                search: {
                    filters: [
                        {
                            field: 'user.id',
                            operator: '=',
                            value: session.data.user.id
                        },
                    ],
                }
            }

            if (search) {
                data.search.filters.push({
                    field: 'name',
                    operator: 'like',
                    value: `%${search}%`
                })
            }

            const response = await fetchAPI('/collections/seach', {
                method: 'POST',
                body: JSON.stringify(data),
                withSession: true
            })
            console.log(response.data)
            return response.data.map((collection: Collection): { label: any; value: any } => ({
                label: collection.name,
                value: collection.id
            }))
        }

        fetchCollections(searchValue)
    }, [searchValue, session.data])

    if (!session.data) {
        return null
    }



    return (
        <>
            <Button
                className="border-0 p-0"
                onClick={() => setIsOpen(true)}
            >
                <Badge color="blue" className="text-black">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                             fill="currentColor"
                             viewBox="0 0 640 512">
                            <path
                                d="M0 256C0 164.5 48.8 80 128 34.3s176.8-45.7 256 0c60.3 34.8 103 92.1 119.9 157.9c-2.6-.1-5.3-.2-7.9-.2c-60 0-113 30-144.7 75.8c.5-3.9 .7-7.8 .7-11.8c0-34.3-18.3-66-48-83.1s-66.3-17.1-96 0s-48 48.8-48 83.1s18.3 66 48 83.1s66.3 17.1 96 0c8.4-4.8 15.8-10.8 22.2-17.7c-4.1 14.8-6.2 30.4-6.2 46.5c0 45.9 17.6 87.6 46.4 119c-75.7 36.2-164.9 33.1-238.4-9.3C48.8 432 0 347.5 0 256zm64 0l32 0c0-88.4 71.6-160 160-160l0-32C150 64 64 150 64 256zm160 0c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm64-16l0 32 64 0 0 64 32 0 0-64 64 0 0-32-64 0 0-64-32 0 0 64-64 0z" />
                        </svg>
                        Ajouter à une collection
                    </div>
                </Badge>
            </Button>
            <Modal id="modal-add-to-collection" title="Add to collection" size="sm" show={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header>
                    Choix de la collection
                </Modal.Header>
                <Modal.Body>
                    <div className="flex items-center justify-center">
                        <div className="w-1/2">
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold" htmlFor="collection">Collection</label>

                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary">Ajouter</button>
                    <button className="btn btn-secondary">Annuler</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddToCollection
