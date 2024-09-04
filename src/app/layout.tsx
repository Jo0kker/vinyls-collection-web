import type { PropsWithChildren } from 'react'

import { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import HelperModal from '@/components/home/HelperModal'
import { getSession } from '@/utils/authOptions'
import { cn } from '@/utils/classNames'

import Announcement from './announcement'
import Footer from './footer'
import Header from './header'
import Providers from './Providers'

import './global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'filepond/dist/filepond.min.css'


const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700'],
    variable: '--font-roboto'
})

export default async function Layout({ children }: PropsWithChildren) {
    const session = await getSession()

    return (
        <html lang="fr">
        <body
          className={cn(
            roboto.className,
            'text-body flex min-h-screen w-full flex-col bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800 text-gray-900 '
          )}
        >
        <Providers session={session}>
            <HelperModal/>
            <Header/>
            <NextTopLoader/>
            <main className="mx-auto w-full max-w-screen-xl flex-1 space-y-4 p-4 md:px-0">
                <Announcement/>
                <div className="rounded-lg bg-black/10 p-4 shadow-md">{children}</div>
            </main>
            <Footer/>
        </Providers>
        </body>
        </html>
    )
}

export const metadata: Metadata = {
    title: 'Vinyls Collection',
    applicationName: 'Vinyls Collection',
    description:
        'Créez gratuitement, facilement et rapidement votre collection musicale en ligne sur Vinyls-collection.com.',
    // creator: 'Ezio.dev',
    // authors: [{ name: 'Ezio.dev', url: 'https://ezio.dev' }],
    keywords: ['vinyls', 'collection', 'musique'],
    manifest: '/manifest.json',
    openGraph: {
        title: 'Vinyls Collection',
        siteName: 'Vinyls Collection',
        description:
            'Créez gratuitement, facilement et rapidement votre collection musicale en ligne sur Vinyls-collection.com.',
        url: 'https://vinyls-collection.com',
        images: [
            {
                url: 'https://vinyls-collection.com/og.png',
                width: 540,
                height: 300,
                alt: 'Illustration du site Vinyls Collection'
            }
        ],
        type: 'website',
        locale: 'fr',
        alternateLocale: 'fr-FR'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vinyls Collection',
        description:
            'Créez gratuitement, facilement et rapidement votre collection musicale en ligne sur Vinyls-collection.com.',
        siteId: '1',
        creator: '@eziodev',
        creatorId: '12',
        images: ['https://vinyls-collection.com/og-alt.png']
    },
    // verification: {
    //     google: 'moxqnasNkMa1M9QxhWMk8vRz-EzIdzH063ipfmeX9dM'
    // },
    appleWebApp: {
        title: 'Vinyls Collection',
        statusBarStyle: 'black-translucent',
        startupImage: [
            '/startup/apple-touch-startup-image-768x1004.png',
            {
                url: '/startup/apple-touch-startup-image-1536x2008.png',
                media: '(device-width: 768px) and (device-height: 1024px)'
            }
        ]
    },
    alternates: {
        canonical: 'https://vinyls-collection.com'
    },
    metadataBase: new URL('https://vinyls-collection.com')
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#1e1b4b',
    colorScheme: 'dark light'
}
