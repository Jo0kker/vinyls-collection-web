import { useBearStore } from "@store/useBearStore";
import { TextInput } from "flowbite-react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { InputText } from "@components/InputText";
import Link from "next/link";
import { Button } from "@components/Button";
import axios, { AxiosResponse } from "axios";
import axiosApiInstance from "../services/interceptorService";
import toast from "react-hot-toast";
import { showToast } from "@utils/utils";
import { router } from "next/client";

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const login = (username: string, password: string) => {
    axios
      .post(
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
      )
      .then((response: AxiosResponse) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("expires_in", response.data.expires_in);
        // user with zustand
        axiosApiInstance.get("/user").then((res: AxiosResponse) => {
          useBearStore.setState({ user: res.data });
          showToast("success", "Logged in successfully");
          router.push("/");
        });
      })
      .catch((error) => {
        // if status code is 401, then the user is unauthorized
        if (error.response.status === 401) {
          showToast("error", "Identifiants incorrects");
        } else {
          showToast(
            "error",
            "Une erreur est survenue, merci de réessayer ou de contacter le support"
          );
        }
      });
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
    </div>
  );
};

export default Login;
