'use client'

import { useState } from 'react'

import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'flowbite-react'

import addCollection from '@/app/users/[userId]/collection/[collectionId]/actions/addCollection'
import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import { showToast } from '@/utils/toast'

export function ButtonAddCollection() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [collectionDescription, setCollectionDescription] = useState('')

    return (
        <>
            <Button
                onClick={() => setIsOpenModal(true)}
                className="flex flex-row items-center justify-center gap-2"
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>Ajouter une collection</span>
            </Button>
            <Modal show={isOpenModal} size="md" popup onClose={() => setIsOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Créer une collection
                        </h3>
                        <InputText
                            value={collectionName}
                            setValue={setCollectionName}
                            name="collectionName"
                            label="Nom de la collection"
                            inputClassName="border-gray-300 dark:border-gray-700"
                        />
                        <InputText
                            value={collectionDescription}
                            setValue={setCollectionDescription}
                            name="collectionDescription"
                            label="Description de la collection"
                            inputClassName="border-gray-300 dark:border-gray-700"
                        />
                        <Button
                            onClick={() => {
                                addCollection(collectionName, collectionDescription).then(() => {
                                    showToast({
                                        type: 'success',
                                        message: 'Collection créée avec succès'
                                    })
                                    setIsOpenModal(false)
                                })
                            }}
                            className="w-full"
                        >
                            Créer
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
