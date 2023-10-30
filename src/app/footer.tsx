import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/logo.png'

/** @todo - Add links href */
const FOOTER_LINKS = [
    { href: '#', label: 'Présentation du site' },
    { href: '#', label: 'Foire aux questions' },
    { href: '#', label: 'Les vinyls du siècle' },
    { href: '#', label: "Besoin d'aide ?" },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Tous les vinyls' },
    { href: '#', label: 'Tous les collectionneurs' },
    { href: '#', label: 'Nos partenaires' }
]

export default function Footer() {
    return (
        <footer className="mb-10 w-full px-4 pb-4 text-white md:px-0">
            <article className="mx-auto max-w-screen-xl rounded-lg bg-black/10 p-6 shadow-md">
                <div className="flex flex-col lg:flex-row">
                    <div className="mb-6 flex space-x-3 lg:mb-0 lg:mr-10">
                        <Image
                            src={logo}
                            alt="Logo de Vinyl Collection - Platine vinyle"
                            height={49}
                            width={110}
                            className="mr-3"
                        />
                        <span className="text-2xl font-semibold text-gray-300">
                            Vinyls Collection
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-4">
                        {FOOTER_LINKS.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="text-sm text-gray-400 hover:text-orange-700 hover:underline"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <hr className="my-8 border-gray-400" />

                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2022{' '}
                        <Link href="/" className="cursor-pointer hover:underline">
                            Vinyls-Collection™
                        </Link>
                    </span>

                    <div className="flex justify-center lg:justify-end">
                        <Link href="www">
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="h-[1rem] w-[1rem] cursor-pointer hover:text-orange-700"
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4 text-sm text-gray-400">
                    <Link href="#" className="hover:text-orange-700 hover:underline">
                        Mentions légales
                    </Link>
                    <Link href="#" className="hover:text-orange-700 hover:underline">
                        Politique de confidentialité
                    </Link>
                </div>
            </article>
        </footer>
    )
}
