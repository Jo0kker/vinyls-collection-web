'use client'

import { FormEvent, useState } from 'react'

import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/atom/Button'
import { showToast } from '@/utils/toast'

export function LoginForm() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const data = new FormData(event.target as HTMLFormElement)
        const email = data.get('email')
        const password = data.get('password')

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
            className="mx-4 flex w-full flex-col items-center justify-center gap-4 rounded bg-black bg-opacity-20 p-2 xl:flex-row"
        >
            <div className="flex w-full flex-col md:w-1/2 md:flex-row md:items-center md:justify-center md:gap-4 lg:w-full">
                <label htmlFor="email" className="font-roboto font-medium text-fuchsia-800">
                    E-mail :
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="exemple@e-mail.fr"
                    className="flex flex-col content-center items-center gap-4 lg:flex-row"
                />

                <label htmlFor="password" className="font-roboto font-medium text-fuchsia-800">
                    Mot de passe :
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    className="flex flex-col content-center items-center gap-4 lg:flex-row"
                />
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'Connexion'}
            </Button>
        </form>
    )
}
