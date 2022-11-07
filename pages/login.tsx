import { useBearStore } from "@store/useBearStore";
import { TextInput } from "flowbite-react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { InputText } from "@components/InputText";
import Link from "next/link";
import { Button } from "@components/Button";
import axios from "axios";
import axiosApiInstance from "../services/interceptorService";

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const user = useBearStore((state) => state.user);

  const login = async (username: string, password: string) => {
    const res = await axios.post(
      "http://localhost:8000/oauth/token",
      {
        grant_type: "password",
        client_id: 2,
        client_secret: "F0XckSdexv1TDvYLZeC4BWWTou351rmaM0ViDO6G",
        username: username,
        password: password,
        scope: "",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log(res.data);
      // token with localStorage
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("expires_in", res.data.expires_in);
      // user with zustand
      const user = await axiosApiInstance.get("/user");
      console.log(user.data);
      useBearStore.setState({ user: user.data });
    }
  };

  const showStateUser = () => {
    console.log(user);
  };

  const resetStateUser = () => {
    useBearStore.setState({ user: {} });
  };

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
            login(values.email, values.password);
            setSubmitting(false);
          }}
        >
          <Form
            className={
              "flex flex-col sm:flex-row justify-center  gap-4 p-4 m-4 rounded bg-black bg-opacity-20"
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
      <Link className={"self-start ml-48"} href={"/"}>
        Mot de passe oubliée ?
      </Link>
      <Button className={"my-12"}>
        <Link href={"/register"}>Pas de compte ? Inscrivez-vous !</Link>
      </Button>
      <button onClick={showStateUser}>test</button>
      <button onClick={resetStateUser}>reset State user</button>
    </div>
  );
};

export default Login;
