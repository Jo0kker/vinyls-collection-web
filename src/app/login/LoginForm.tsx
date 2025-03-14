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
            className="w-full max-w-md p-4 mb-4 space-y-3 border border-gray-200 rounded-lg shadow-lg"
        >
            <div className="space-y-2">
                <div className="flex flex-col gap-2">
                    <InputText
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                        label="Adresse e-mail"
                        type="email"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-xs text-red-500">{formik.errors.email}</div>
                    )}

                    <InputText
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                        label="Mot de passe"
                        type="password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-xs text-red-500">{formik.errors.password}</div>
                    )}
                </div>

                <Button 
                    type="submit" 
                    disabled={loading || !formik.isValid}
                    className="flex justify-center w-full px-3 py-2 text-sm font-medium text-white transition-all duration-200 border border-transparent rounded-md shadow-lg bg-fuchsia-500 hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Spinner /> : 'Se connecter'}
                </Button>
            </div>
        </form>
    )
}
