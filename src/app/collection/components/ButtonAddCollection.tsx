'use client'

// button to add collection
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/atom/Button'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'

export function ButtonAddCollection() {
    const addCollection = useMutation({
        mutationFn: () =>
            fetchAPI('/collections/mutate', {
                method: 'POST',
                withSession: true,
                body: JSON.stringify({
                    mutate: [
                        {
                            operation: 'create',
                            attributes: {
                                name: 'Ma collection',
                                description: 'Ma collection de vinyles'
                            }
                        }
                    ]
                })
            }),
        onSuccess: () => {
            showToast('success', 'Collection créée')
        },
        onError: () => showToast('error', 'Une erreur est survenue')
    })

    return (
        <Button
            onClick={() => addCollection.mutate()}
            className="flex flex-row items-center justify-center gap-2"
        >
            <FontAwesomeIcon icon={faPlus} />
            <span>Ajouter une collection</span>
        </Button>
    )
}
