'use client'

import { faCompactDisc } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'
import { useState } from 'react'
import { Modal } from 'flowbite-react'

export default function ButtonImportDiscogs({ onSuccess }: { onSuccess?: () => void }) {
    const { data: session } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleImport = async () => {
        if (!session?.user) {
            return
        }

        if (!session.user.discogs_id) {
            router.push('/settings')
            return
        }

        try {
            setIsLoading(true)
            fetchAPI('/discogs/import', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.access_token}`
                }
            }).then(response => {
                if (response.status === 200) {
                showToast({
                        type: 'success',
                        message: 'Import depuis Discogs effectué'
                    })
                    onSuccess?.()
                } else {
                    showToast({
                        type: 'error',
                        message: response.message || 'Une erreur est survenue lors de l\'import depuis Discogs'
                    })
                }
            })
        } catch (error) {
            showToast({
                type: 'error',
                message: 'Erreur lors de l\'import depuis Discogs'
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (!session?.user) return null

    return (
        <>
            <button
                onClick={handleImport}
                disabled={isLoading}
                className="flex items-center justify-center w-full gap-2 p-2 mb-4 text-sm transition-colors border rounded hover:bg-gray-50"
            >
                <FontAwesomeIcon icon={faCompactDisc} className="text-xl text-fuchsia-800" />
                <span className="text-gray-600">
                    {session.user.discogs_id 
                        ? 'Importer depuis Discogs'
                        : 'Lier à Discogs'
                    }
                </span>
            </button>

            <Modal show={isLoading} size="sm" popup>
                <Modal.Body>
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                        <h3 className="mb-4 text-lg font-bold text-fuchsia-800">
                            Import depuis Discogs en cours...
                        </h3>
                        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-fuchsia-800"></div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
} 