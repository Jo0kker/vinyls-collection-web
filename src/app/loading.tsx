'use client'

import { Loading } from '@/assets/lottie/Loading'

export default function LoadingPage() {
    return (
        <div className="flex h-full items-center justify-center rounded bg-white py-4">
            <Loading className="h-20 w-20 opacity-40" />
        </div>
    )
}
