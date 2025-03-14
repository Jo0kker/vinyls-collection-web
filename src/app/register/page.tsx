import { RegisterForm } from '@/app/register/RegisterForm'

export default function RegisterPage() {
    return (
        <div className="flex flex-col px-4 pt-4 mt-4 mb-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Inscription</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center justify-center lg:mx-32">
                <div className="w-full max-w-md">
                    <div className="mb-2 text-center">
                        <p className="text-sm text-gray-600">
                            Créez votre compte pour commencer à gérer votre collection
                        </p>
                    </div>

                    <div className="mb-8">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
