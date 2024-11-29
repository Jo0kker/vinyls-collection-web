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
        <div className="flex flex-col px-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Réinitialiser votre mot de passe</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                {token ? (
                    <ResetPasswordForm token={token} email={email as string} />
                ) : (
                    <p className="text-red-500">Token de réinitialisation manquant. Veuillez vérifier le lien dans votre e-mail.</p>
                )}
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Réinitialisation du mot de passe | Vinyls Collection'
}

