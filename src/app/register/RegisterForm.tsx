'use client'

import { Button } from '@/components/atom/Button'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from 'flowbite-react'
import { Metadata } from 'next'

export function RegisterForm() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const handleRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        const data = new FormData(event.target as HTMLFormElement)
        const name = data.get('name')
        const email = data.get('email')
        const password = data.get('password')
        const password_confirmation = data.get('password_confirmation')
    }

    return (
        <form
            onSubmit={handleRegister}
            className={
                'mx-4 flex w-full flex-col items-center justify-center gap-4 rounded bg-black bg-opacity-20 p-2 xl:flex-row'
            }
        >
            <div>
                <div>
                    <label htmlFor="name">Pseudo :</label>
                    <input name={'name'} type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email :</label>
                    <input name={'email'} type="text" />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <label htmlFor="password">Confirmation mot de passe :</label>
                    <input name={'password_confirmation'} type="password" />
                </div>
            </div>
            <p>
                En vous inscrivant, vous acceptez les conditions d'utilisation et la politique de
                confidentialité.
            </p>
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "S'inscrire"}
            </Button>
        </form>
    )
}

export const metadata: Metadata = {
    title: 'Inscription | Vinyls Collection'
}
