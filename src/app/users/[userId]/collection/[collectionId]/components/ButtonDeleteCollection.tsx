'use client'

import { useState } from 'react'

import { faTrash, faCircleExclamation, faCheck, faXmark } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'

import deleteCollection from '@/app/users/[userId]/collection/[collectionId]/actions/deleteCollection'
import { showToast } from '@/utils/toast'

type ButtonDeleteCollectionProps = {
    collectionId: number
    userId: number
}

export const ButtonDeleteCollection = ({ collectionId, userId }: ButtonDeleteCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleDeleteCollection = () => {
        deleteCollection(collectionId, userId).then(() => {
            showToast({ type: 'success', message: 'Collection supprimée' })
            setIsOpen(false)
        })
    }

    return (
        <>
            <Tooltip content="Supprimer la collection" placement="top" className="mr-1">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-flex items-center rounded-md border px-2 py-2 hover:bg-red-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </Tooltip>
            <Modal show={isOpen} size="md" popup onClose={() => setIsOpen(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faCircleExclamation} size="2xl" className="mb-4" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Voulez-vous vraiment supprimer cette collection ?
                        </h3>
                        <div className="flex justify-around">
                            <button
                                color="failure"
                                className="rounded-md border border-green-500 px-4 py-2"
                                onClick={handleDeleteCollection}
                            >
                                <FontAwesomeIcon icon={faCheck} size="2xl" color="green" />
                            </button>
                            <button
                                color="gray"
                                className="rounded-md border border-red-500 px-4 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} size="2xl" color="red" />
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
