'use client'

import { useState } from 'react'

import { faTrash, faCircleExclamation, faCheck, faXmark, faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'

import deleteCollection from '@/app/users/[userId]/collection/actions/deleteCollection'
import { showToast } from '@/utils/toast'

type ButtonDeleteCollectionProps = {
    collectionId: number
    userId: number
    onSuccess?: () => void
}

export const ButtonDeleteCollection = ({ collectionId, userId, onSuccess }: ButtonDeleteCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteCollection = () => {
        setIsLoading(true)
        deleteCollection(collectionId, userId)
            .then(() => {
                showToast({ type: 'success', message: 'Collection supprimée' })
                setIsOpen(false)
                onSuccess?.()
            })
            .catch((error) => {
                showToast({ type: 'error', message: 'Erreur lors de la suppression' })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <Tooltip content="Supprimer la collection" placement="top" className="mr-1">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-flex items-center px-2 py-2 border rounded-md hover:bg-red-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </Tooltip>
            <Modal show={isOpen} size="md" popup onClose={() => setIsOpen(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FontAwesomeIcon 
                            icon={faCircleExclamation} 
                            size="2xl" 
                            className="mb-4 text-red-500" 
                        />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Voulez-vous vraiment supprimer cette collection ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button
                                disabled={isLoading}
                                className={`rounded-md border border-green-500 px-4 py-2 transition-colors
                                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'}`}
                                onClick={handleDeleteCollection}
                            >
                                {isLoading ? (
                                    <FontAwesomeIcon icon={faSpinner} spin size="xl" className="text-green-500" />
                                ) : (
                                    <FontAwesomeIcon icon={faCheck} size="xl" className="text-green-500" />
                                )}
                            </button>
                            <button
                                disabled={isLoading}
                                className="px-4 py-2 border border-red-500 rounded-md hover:bg-red-50"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} size="xl" className="text-red-500" />
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
