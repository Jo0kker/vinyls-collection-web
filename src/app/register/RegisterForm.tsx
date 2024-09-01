'use client'

import { useState } from 'react'

import { Metadata } from 'next'
import { useRouter } from 'next/navigation'

import { InputText } from '@/components/atom/InputText'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast';

export function RegisterForm() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const register = async () => {
        await fetchAPI('/register', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation
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
        >
            <div className="flex flex-col items-center justify-center">
                <div className="mt-4 flex flex-col justify-center gap-2 p-4 ">
                    <div
                      className="flex flex-col justify-center gap-4 rounded bg-black bg-opacity-20 p-4 align-middle lg:flex-row">
                        <InputText
                          className="flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:flex-1"
                          label="pseudo"
                          name="name"
                          setValue={setName}
                          value={name}
                        />
                        <InputText
                          className="mt-4 flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:mt-0 lg:flex-1"
                          label="email"
                          name="email"
                          setValue={setEmail}
                          value={email}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-4 rounded bg-black bg-opacity-20 p-4 align-middle lg:flex-row">
                        <InputText
                            className="flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:flex-1"
                            label="password"
                            name="password"
                            setValue={setPassword}
                            value={password}
                            type="password"
                        />
                        <InputText
                            className="mt-4 flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:mt-0 lg:flex-1"
                            label="password confirmation"
                            name="password_confirmation"
                            setValue={setPasswordConfirmation}
                            value={password_confirmation}
                            type="password"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center lg:justify-around">
                        <div>
                            <button
                                className="font-roboto h-auto rounded bg-fuchsia-800 px-4 py-2 text-white"
                                type="submit"
                            >
                                S'enregistrer
                            </button>
                        </div>
                        <div>
                            <p className="text-center text-sm italic">
                                En vous inscrivant, vous acceptez les Conditions d'utilisation et la
                                Politique de confidentialité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const metadata: Metadata = {
    title: 'Inscription | Vinyls Collection'
}
