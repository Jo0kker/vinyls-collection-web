'use client'

// button to add collection
import { useState } from 'react'

import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { Modal } from 'flowbite-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'

export function ButtonAddCollection() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { data: session } = useSession()
    const [collectionName, setCollectionName] = useState('')
    const addCollection = useMutation({
        mutationFn: () =>
            fetchAPI('/collections/mutate', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session?.user.access_token}`
                },
                body: JSON.stringify({
                    mutate: [
                        {
                            operation: 'create',
                            attributes: {
                                name: 'Ma collection',
                                description: 'Ma collection de vinyles'
                            }
                        }
                    ]
                })
            }),
        onSuccess: () => {
            showToast({ type: 'success', message: 'Collection ajoutée' })
        },
        onError: () => showToast({ type: 'error', message: 'Une erreur est survenue' })
    })

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
                        />
                        <Button onClick={() => addCollection.mutate()} className="w-full">
                            Créer
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
