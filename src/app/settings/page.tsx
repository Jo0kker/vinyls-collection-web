'use client'

import { faCompactDisc } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { fetchAPI } from '@/utils/fetchAPI'
import { useState, useEffect } from 'react'
import { cn } from '@/utils/classNames'
import { useSearchParams } from 'next/navigation'
import { showToast } from '@/utils/toast'

export default function SettingsPage() {
    const { data: session, update } = useSession()
    const [discogsUrl, setDiscogsUrl] = useState<string | null>(null)
    const [isLinked, setIsLinked] = useState<boolean>(false)
    const searchParams = useSearchParams()

    const link = searchParams?.get('link')
    const errorQuery = searchParams?.get('error')

    const getDiscogsUrl = async () => {
        try {
            const response: any = await fetchAPI('/auth/discogs', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.access_token}`
                }
            })
            
            setIsLinked(!!response.url)
            if (response.url) {
                setDiscogsUrl(response.url)
            }
        } catch (error) {
            setIsLinked(false)
        }
    }

    useEffect(() => {
        if (errorQuery) {
            showToast({
                type: 'error',
                message: errorQuery
            })
        }
        if (link === 'true' && session?.user?.access_token) {
            fetchAPI('/users/me', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.access_token}`
                }
            })
            .then(userData => {
                console.log('userData', userData)
                update({
                    user: {
                        ...userData,
                        access_token: session.user.access_token
                    }
                })
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de la session:', error)
            })        
        }
        if (session?.user?.access_token) {
            getDiscogsUrl()
        }
    }, [])
    
    return (
        <div className="flex flex-col px-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Paramètres</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <a 
                    href={isLinked ? discogsUrl || '#' : '#'}
                    className={cn(
                        "p-6 text-left transition-colors border rounded-lg shadow-sm",
                        isLinked 
                            ? "hover:bg-gray-50 cursor-pointer" 
                            : "opacity-50 cursor-not-allowed bg-gray-100"
                    )}
                    onClick={e => !isLinked && e.preventDefault()}
                >
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faCompactDisc} className="text-2xl text-fuchsia-800" />
                        <div>
                            <h2 className="text-xl font-semibold">Lier à Discogs</h2>
                            <p className="text-gray-600">
                                {isLinked 
                                    ? "Connectez votre compte Discogs pour importer votre collection"
                                    : "Compte déjà lié à Discogs"
                                }
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
