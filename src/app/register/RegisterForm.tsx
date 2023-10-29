'use client'

import axios from 'axios'
import type { FormikHelpers, FieldProps } from 'formik'
import { Field, Formik, Form } from 'formik'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'

import { InputText } from '@/components/atom/InputText'
import { useState } from 'react';
import { isAwaitKeyword } from 'ts-api-utils';
import { fetchAPI } from '@/utils/fetchAPI';

interface RegisterProps {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export function RegisterForm() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const register = async () => {
        await fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            })
        }).then(r => {
            router.push('/login')
        })
    }

    return (
        <form onSubmit={register}>
            <div className="flex flex-col items-center justify-center">
                <div className="mt-4 flex flex-col justify-center gap-2 p-4 ">
                    <div className="flex flex-col justify-center gap-4 rounded bg-black bg-opacity-20 p-4 align-middle lg:flex-row">
                        <InputText
                            className="flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:flex-1"
                            label={'pseudo'} name={"name"} setValue={setName} value={name}
                        />
                        <InputText
                            className="mt-4 flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:mt-0 lg:flex-1"
                            label={'email'} name={"email"} setValue={setEmail} value={email}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-4 rounded bg-black bg-opacity-20 p-4 align-middle lg:flex-row">
                        <InputText
                            className="flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:flex-1"
                            label={'password'} name={"password"} setValue={setPassword} value={password}
                            type={'password'}
                        />
                        <InputText
                            className="mt-4 flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:mt-0 lg:flex-1"
                            label={'password confirmation'} name={"password_confirmation"} setValue={setPasswordConfirmation} value={password_confirmation}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center lg:justify-around">
                        <div>
                            <button
                                className="font-roboto h-auto rounded bg-fuchsia-800 px-3 px-4 py-2 text-white"
                                type="submit"
                            >
                                S'enregistrer
                            </button>
                        </div>
                        <div>
                            <p className="text-center text-sm italic">
                                En vous inscrivant, vous acceptez les Conditions d'utilisation
                                et la Politique de confidentialité.
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
