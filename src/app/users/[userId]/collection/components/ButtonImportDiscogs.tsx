'use client'

import { faCompactDisc, faSpinner, faFileImport } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'
import { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'
import { Button } from '@/components/atom/Button'
import { DiscogsImportProgress } from './DiscogsImportProgress'
import { cn } from '@/utils/classNames'

interface ImportStatus {
    status: 'in_progress' | 'completed' | 'failed'
}

export default function ButtonImportDiscogs({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasActiveJob, setHasActiveJob] = useState(false)
    const session = useSession()
    const router = useRouter()

    // Vérification initiale de l'état du job
    useEffect(() => {
        const checkJobStatus = async () => {
            if (!session.data?.user?.discogs_id) return

            try {
                const response = await fetchAPI<ImportStatus>('/discogs/import/status', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${session.data?.user.access_token}`,
                    }
                })
                
                if (response.data?.status === 'in_progress') {
                    setHasActiveJob(true)
                    setIsModalOpen(true)
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du statut:', error)
            }
        }

        checkJobStatus()
    }, [session.data?.user?.discogs_id])

    const importDiscogs = async () => {
        if (!session.data?.user?.discogs_id) {
            router.push('/settings')
            return
        }

        setIsLoading(true)
        setIsModalOpen(true)
        try {
            const response = await fetchAPI('/discogs/import', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.data?.user.access_token}`,
                }
            })
            
            setHasActiveJob(true)
            onSuccess?.()
            showToast({ 
                type: 'success', 
                message: 'Import Discogs en cours... (vous recevrez un email lorsque cela sera terminé)' 
            })
        } catch (error: any) {
            // Si c'est une erreur 429, on garde la modal ouverte car il y a un job en cours
            if (error.status === 429) {
                showToast({ 
                    type: 'error', 
                    message: 'Un import est déjà en cours. Veuillez réessayer dans une heure.'
                })
                setHasActiveJob(true)
                // On ne ferme pas la modal ici
            } else {
                showToast({ 
                    type: 'error', 
                    message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
                })
                setIsModalOpen(false)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <button
                onClick={hasActiveJob ? handleOpenModal : importDiscogs}
                disabled={isLoading}
                className={cn(
                    "flex items-center justify-center w-full gap-2 p-2 mb-4 text-sm transition-colors border rounded",
                    hasActiveJob ? "bg-gray-100" : "hover:bg-gray-50"
                )}
            >
                {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                    <FontAwesomeIcon icon={faFileImport} />
                )}
                <span className="ml-2">
                    {hasActiveJob 
                        ? "Voir l'import en cours..." 
                        : session.data?.user?.discogs_id 
                            ? "Importer de Discogs" 
                            : "Lier le compte Discogs"
                    }
                </span>
            </button>

            <Modal 
                show={isModalOpen}
                onClose={handleCloseModal}
                dismissible={true}
            >
                <Modal.Header>Import Discogs</Modal.Header>
                <Modal.Body>
                    <DiscogsImportProgress />
                </Modal.Body>
            </Modal>
        </>
    )
} 