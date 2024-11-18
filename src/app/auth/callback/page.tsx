'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { showToast } from '@/utils/toast'
import { fetchAPI } from '@/utils/fetchAPI'

export default function CallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { update } = useSession()
    
    useEffect(() => {
        const token = searchParams.get('access_token')
        
        console.log('Token:', token)

        if (token) {
            fetchAPI('/users/me', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(userData => {
                update({
                    user: {
                        ...userData,
                        access_token: token
                    }
                })
                showToast({ 
                    type: 'success', 
                    message: 'Compte Discogs lié avec succès' 
                })
                console.log('UserData:', userData)
                //router.push('/settings')
            })
            .catch((error) => {
                console.error('Erreur:', error)
                showToast({ 
                    type: 'error', 
                    message: 'Erreur lors de la liaison avec Discogs' 
                })
                //router.push('/settings')
            })
        } else {
            //router.push('/settings')
        }
    }, [searchParams, router, update])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold text-fuchsia-800">
                    Liaison avec Discogs en cours...
                </h1>
                <div className="w-12 h-12 mx-auto border-b-2 rounded-full animate-spin border-fuchsia-800"></div>
            </div>
        </div>
    )
}
