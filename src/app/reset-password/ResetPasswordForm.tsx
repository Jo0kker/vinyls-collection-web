'use client'

import { Button } from '@/components/atom/Button';
import { fetchAPI } from '@/utils/fetchAPI';
import { showToast } from '@/utils/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from '@/components/atom/InputText';

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
        <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-4 space-y-3 border border-gray-200 rounded-lg shadow-lg">
            <div className="space-y-2">
                <div className="flex flex-col gap-2">
                    <InputText
                        label="Nouveau mot de passe"
                        name="newPassword"
                        type="password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <div className="text-xs text-red-500">{formik.errors.newPassword}</div>
                    )}

                    <InputText
                        label="Confirmer le mot de passe"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className="text-xs text-red-500">{formik.errors.confirmPassword}</div>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="flex justify-center w-full px-3 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-lg bg-fuchsia-500 hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    disabled={formik.isSubmitting}
                >
                    Réinitialiser le mot de passe
                </Button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
