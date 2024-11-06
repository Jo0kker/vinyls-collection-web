'use client'

import React, { useState } from 'react'

import { faPenToSquare } from '@fortawesome/pro-thin-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'

import updateCollection from '@/app/users/[userId]/collection/actions/updateCollection'
import { InputText } from '@/components/atom/InputText'
import { Collection } from '@/types'

type ButtonEditCollectionProps = {
    collection: Collection
}

export const ButtonEditCollection = ({ collection }: ButtonEditCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [newCollectionName, setNewCollectionName] = useState(collection.name)

    const handleUpdateCollection = () => {
        updateCollection(collection.id, {
            name: newCollectionName
        }).then(() => setIsOpen(false))
    }

    return (
        <>
            <Tooltip content="Modifier la collection" placement="top" className="mr-1">
                <button
                    className="inline-flex items-center px-2 py-2 mr-1 border rounded-md hover:bg-emerald-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </Tooltip>
            <Modal show={isOpen} size="md" popup onClose={() => setIsOpen(false)}>
                <Modal.Header />
                <Modal.Body>
                    <form action={handleUpdateCollection} className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Modifier la collection
                        </h3>
                        <InputText
                            name="newCollectionName"
                            label="Nom de la collection"
                            setValue={setNewCollectionName}
                            value={newCollectionName}
                            inputClassName="border-gray-500/25"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateCollection}
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
