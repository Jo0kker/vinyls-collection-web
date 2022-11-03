import { useBearStore } from "@store/useBearStore";
import { TextInput } from "flowbite-react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { InputText } from "@components/InputText";

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const health = useBearStore((state) => state.health);
  const test = useBearStore((state) => state.test);

  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div className={"flex flex-row justify-center font-bold text-2xl mt-6"}>
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Connectez-vous à votre compte</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>
      <div className={"flex flex-col justify-center items-center"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(
            values: LoginProps,
            { setSubmitting }: FormikHelpers<LoginProps>
          ) => {
            console.log(values);
          }}
        >
          <Form
            className={
              "flex flex-col sm:flex-row justify-center  gap-4 p-4 m-4 rounded bg-black bg-opacity-50"
            }
          >
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
            <Field name="password">
              {({ field, form, meta }: any) => (
                <InputText
                  field={field}
                  form={form}
                  meta={meta}
                  buildInfo={{
                    label: "Password :",
                    type: "password",
                    placeholder: "Password",
                  }}
                  className={
                    "flex flex-col sm:flex-row items-center content-center gap-4"
                  }
                />
              )}
            </Field>
            <button
              className={
                "text-white bg-fuchsia-800 h-auto rounded px-3 font-roboto"
              }
              type="submit"
            >
              Connexion
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
