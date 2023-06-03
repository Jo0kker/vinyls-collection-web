import { Field, Form, Formik } from 'formik';
import type { FieldProps } from 'formik';
import { InputText } from '@components/InputText';
import { Button } from '@components/Button';
import axios from 'axios';
import { showToast } from '@utils/utils';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Head from 'next/head';

const PasswordReset = () => {
    const router = useRouter();

    const resetPassword = (email: string) => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`,
                {
                    email: email,
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
                        'Un email de réinitialisation de mot de passe vous a été envoyé'
                    );
                });
            })
            .catch((err) => {
                showToast('error', err.response.data.error);
            });
    };

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <Head>
                <title>Réinitialisation de mot de passe</title>
            </Head>
            <div
                className={'flex flex-row justify-center font-bold text-2xl mt-6 mb-4'}
            >
                <span className={'mr-3 text-emerald-500'}>&#47;&#47;</span>
                <h1 className={'text-fuchsia-800'}>Mot de passe oublié</h1>
                <span className={'ml-3 text-orange-400'}>&#47;&#47;</span>
            </div>
            <div className={'flex flex-col justify-center items-center lg:mx-32'}>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Email invalide')
                            .required('Email requis'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        resetPassword(values.email);
                        setSubmitting(false);
                    }}
                >
                    <Form
                        className={
                            'flex flex-col xl:flex-row justify-center items-center gap-4 p-2 mx-4 mb-4 w-full md:w-8/12 rounded bg-black bg-opacity-20'
                        }
                    >
                        <div
                            className={
                                'flex flex-col w-full md:flex-row md:w-full md:gap-4 lg:w-full md:justify-center'
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
                                            'flex flex-col md:flex-row justify-center items-center w-full gap-4'
                                        }
                                    />
                                )}
                            </Field>
                        </div>
                        <Button type={'submit'}>Envoyer</Button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default PasswordReset;
