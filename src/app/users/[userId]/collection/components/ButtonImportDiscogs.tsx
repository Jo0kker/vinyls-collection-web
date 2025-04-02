'use client'

import { faCompactDisc, faSpinner, faFileImport, faClock } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Modal } from 'flowbite-react'
import { fetchAPI } from '@/utils/fetchAPI'
import { cn } from '@/utils/classNames'
import { DiscogsImportProgress } from './DiscogsImportProgress'

interface ImportResponse {
    message?: string
    error?: string
    job_uuid: string
    status: number
    retry_after?: number
}

interface ButtonImportDiscogsProps {
    onSuccess?: () => void
}

export default function ButtonImportDiscogs({ onSuccess }: ButtonImportDiscogsProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasActiveJob, setHasActiveJob] = useState(false)
    const [currentJobUuid, setCurrentJobUuid] = useState<string | undefined>()
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session.data?.user?.discogs_id) {
            router.push('/settings')
        }
    }, [session.data?.user?.discogs_id])

    const handleImport = async () => {
        if (!session.data?.user?.discogs_id) {
            router.push('/settings')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetchAPI<ImportResponse>('/discogs/import', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.data?.user.access_token}`,
                }
            })
            console.log('response', response)
            
            // On ouvre toujours la modal avec le job_uuid
            if (response.job_uuid) {
                setHasActiveJob(true)
                setCurrentJobUuid(response.job_uuid)
                setIsModalOpen(true)
                onSuccess?.()
            }

            // Si on a une erreur 409 ou 429, on met à jour le statut
            if (response.status === 409 || response.status === 429) {
                console.log('Erreur 429 ou 409, mise à jour du statut')
                setHasActiveJob(true)
                setCurrentJobUuid(response.job_uuid)
                setIsModalOpen(true)
            }
        } catch (error: any) {
            console.log('Erreur générale')
            toast.error('Une erreur est survenue lors de l\'import')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCloseModal = () => {
        console.log('Fermeture de la modal')
        setIsModalOpen(false)
    }

    console.log('État de la modal:', isModalOpen)
    console.log('Job UUID:', currentJobUuid)

    return (
        <>
            <button
                onClick={handleImport}
                disabled={isLoading}
                className={cn(
                    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500",
                    isLoading && "opacity-50 cursor-not-allowed"
                )}
            >
                {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 mr-2 animate-spin" />
                ) : hasActiveJob ? (
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
                ) : (
                    <FontAwesomeIcon icon={faCompactDisc} className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Import en cours...' : hasActiveJob ? 'Import en cours...' : 'Importer depuis Discogs'}
            </button>

            <Modal
                show={isModalOpen}
                onClose={handleCloseModal}
                title="Import depuis Discogs"
                dismissible={true}
            >
                <DiscogsImportProgress jobUuid={currentJobUuid} />
            </Modal>
        </>
    )
} 