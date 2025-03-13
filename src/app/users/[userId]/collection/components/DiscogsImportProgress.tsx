import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCheck, faFolder, faCompactDisc, faInfoCircle } from '@fortawesome/pro-duotone-svg-icons'
import { fetchAPI } from '@/utils/fetchAPI'
import { useSession } from 'next-auth/react'

type ImportStatusData = {
    job_uuid: string
    status: 'running' | 'completed' | 'no_job'
    progress: number | null
    started_at: string
    finished_at: string | null
    remaining_seconds: number
    remaining_interval: string
    data: {
        user_id: string
        total_folders: number
        processed_folders: number
        username: string
        total_vinyls?: number
        imported_vinyls?: number
        imported_folders?: number
        current_folder?: string
        current_folder_progress?: number
    }
}

type ApiResponse = {
    data: ImportStatusData
}

type DiscogsImportProgressProps = {
    jobUuid?: string
}

export const DiscogsImportProgress = ({ jobUuid }: DiscogsImportProgressProps) => {
    const [status, setStatus] = useState<ImportStatusData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const session = useSession()

    const isJobInitializing = (status: ImportStatusData) => {
        return status.status === 'running' && 
               status.progress === null && 
               !status.data.total_vinyls
    }

    const fetchStatus = async () => {
        try {
            const response = await fetchAPI<ImportStatusData>('/discogs/import/status', {
                headers: {
                    'Authorization': `Bearer ${session.data?.user.access_token}`,
                }
            })
            
            // Si on a un jobUuid spécifique, on vérifie que c'est le bon job
            if (jobUuid && response.data.job_uuid !== jobUuid) {
                return
            }
            
            setStatus(response.data)
        } catch (error) {
            setError('Erreur lors de la récupération du statut')
            console.error('Erreur:', error)
        } finally {
            setIsInitialLoading(false)
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        const startPolling = () => {
            fetchStatus();
            interval = setInterval(fetchStatus, 2000); // 2 secondes
        };

        // On démarre le polling si on a un jobUuid ou si le job est en cours
        if (jobUuid || (!status && isInitialLoading) || status?.status === 'running') {
            startPolling();
        }

        // On nettoie l'intervalle quand le composant est démonté ou quand le job est terminé
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [jobUuid, status?.status, isInitialLoading]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-red-600">
                <p>{error}</p>
            </div>
        )
    }

    // On affiche le chargement tant qu'on n'a pas de données valides
    if (isInitialLoading || !status || status.status === 'no_job' || isJobInitializing(status)) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 animate-spin text-fuchsia-600" />
                <p className="mt-4 text-gray-600">Initialisation de l'import...</p>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('fr-FR')
    }

    // Si le job est terminé mais la progression n'est pas à 100%, on force à 100%
    const displayProgress = status.status === 'completed' ? 100 : status.progress || 0

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Message d'information */}
            <div className="w-full p-3 mb-4 rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 text-blue-700">
                    <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5" />
                    <p className="text-sm">
                        Vous pouvez naviguer librement pendant l'import. La progression sera mise à jour automatiquement.
                    </p>
                </div>
            </div>

            {status.status === 'running' ? (
                <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 animate-spin text-fuchsia-600" />
            ) : (
                <FontAwesomeIcon icon={faCheck} className="w-16 h-16 text-green-500" />
            )}

            <div className="w-full mt-4">
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                    <span>Progression globale</span>
                    <span>{displayProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                        className="h-2 transition-all duration-300 rounded-full bg-fuchsia-600"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>
            </div>

            {status.data.total_vinyls && (
                <div className="grid w-full grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-600">Dossiers</p>
                            <p className="font-medium">
                                {status.data.processed_folders} / {status.data.total_folders}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCompactDisc} className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-600">Vinyles</p>
                            <p className="font-medium">
                                {status.data.imported_vinyls} / {status.data.total_vinyls}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {status.status === 'running' && status.data.current_folder && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Dossier en cours : {status.data.current_folder}
                    </p>
                    <p className="text-sm text-gray-500">
                        Temps restant estimé : {status.remaining_interval}
                    </p>
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
                <p>Début : {formatDate(status.started_at)}</p>
                {status.finished_at && (
                    <p>Fin : {formatDate(status.finished_at)}</p>
                )}
            </div>
        </div>
    )
} 