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
import { DiscogsImportProgress } from './DiscogsImportProgress'

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
            await fetchAPI('/discogs/import', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.data?.user.access_token}`,
                }
            })
            onSuccess?.()
            showToast({ 
                type: 'success', 
                message: 'Import Discogs en cours... (vous recevrez un lorsque cela sera terminé)' 
            })
        } catch (error) {
            showToast({ 
                type: 'error', 
                message: 'Trop de requêtes, veuillez réessayer plus tard'
            })
            setIsModalOpen(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCloseModal = () => {
        // On ferme la modal uniquement si l'import n'est pas en cours
        if (!isLoading) {
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

            <Modal 
                show={isModalOpen}
                onClose={handleCloseModal}
                dismissible={!isLoading}
            >
                <Modal.Header>Import Discogs</Modal.Header>
                <Modal.Body>
                    <DiscogsImportProgress />
                </Modal.Body>
            </Modal>
        </>
    )
} 