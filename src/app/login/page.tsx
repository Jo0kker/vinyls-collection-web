import { Metadata } from 'next'
import Link from 'next/link'

import { LoginForm } from './LoginForm'

export default function LoginPage() {
    return (
        <div className="flex flex-col px-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Connectez-vous à votre compte</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                <LoginForm />
            </div>
            <div className="flex flex-col mx-auto mt-3">
                <Link className="text-center hover:text-orange-700" href="/forgot-password">
                    Mot de passe oubliée ?
                </Link>
            </div>
            <div className="flex flex-col mx-auto my-12">
                <Link
                    href="/register"
                    className="p-2 border rounded-full border-fuchsia-800 hover:bg-fuchsia-700 hover:text-white"
                >
                    Pas de compte ? Inscrivez-vous !
                </Link>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Connexion | Vinyls Collection'
}
