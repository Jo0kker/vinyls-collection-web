'use client'

import { useEffect } from 'react'

type ErrorBoundaryProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.error(error)
    }, [error])

    return (
        <div className="p-4 text-white rounded-lg bg-red-500/70">
            <p className="font-light text-md font-body">{error.message}</p>
        </div>
    )
}
