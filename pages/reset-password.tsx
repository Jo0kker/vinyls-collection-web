import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { showToast } from "@utils/utils";
import { Button } from "@components/Button";
import { Form, Formik } from "formik";

// token in url, define new password
const resetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const resetPassword = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/password/reset`,
        {
          token: token,
          password: password,
          password_confirmation: passwordConfirm,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: AxiosResponse) => {
        showToast("success", "Mot de passe modifié");
        router.push("/login");
      })
      .catch((error) => {
        showToast("error", "Une erreur est survenue");
      });
  };

  return (
    <div className="pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col">
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-6 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Réinitialisation de mot de passe</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>
      <div className="flex flex-col justify-center items-center lg:mx-32">
        <Formik
          initialValues={{
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            resetPassword();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-password"
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password-confirm"
                  >
                    Confirmer le mot de passe
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-password-confirm"
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <Button type="submit" className="w-full">
                    Modifier le mot de passe
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default resetPassword;
