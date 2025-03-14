import { Metadata } from 'next'
import { LoginForm } from '@/app/login/LoginForm'
import { LoginLinks } from '@/app/login/LoginLinks'

export default function LoginPage() {
    return (
        <div className="flex flex-col px-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Connexion</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                <div className="w-full max-w-md">
                    <div className="mb-2 text-center">
                        <p className="text-sm text-gray-600">
                            Connectez-vous pour accéder à votre collection
                        </p>
                    </div>

                    <div className="mb-8">
                        <LoginForm />
                    </div>

                    <LoginLinks />
                </div>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Connexion | Vinyls Collection'
}
