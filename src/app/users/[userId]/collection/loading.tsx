'use client'

import { Loading } from '@/assets/lottie/Loading'

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-full py-4 bg-white rounded">
            <Loading className="w-20 h-20 opacity-40" />
        </div>
    )
}
