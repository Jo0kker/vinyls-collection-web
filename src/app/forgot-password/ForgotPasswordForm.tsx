'use client'

import { Button } from '@/components/atom/Button';
import { fetchAPI } from '@/utils/fetchAPI';
import { showToast } from '@/utils/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from '@/components/atom/InputText';

const ForgotPasswordForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Adresse email invalide').required('L\'adresse email est requise'),
        }),
        onSubmit: (values: { email: string }) => {
            fetchAPI('/forgot-password', {
                method: 'POST',
                body: JSON.stringify(values),
            })
                .then(() => {
                    showToast({
                        type: 'success',
                        message: 'Un e-mail de réinitialisation a été envoyé à votre adresse.',
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
        <div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center lg:mx-32 mb-8">
                <div className="w-full max-w-md p-4 space-y-3 border border-gray-200 rounded-lg shadow-lg">
                    <div className="space-y-2">
                        <InputText
                            label="Adresse email"
                            name="email"
                            type="email"
                            placeholder="Votre adresse email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-xs text-red-500">{formik.errors.email}</div>
                        )}
                        <Button
                            type="submit"
                            className="flex justify-center w-full px-3 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-lg bg-fuchsia-500 hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            disabled={formik.isSubmitting}
                        >
                            Réinitialiser mon mot de passe
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
