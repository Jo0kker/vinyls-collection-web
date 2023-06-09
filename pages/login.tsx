import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';

import { showToast } from '@utils/utils';
import { Button } from '@components/Button';
import { InputText } from '@components/InputText';
import { useBearStore } from '@store/useBearStore';
import axiosApiInstance from '@services/interceptorService';

import type { AxiosResponse } from 'axios';
import type { FormikHelpers, FieldProps } from 'formik';

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
    const router = useRouter();

    const login = (username: string, password: string) => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
                {
                    grant_type: 'password',
                    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
                    username: username,
                    password: password,
                    scope: '',
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response: AxiosResponse) => {
                // set in cookie
                const cookie = new Cookies();
                // set token / refresh token / expires in cookie
                cookie.set('token', response.data.access_token, {
                    path: '/',
                    maxAge: 31536000, // Expires after 1year
                });
                cookie.set('refresh_token', response.data.refresh_token, {
                    path: '/',
                    maxAge: 31536000, // Expires after 1year
                });
                cookie.set('expires_in', response.data.expires_in, {
                    path: '/',
                    maxAge: 31536000, // Expires after 1year
                });
                // user with zustand
                axiosApiInstance.get('/users/me').then((res: AxiosResponse) => {
                    useBearStore.setState({ user: res.data });
                    showToast('success', 'Logged in successfully');
                    router.push('/');
                });
            })
            .catch((error) => {
                // if status code is 401, then the user is unauthorized
                if (error.response.status === 401 || error.response.status === 400) {
                    showToast('error', 'Identifiants incorrects');
                } else {
                    showToast(
                        'error',
                        'Une erreur est survenue, merci de réessayer ou de contacter le support'
                    );
                }
            });
    };

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <Head>
                <title>Connexion</title>
            </Head>
            <div
                className={'flex flex-row justify-center font-bold text-2xl mt-6 mb-4'}
            >
                <span className={'mr-3 text-emerald-500'}>&#47;&#47;</span>
                <h1 className={'text-fuchsia-800'}>Connectez-vous à votre compte</h1>
                <span className={'ml-3 text-orange-400'}>&#47;&#47;</span>
            </div>
            <div className={'flex flex-col justify-center items-center lg:mx-32'}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(
                        values: LoginProps,
                        { setSubmitting }: FormikHelpers<LoginProps>
                    ) => {
                        login(values.email, values.password);
                        setSubmitting(false);
                    }}
                >
                    <Form
                        className={
                            'flex flex-col xl:flex-row justify-center items-center gap-4 p-2 mx-4 w-full rounded bg-black bg-opacity-20'
                        }
                    >
                        <div
                            className={
                                'flex flex-col w-full md:flex-row md:w-1/2 md:gap-4 lg:w-full md:justify-center'
                            }
                        >
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
                                            'flex flex-col lg:flex-row items-center content-center gap-4'
                                        }
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
                                            placeholder: 'Password',
                                        }}
                                        className={
                                            'flex flex-col lg:flex-row items-center content-center gap-4'
                                        }
                                    />
                                )}
                            </Field>
                        </div>
                        <Button type={'submit'}>Connexion</Button>
                    </Form>
                </Formik>
            </div>
            <Link
                className={'sm:ml-48 hover:text-orange-700'}
                href={'/password_reset'}
            >
        Mot de passe oubliée ?
            </Link>
            <Button className={'my-12'} type={'button'}>
                <Link href={'/register'}>Pas de compte ? Inscrivez-vous !</Link>
            </Button>
        </div>
    );
};

export default Login;
