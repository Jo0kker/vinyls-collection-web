'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare} from '@fortawesome/pro-thin-svg-icons';
import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { InputText } from '@/components/atom/InputText';
import { Collection } from '@/types';
import updateCollection from '@/app/users/[userId]/collection/[collectionId]/actions/updateCollection';

type ButtonEditCollectionProps = {
    collection: Collection
}

export const ButtonEditCollection = ({ collection }: ButtonEditCollectionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState(collection.name);

    const handleUpdateCollection = () => {
        updateCollection(collection.id, newCollectionName).then(r => setIsOpen(false))
    }

    return (
        <>
            <button
                className={'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400'}
                onClick={() => setIsOpen(true)}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <Modal show={isOpen} size="md" popup onClose={() => setIsOpen(false)}>
                <Modal.Header />
                <Modal.Body>
                    <form action={handleUpdateCollection} className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <InputText
                            name={'newCollectionName'}
                            label={'Nom de la collection'}
                            setValue={setNewCollectionName}
                            value={newCollectionName}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateCollection}
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
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