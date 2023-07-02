import Link from 'next/link';
import Head from 'next/head';
import { Field, Form, Formik } from 'formik';

import { showToast } from '@utils/utils';
import { Button } from '@components/Button';
import { InputText } from '@components/InputText';

import type { FieldProps } from 'formik';
import { signIn } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@utils/authOptions';
import { useRouter } from 'next/router';

interface LoginProps {
    email: string;
    password: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (session?.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    return {
        props: {
            session
        }
    };
}

export default function Login() {
    const router = useRouter();
    const handleSubmit = async ({ email, password }: LoginProps) => {
        try {
            const result = await signIn('credentials', {
                username: email,
                password,
                redirect: false
            });
            if (result?.ok) {
                showToast('success', 'Logged in successfully');
                router.replace('/');
            } else {
                if (result?.status === 401) {
                    showToast('error', 'Identifiants incorrects');
                } else {
                    showToast(
                        'error',
                        'Une erreur est survenue, merci de réessayer ou de contacter le support'
                    );
                }
            }
        } catch (error) {
            showToast(
                'error',
                'Une erreur est survenue, merci de réessayer ou de contacter le support'
            );
        }
    };

    return (
        <div className="pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col">
            <Head>
                <title>Connexion</title>
            </Head>
            <div className="flex flex-row justify-center font-bold text-2xl mt-6 mb-4">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">
                    Connectez-vous à votre compte
                </h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>
            <div className="flex flex-col justify-center items-center lg:mx-32">
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col xl:flex-row justify-center items-center gap-4 p-2 mx-4 w-full rounded bg-black bg-opacity-20">
                        <div className="flex flex-col w-full md:flex-row md:w-1/2 md:gap-4 lg:w-full md:justify-center">
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
                                        className="flex flex-col lg:flex-row items-center content-center gap-4"
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form, meta }: FieldProps) => (
                                    <InputText
                                        field={field}
                                        form={form}
                                        meta={meta}
                                        buildInfo={{
                                            label: 'Password :',
                                            type: 'password',
                                            placeholder: 'Password'
                                        }}
                                        className="flex flex-col lg:flex-row items-center content-center gap-4"
                                    />
                                )}
                            </Field>
                        </div>
                        <Button type="submit">Connexion</Button>
                    </Form>
                </Formik>
            </div>
            <Link
                className="sm:ml-48 hover:text-orange-700"
                href="/password_reset"
            >
                Mot de passe oubliée ?
            </Link>
            <Button className="my-12" type="button">
                <Link href="/register">Pas de compte ? Inscrivez-vous !</Link>
            </Button>
        </div>
    );
}
