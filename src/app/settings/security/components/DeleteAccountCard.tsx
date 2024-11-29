'use client'

import { useState } from 'react'
import { Modal } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTriangleExclamation } from '@fortawesome/pro-duotone-svg-icons'
import { showToast } from '@/utils/toast'
import { deleteAccount } from '../actions/security'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/atom/Button'

export default function DeleteAccountCard() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount()
            showToast({
                type: 'success',
                message: 'Votre compte a été supprimé avec succès'
            })
            await signOut()
            router.push('/')
        } catch (error) {
            showToast({
                type: 'error',
                message: 'Une erreur est survenue lors de la suppression du compte'
            })
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-red-600">Zone dangereuse</h2>
                <p className="text-sm text-gray-600">
                    La suppression de votre compte est une action irréversible. Toutes vos données seront définitivement effacées.
                </p>
                <Button
                    type="no_border"
                    disabled={true}
                    onClick={() => setIsModalOpen(true)}
                    className="mx-auto text-white bg-red-600 rounded-md font-body sm:w-2/5 xl:w-auto xl:px-6 hover:bg-red-700"
                >
                    <FontAwesomeIcon icon={faTrash} className='mr-2' />
                    Supprimer mon compte<br/><i className='text-xs'>non fonctionnel</i>
                </Button>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            className="mx-auto mb-4 text-red-600 h-14 w-14"
                        />
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Êtes-vous sûr de vouloir supprimer votre compte ?
                        </h3>
                        <p className="mb-5 text-sm text-gray-500">
                            Cette action est irréversible. Toutes vos données seront définitivement effacées.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Oui, supprimer mon compte
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Non, annuler
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}