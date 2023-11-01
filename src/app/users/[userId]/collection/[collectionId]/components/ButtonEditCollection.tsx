'use client'

import React, { useState } from 'react'

import { faPenToSquare } from '@fortawesome/pro-thin-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'

import updateCollection from '@/app/users/[userId]/collection/[collectionId]/actions/updateCollection'
import { InputText } from '@/components/atom/InputText'
import { Collection } from '@/types'

type ButtonEditCollectionProps = {
    collection: Collection
}

export const ButtonEditCollection = ({ collection }: ButtonEditCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [newCollectionName, setNewCollectionName] = useState(collection.name)

    const handleUpdateCollection = () => {
        updateCollection(collection.id, newCollectionName).then(() => setIsOpen(false))
    }

    return (
        <>
            <Tooltip content="Modifier la collection" placement="top" className="mr-1">
                <button
                    className="mr-1 inline-flex items-center rounded-md border px-2 py-2 hover:bg-emerald-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
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
                            Sign in to our platform
                        </h3>
                        <InputText
                            name="newCollectionName"
                            label="Nom de la collection"
                            setValue={setNewCollectionName}
                            value={newCollectionName}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateCollection}
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
