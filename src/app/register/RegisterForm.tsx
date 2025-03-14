'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Metadata } from 'next'

import { InputText } from '@/components/atom/InputText'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast'
import { useReCaptcha } from "next-recaptcha-v3"

export function RegisterForm() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const { executeRecaptcha } = useReCaptcha()

    const register = async () => {
        const token = await executeRecaptcha('register')

        await fetchAPI('/register', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                "g-recaptcha-response": token
            })
        }).then(() => {
            router.push('/login')
            showToast({
                message: (
                    <div>
                        <p>Votre compte a bien été créé,</p>
                        <strong className="underline text-fuchsia-700">pensez à vérifier vos emails pour valider votre compte</strong>
                    </div>
                ),
                type: 'success'
            })
        }).catch((err) => {
            showToast({
                message: (
                    <div>
                        <p>Erreur lors de l'inscription</p>
                        <strong className="underline text-fuchsia-700">{JSON.parse(err.message).message}</strong>
                    </div>
                ),
                type: 'error'
            })
        })
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                register()
            }}
            className="w-full max-w-md p-4 space-y-3 border border-gray-200 rounded-lg shadow-lg"
        >
            <div className="space-y-2">
                <div className="flex flex-col gap-2">
                    <InputText
                        label="Pseudo"
                        name="name"
                        setValue={setName}
                        value={name}
                    />
                    <InputText
                        label="Email"
                        name="email"
                        setValue={setEmail}
                        value={email}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <InputText
                        label="Mot de passe"
                        name="password"
                        setValue={setPassword}
                        value={password}
                        type="password"
                    />
                    <InputText
                        label="Confirmer le mot de passe"
                        name="password_confirmation"
                        setValue={setPasswordConfirmation}
                        value={password_confirmation}
                        type="password"
                    />
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <button
                        className="flex justify-center w-full px-3 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-lg bg-fuchsia-500 hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        type="submit"
                    >
                        S'inscrire
                    </button>
                    <p className="text-xs italic text-center text-gray-600">
                        En vous inscrivant, vous acceptez les Conditions d'utilisation et la
                        Politique de confidentialité.
                    </p>
                    <Link 
                        href="/login" 
                        className="text-xs text-gray-600 hover:text-fuchsia-500 transition-colors duration-200"
                    >
                        Déjà un compte ? Se connecter
                    </Link>
                </div>
            </div>
        </form>
    )
}

export const metadata: Metadata = {
    title: 'Inscription | Vinyls Collection'
}
