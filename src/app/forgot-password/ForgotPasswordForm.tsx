'use client'

import { Button } from '@/components/atom/Button';
import { fetchAPI } from '@/utils/fetchAPI';
import { showToast } from '@/utils/toast';

import { useFormik } from 'formik';
import * as Yup from 'yup';

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
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-sm font-bold text-gray-600">Adresse email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Votre adresse email"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    ) : null}
                </div>
                <Button
                    type="submit"
                    className="mt-2 sm:w-full xl:w-auto xl:px-3 px-3 py-1"
                >
                    Réinitialiser mon mot de passe
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
