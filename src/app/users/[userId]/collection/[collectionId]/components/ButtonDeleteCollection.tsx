'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleExclamation } from '@fortawesome/pro-thin-svg-icons';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
import deleteCollection from '@/app/users/[userId]/collection/[collectionId]/actions/deleteCollection';

type ButtonDeleteCollectionProps = {
    collectionId: number,
    userId: number
}

export const ButtonDeleteCollection = ({ collectionId, userId }: ButtonDeleteCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteCollection = () => {
        deleteCollection(collectionId, userId).then(r => {
            setIsOpen(false)
        })
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <Modal show={isOpen} size="md" popup onClose={() => setIsOpen(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Voulez-vous vraiment supprimer cette collection ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button color="failure" onClick={handleDeleteCollection}>
                                Yes, I'm sure
                            </button>
                            <button color="gray" onClick={() => setIsOpen(false)}>
                                No, cancel
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}