import { Metadata } from 'next'
import SecurityForm from './components/SecurityForm'
import DeleteAccountCard from './components/DeleteAccountCard'

export const metadata: Metadata = {
    title: 'Sécurité - Vinyls Collection',
    description: 'Gérez la sécurité de votre compte Vinyls Collection'
}

export default function SecurityPage() {
    return (
        <div className="flex flex-col px-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Sécurité du compte</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col gap-8 mb-8">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Modification du mot de passe</h2>
                    <SecurityForm />
                </div>

                <div className="p-6 border border-red-200 rounded-lg shadow-sm bg-red-50">
                    <DeleteAccountCard />
                </div>
            </div>
        </div>
    )
}