'use client'

import { Button } from '@/components/atom/Button';
import { fetchAPI } from '@/utils/fetchAPI';
import { showToast } from '@/utils/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ResetPasswordFormProps {
    token: string;
    email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, email }) => {
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
                .required('Le nouveau mot de passe est requis'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Les mots de passe ne correspondent pas')
                .required('La confirmation du mot de passe est requise'),
        }),
        onSubmit: (values) => {
            fetchAPI('/reset-password', {
                method: 'POST',
                body: JSON.stringify({ 
                    token,
                    password: values.newPassword,
                    password_confirmation: values.confirmPassword,
                    email,
                }),
            })
            .then(() => {
                showToast({
                    type: 'success',
                    message: 'Votre mot de passe a été réinitialisé avec succès.',
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la réinitialisation du mot de passe:', error);
                showToast({
                    type: 'error',
                    message: 'Une erreur est survenue. Veuillez réessayer.',
                });
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center w-full mb-8">
            <div className="flex flex-col w-full mb-4">
                <label htmlFor="newPassword" className="text-sm font-bold text-gray-600">Nouveau mot de passe</label>
                <input
                    id="newPassword"
                    type="password"
                    {...formik.getFieldProps('newPassword')}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
                ) : null}
            </div>
            <div className="flex flex-col w-full mb-4">
                <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-600">Confirmer le mot de passe</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps('confirmPassword')}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                ) : null}
            </div>
            <Button type="submit" className="mt-2 sm:w-full xl:w-auto xl:px-3 px-3 py-1" disabled={formik.isSubmitting}>
                Réinitialiser le mot de passe
            </Button>
        </form>
    );
};

export default ResetPasswordForm;
