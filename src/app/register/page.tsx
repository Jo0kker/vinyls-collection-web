import { RegisterForm } from '@/app/register/RegisterForm'

export default function RegisterPage() {
    return (
        <div className="mt-4 flex flex-col rounded bg-white px-4 pt-4 sm:pt-0">
            <div className="mb-4 mt-6 flex flex-row justify-center text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Pas de compte ? Inscrivez-vous</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                <RegisterForm />
            </div>
        </div>
    )
}
