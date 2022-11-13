import { Field, Form, Formik, FormikHelpers } from "formik";
import { InputText } from "@components/InputText";
import Link from "next/link";
import { Button } from "@components/Button";
import { Checkbox, Label } from "flowbite-react";

interface RegisterProps {
  pseudo: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
}

const Register = () => {
  const register = (
    pseudo: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {};

  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div className={"flex flex-row justify-center font-bold text-2xl mt-6"}>
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Connectez-vous à votre compte</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>
      <Formik
        initialValues={{
          pseudo: "",
          email: "",
          password: "",
          password_confirmation: "",
          terms: false,
        }}
        onSubmit={(
          values: RegisterProps,
          { setSubmitting }: FormikHelpers<RegisterProps>
        ) => {
          register(
            values.pseudo,
            values.email,
            values.password,
            values.password_confirmation
          );
          setSubmitting(false);
        }}
      >
        <>
          <div className={"flex flex-col justify-center items-center"}>
            <Form
              className={
                "flex flex-col sm:flex-row justify-center  gap-4 p-4 m-4 rounded bg-black bg-opacity-20"
              }
            >
              <div>
                <Field name="pseudo">
                  {({ field, form, meta }: any) => (
                    <InputText
                      field={field}
                      form={form}
                      meta={meta}
                      buildInfo={{
                        label: "Pseudo :",
                        type: "text",
                        placeholder: "Pseudo",
                      }}
                      className={
                        "flex flex-col sm:flex-row items-center content-center gap-4"
                      }
                    />
                  )}
                </Field>
                <Field name="email">
                  {({ field, form, meta }: any) => (
                    <InputText
                      field={field}
                      form={form}
                      meta={meta}
                      buildInfo={{
                        label: "Email :",
                        type: "email",
                        placeholder: "Email",
                      }}
                      className={
                        "flex flex-col sm:flex-row items-center content-center gap-4"
                      }
                    />
                  )}
                </Field>
              </div>
              <div>
                <Field name="password">
                  {({ field, form, meta }: any) => (
                    <InputText
                      field={field}
                      form={form}
                      meta={meta}
                      buildInfo={{
                        label: "Mot de passe :",
                        type: "password",
                        placeholder: "Mot de passe",
                      }}
                      className={
                        "flex flex-col sm:flex-row items-center content-center gap-4"
                      }
                    />
                  )}
                </Field>
                <Field name="password_confirmation">
                  {({ field, form, meta }: any) => (
                    <InputText
                      field={field}
                      form={form}
                      meta={meta}
                      buildInfo={{
                        label: "Confirmation mot de passe :",
                        type: "password",
                        placeholder: "Mot de passe",
                      }}
                      className={
                        "flex flex-col sm:flex-row items-center content-center gap-4"
                      }
                    />
                  )}
                </Field>
              </div>
            </Form>
          </div>
          <div className={"flex flex-col sm:flex-row justify-center"}>
            <Field name="terms">
              {({ field, form, meta }: any) => (
                <div>
                  <Label
                    className={"flex flex-row items-center gap-2"}
                    htmlFor="terms"
                  >
                    <input
                      type="checkbox"
                      className={"focus:ring-0"}
                      id="terms"
                      name="terms"
                      {...field}
                    />
                    <span className={"text-gray-700"}>
                      J'accepte les conditions générales d'utilisation
                    </span>
                  </Label>
                </div>
              )}
            </Field>
            <div>
              <button
                className={
                  "text-white bg-fuchsia-800 h-auto rounded px-3 font-roboto"
                }
                type="submit"
              >
                Connexion
              </button>
            </div>
          </div>
        </>
      </Formik>
      <Button className={"my-12"}>
        <Link href={"/register"}>Pas de compte ? Inscrivez-vous !</Link>
      </Button>
    </div>
  );
};

export default Register;
