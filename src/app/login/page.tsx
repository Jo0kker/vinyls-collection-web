import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/atom/Button'

import { LoginForm } from './LoginForm'

export default function LoginPage() {
    return (
        <div className="mt-4 flex flex-col rounded bg-white px-4 pt-4 sm:pt-0">
            <div className="mb-4 mt-6 flex flex-row justify-center text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Connectez-vous à votre compte</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                <LoginForm />
            </div>
            <div className="flex flex-col mx-auto mt-3">
              <Link className="text-center hover:text-orange-700" href="/reset-password">
                Mot de passe oubliée ?
              </Link>
            </div>
            <div className="flex flex-col mx-auto my-12">
              <Link href="/register" className="rounded rounded-full border p-2 border-fuchsia-800 hover:bg-fuchsia-700 hover:text-white">
                Pas de compte ? Inscrivez-vous !
              </Link>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Connexion | Vinyls Collection'
}
