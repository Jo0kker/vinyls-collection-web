'use client'

import { useEffect } from 'react'

type ErrorBoundaryProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="rounded-lg bg-red-500/70 p-4 text-white">
            <p className="text-md font-body font-light">{error.message}</p>
        </div>
    )
}
