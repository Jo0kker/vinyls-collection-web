'use client'

import { faCompactDisc } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'

export default function ButtonSyncDiscogs() {
    const { data: session } = useSession()
    const router = useRouter()

    const handleSync = async () => {
        if (!session?.user) {
            return
        }

        if (!session.user.discogs_id) {
            router.push('/settings')
            return
        }

        try {
            await fetchAPI('/discogs/sync-collections', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.access_token}`
                }
            })
            
            showToast({
                type: 'success',
                message: 'Synchronisation avec Discogs effectuée'
            })
        } catch (error) {
            showToast({
                type: 'error',
                message: 'Erreur lors de la synchronisation avec Discogs'
            })
        }
    }

    if (!session?.user) return null

    return (
        <button
            onClick={handleSync}
            className="flex items-center justify-center w-full gap-2 p-2 mb-4 text-sm transition-colors border rounded hover:bg-gray-50"
        >
            <FontAwesomeIcon icon={faCompactDisc} className="text-xl text-fuchsia-800" />
            <span className="text-gray-600">
                {session.user.discogs_id 
                    ? 'Synchroniser avec Discogs'
                    : 'Lier à Discogs'
                }
            </span>
        </button>
    )
} 