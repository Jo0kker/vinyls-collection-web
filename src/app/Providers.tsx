'use client'

/**
 * This file is where you should add every "client" provider you'll need in the app
 */

import { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export default function Providers({
    children,
    session
}: PropsWithChildren<{ session: Session | null }>) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </SessionProvider>
    )
}
