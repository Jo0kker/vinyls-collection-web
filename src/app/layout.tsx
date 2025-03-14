import type { PropsWithChildren } from 'react'

import { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import HelperModal from '@/components/home/HelperModal'
import { getSession } from '@/utils/authOptions'
import { cn } from '@/utils/classNames'
import { SearchModal } from '@/components/SearchModal'

import Announcement from './announcement'
import Footer from './footer'
import Header from './header'
import Providers from './Providers'
import { ReCaptchaProvider } from "next-recaptcha-v3";

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
                    'text-body flex min-h-screen w-full flex-col bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800 text-gray-900'
                )}
            >
                <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} hidden={true} >
                    <Providers session={session}>
                        <HelperModal />
                        <Header />
                        <NextTopLoader />
                        <main className="flex-1 w-full max-w-screen-xl mx-auto">
                            <Announcement />
                            <div className="px-4 py-2 md:px-6 md:py-4">
                                {children}
                            </div>
                        </main>
                        <Footer />
                        <SearchModal />
                    </Providers>
                </ReCaptchaProvider>
            </body>
        </html>
    )
}

export const metadata: Metadata = {
    title: 'Vinyls Collection',
    applicationName: 'Vinyls Collection',
    description:
        'Créez gratuitement, facilement et rapidement votre collection musicale en ligne sur Vinyls-collection.com.',
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
        alternateLocale: 'en'
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
