import { Field, Form, Formik } from 'formik';
import type { FormikHelpers, FieldProps } from 'formik';
import { InputText } from '@components/InputText';
import Link from 'next/link';
import { Button } from '@components/Button';
import { Label } from 'flowbite-react';
import axios from 'axios';
import { showToast } from '@utils/utils';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface RegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
}

const Register = () => {
    const router = useRouter();

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
                    password_confirmation: password_confirmation,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                router.push('/login').then(() => {
                    showToast(
                        'success',
                        'Inscription réussie, merci de vérifier votre boîte mail pour confirmer votre compte'
                    );
                });
            });
    };

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <Head>
                <title>Inscription</title>
            </Head>
            <div className={'flex flex-row justify-center font-bold text-2xl mt-6'}>
                <span className={'mr-3 text-emerald-500'}>&#47;&#47;</span>
                <h1 className={'text-fuchsia-800'}>Pas de compte ? Inscrivez-vous</h1>
                <span className={'ml-3 text-orange-400'}>&#47;&#47;</span>
            </div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    terms: false,
                }}
                onSubmit={(
                    values: RegisterProps,
                    { setSubmitting }: FormikHelpers<RegisterProps>
                ) => {
                    register(
                        values.name,
                        values.email,
                        values.password,
                        values.password_confirmation
                    );
                    setSubmitting(false);
                }}
            >
                <Form>
                    <div className={'flex flex-col justify-center items-center'}>
                        <div className={'flex flex-col justify-center gap-2 p-4 mt-4 '}>
                            <div
                                className={
                                    'flex flex-col lg:flex-row justify-center align-middle rounded bg-black bg-opacity-20 p-4 gap-4'
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
                                                placeholder: 'Pseudo',
                                            }}
                                            className={
                                                'flex flex-col sm:flex-row sm:justify-between lg:flex-1 items-center content-center gap-4'
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
                                                placeholder: 'Email',
                                            }}
                                            className={
                                                'flex flex-col sm:flex-row sm:justify-between lg:flex-1 items-center content-center gap-4 mt-4 lg:mt-0'
                                            }
                                        />
                                    )}
                                </Field>
                            </div>
                            <div
                                className={
                                    'flex flex-col lg:flex-row justify-center align-middle rounded bg-black bg-opacity-20 p-4 gap-4'
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
                                                placeholder: 'Mot de passe',
                                            }}
                                            className={
                                                'flex flex-col sm:flex-row sm:justify-between lg:flex-1 items-center content-center gap-4'
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
                                                placeholder: 'Mot de passe',
                                            }}
                                            className={
                                                'flex flex-col sm:flex-row sm:justify-between lg:flex-1 items-center content-center gap-4 mt-4 lg:mt-0'
                                            }
                                        />
                                    )}
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            'flex flex-col lg:flex-row lg:justify-around justify-center items-center'
                        }
                    >
                        <Field name="terms">
                            {({ field, form, meta }: FieldProps) => (
                                <div className={'mb-2'}>
                                    <Label
                                        className={'flex flex-row items-center gap-2'}
                                        htmlFor="terms"
                                    >
                                        <input
                                            type="checkbox"
                                            className={'focus:ring-0'}
                                            {...field}
                                        />
                                        <span className={'text-gray-700'}>
                      J'accepte les conditions générales d'utilisation
                                        </span>
                                    </Label>
                                </div>
                            )}
                        </Field>
                        <div>
                            <button
                                className={
                                    'text-white bg-fuchsia-800 h-auto rounded px-3 font-roboto px-4 py-2'
                                }
                                type="submit"
                            >
                Connexion
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Button className={'my-12'}>
                <Link href={'/login'}>Déjà un compte ? Connectez-vous !</Link>
            </Button>
        </div>
    );
};

export default Register;
