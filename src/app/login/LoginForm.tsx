'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import { showToast } from '@/utils/toast'

export function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Adresse e-mail invalide').required('L\'adresse e-mail est requise'),
            password: Yup.string().required('Le mot de passe est requis'),
        }),
        onSubmit: async (values) => {
            setLoading(true)

            setLoading(true)
            signIn('credentials', {
                username: values.email,
                password: values.password,
                redirect: false
            })
            .then((result) => {
                if (!result?.ok) {
                    if (result?.status === 401) {
                        showToast({ type: 'error', message: 'Identifiants incorrects' })
                    } else {
                        showToast({ type: 'error', message: 'Une erreur est survenue' })
                    }
                } else {
                    showToast({ type: 'success', message: 'Vous êtes connectés' })
                    router.replace('/')
                }
            })
            .catch(() => {
                showToast({ type: 'error', message: 'Une erreur est survenue' })
            })
            .finally(() => {
                setLoading(false)
            })
        },
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="mx-4 flex w-full flex-col items-center justify-center gap-4 rounded bg-black bg-opacity-20 p-2 lg:w-2/3"
        >
            <div className="flex w-full flex-col pt-2 md:w-1/2 md:flex-row md:items-center md:justify-center md:gap-4 lg:w-full">
                <InputText
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    label="E-mail"
                    type="email"
                    className="my-3"
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                ) : null}

                <InputText
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    label="Mot de passe"
                    type="password"
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
            </div>
            <Button type="submit" disabled={loading || !formik.isValid}>
                {loading ? <Spinner /> : 'Connexion'}
            </Button>
        </form>
    )
}
