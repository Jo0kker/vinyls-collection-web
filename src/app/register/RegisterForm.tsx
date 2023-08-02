'use client'

import { Button } from '@/components/atom/Button'
import { Field, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import type { FormikHelpers, FieldProps } from 'formik'
import { Metadata } from 'next'
import { Form } from 'formik'
import { InputText } from '@/components/atom/InputText'
import axios from 'axios'

interface RegisterProps {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export function RegisterForm() {
    const router = useRouter()

    const register = (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(() => {})
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }}
            onSubmit={(values: RegisterProps, { setSubmitting }: FormikHelpers<RegisterProps>) => {
                register(values.name, values.email, values.password, values.password_confirmation)
                setSubmitting(false)
            }}
        >
            <Form>
                <div className={'flex flex-col items-center justify-center'}>
                    <div className={'mt-4 flex flex-col justify-center gap-2 p-4 '}>
                        <div
                            className={
                                'flex flex-col justify-center gap-4 rounded bg-black bg-opacity-20 p-4 align-middle lg:flex-row'
                            }
                        >
                            <Field name="name">
                                {({ field, form, meta }: FieldProps) => (
                                    <InputText
                                        field={field}
                                        form={form}
                                        meta={meta}
                                        buildInfo={{
                                            label: 'Pseudo :',
                                            type: 'text',
                                            placeholder: 'Pseudo'
                                        }}
                                        className={
                                            'flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:flex-1'
                                        }
                                    />
                                )}
                            </Field>
                            <Field name="email">
                                {({ field, form, meta }: FieldProps) => (
                                    <InputText
                                        field={field}
                                        form={form}
                                        meta={meta}
                                        buildInfo={{
                                            label: 'Email :',
                                            type: 'email',
                                            placeholder: 'Email'
                                        }}
                                        className={
                                            'mt-4 flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:mt-0 lg:flex-1'
                                        }
                                    />
                                )}
                            </Field>
                        </div>
                        <div
                            className={
                                'flex flex-col justify-center gap-4 rounded bg-black bg-opacity-20 p-4 align-middle lg:flex-row'
                            }
                        >
                            <Field name="password">
                                {({ field, form, meta }: FieldProps) => (
                                    <InputText
                                        field={field}
                                        form={form}
                                        meta={meta}
                                        buildInfo={{
                                            label: 'Mot de passe :',
                                            type: 'password',
                                            placeholder: 'Mot de passe'
                                        }}
                                        className={
                                            'flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:flex-1'
                                        }
                                    />
                                )}
                            </Field>
                            <Field name="password_confirmation">
                                {({ field, form, meta }: FieldProps) => (
                                    <InputText
                                        field={field}
                                        form={form}
                                        meta={meta}
                                        buildInfo={{
                                            label: 'Confirmation mot de passe :',
                                            type: 'password',
                                            placeholder: 'Mot de passe'
                                        }}
                                        className={
                                            'mt-4 flex flex-col content-center items-center gap-4 sm:flex-row sm:justify-between lg:mt-0 lg:flex-1'
                                        }
                                    />
                                )}
                            </Field>
                        </div>
                        <div
                            className={
                                'flex flex-col items-center justify-center lg:flex-row lg:justify-around'
                            }
                        >
                            <div>
                                <button
                                    className={
                                        'font-roboto h-auto rounded bg-fuchsia-800 px-3 px-4 py-2 text-white'
                                    }
                                    type="submit"
                                >
                                    S'enregistrer
                                </button>
                            </div>
                            <div>
                                <p className={'text-center text-sm italic'}>
                                    En vous inscrivant, vous acceptez les Conditions d'utilisation
                                    et la Politique de confidentialité.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export const metadata: Metadata = {
    title: 'Inscription | Vinyls Collection'
}
