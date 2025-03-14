import { Metadata } from 'next'
import ResetPasswordForm from './ResetPasswordForm'

interface PageProps {
    searchParams: Promise<{ 
        token?: string
        email?: string 
    }>
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
    const params = await searchParams
    const token = params.token
    const email = params.email

    return (
        <div className="mt-4 flex flex-col rounded bg-white px-4 pt-4 sm:pt-0">
            <div className="mb-4 mt-6 flex flex-row justify-center text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Réinitialiser votre mot de passe</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                {token ? (
                    <ResetPasswordForm token={token} email={email as string} />
                ) : (
                    <div className="p-3 space-y-2 bg-white border border-gray-200 rounded-lg shadow-xl">
                        <p className="text-xs text-red-500">Token de réinitialisation manquant. Veuillez vérifier le lien dans votre e-mail.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Réinitialisation du mot de passe | Vinyls Collection'
}

