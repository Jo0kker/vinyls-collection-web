'use client'

import { faCompactDisc, faSpinner, faFileImport } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'
import { useState } from 'react'
import { Modal } from 'flowbite-react'
import { Button } from '@/components/atom/Button'

export default function ButtonImportDiscogs({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const session = useSession()
    const router = useRouter()

    const importDiscogs = async () => {
        if (!session.data?.user?.discogs_id) {
            router.push('/settings')
            return
        }

        setIsLoading(true)
        setIsModalOpen(true)
        try {
            fetchAPI('/discogs/import', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.data?.user.access_token}`,
                }
            }).then(() => {
                onSuccess?.()
                showToast({ 
                    type: 'success', 
                    message: 'Import Discogs effectué avec succès' 
                })
            }).catch((error) => {
                console.error('Erreur lors de l\'import:', error)
                showToast({ 
                    type: 'error', 
                    message: error.cause === 429 ? 'Trop de requêtes, veuillez réessayer plus tard' : error.message
                })
            })
        } catch (error) {
            console.error('Erreur lors de l\'import:', error)
            showToast({ 
                type: 'error', 
                message: 'Erreur lors de l\'import Discogs' 
            })
        } finally {
            setIsLoading(false)
            setIsModalOpen(false)
        }
    }

    return (
        <>
            <button
                onClick={importDiscogs}
                disabled={isLoading}
                className="flex items-center justify-center w-full gap-2 p-2 mb-4 text-sm transition-colors border rounded hover:bg-gray-50"
            >
                {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                    <FontAwesomeIcon icon={faFileImport} />
                )}
                <span className="ml-2">
                    {session.data?.user?.discogs_id ? "Importer de Discogs" : "Lier le compte Discogs"}
                </span>
            </button>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>Import en cours</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col items-center justify-center p-4">
                        <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 animate-spin text-fuchsia-600" />
                        <p className="mt-4">Import de votre collection Discogs en cours...</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
} 