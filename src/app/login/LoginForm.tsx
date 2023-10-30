'use client'

import { FormEvent, useState } from 'react'

import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import { showToast } from '@/utils/toast'

export function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                username: email,
                password,
                redirect: false
            })

            if (!result?.ok) {
                if (result?.status === 401) {
                    showToast('error', 'Identifiants incorrects')
                } else {
                    showToast(
                        'error',
                        'Une erreur est survenue, merci de réessayer ou de contacter le support'
                    )
                }
            } else {
                showToast('success', 'Vous êtes connectés ')
                router.replace('/')
            }
        } catch (error) {
            showToast(
                'error',
                'Une erreur est survenue, merci de réessayer ou de contacter le support'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleLogin}
            className="mx-4 flex w-full flex-col items-center justify-center gap-4 rounded bg-black bg-opacity-20 p-2 lg:w-2/3"
        >
            <div className="flex w-full flex-col pt-2 md:w-1/2 md:flex-row md:items-center md:justify-center md:gap-4 lg:w-full">
                <InputText
                    value={email}
                    setValue={setEmail}
                    name="mail"
                    label="E-mail"
                    type="email"
                    className="my-3"
                />

                <InputText
                    value={password}
                    setValue={setPassword}
                    name="password"
                    label="Mot de passe"
                    type="password"
                />
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'Connexion'}
            </Button>
        </form>
    )
}
