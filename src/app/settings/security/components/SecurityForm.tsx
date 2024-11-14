'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/atom/Button'
import { showToast } from '@/utils/toast'
import { updatePassword } from '../actions/security'

export default function SecurityForm() {
    const formik = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: Yup.object({
            current_password: Yup.string()
                .required('Le mot de passe actuel est requis'),
            password: Yup.string()
                .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
                .notOneOf([Yup.ref('current_password')], 'Le nouveau mot de passe doit être différent de l\'ancien')
                .required('Le mot de passe est requis'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
                .required('La confirmation du mot de passe est requise')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await updatePassword(values)
                showToast({
                    type: 'success',
                    message: 'Votre mot de passe a été mis à jour avec succès'
                })
                resetForm()
            } catch (error) {
                showToast({
                    type: 'error',
                    message: 'Une erreur est survenue lors de la mise à jour du mot de passe'
                })
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                    Mot de passe actuel
                </label>
                <input
                    type="password"
                    id="current_password"
                    {...formik.getFieldProps('current_password')}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
                {formik.touched.current_password && formik.errors.current_password && (
                    <div className="mt-1 text-sm text-red-600">{formik.errors.current_password}</div>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Nouveau mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="mt-1 text-sm text-red-600">{formik.errors.password}</div>
                )}
            </div>

            <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                    Confirmer le nouveau mot de passe
                </label>
                <input
                    type="password"
                    id="password_confirmation"
                    {...formik.getFieldProps('password_confirmation')}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                    <div className="mt-1 text-sm text-red-600">{formik.errors.password_confirmation}</div>
                )}
            </div>

            <Button type="submit" disabled={formik.isSubmitting} className="w-auto mx-auto">
                Mettre à jour le mot de passe
            </Button>
        </form>
    )
}