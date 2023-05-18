import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-light-svg-icons";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { InputText } from "@components/InputText";
import { Button } from "@components/Button";

const FormSearch = ({ modalIsOpen, setModalIsOpen }: FormSearchProps) => {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h3 className="font-semibold leading-6 text-gray-900">
            Ajouter un vinyl dans la collection :
          </h3>
          <h4 className="font-semibold text-fuchsia-800 ml-3">Test</h4>
        </div>
        <button
          type="button"
          className="flex justify-center self-start rounded-full text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setModalIsOpen(false)}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="2xl"
            className={"text-indigo-700 "}
          />
        </button>
      </header>
      <main className="flex mt-4">
        <Formik
          initialValues={{
            title: "",
            artist: "",
            year: "",
          }}
          onSubmit={(
            values: VinylSearchProps,
            { setSubmitting }: FormikHelpers<VinylSearchProps>
          ) => {
            setSubmitting(false);
          }}
        >
          <Form
            className={
              "flex flex-col justify-center items-center gap-4  w-full"
            }
          >
            <div className={"flex flex-col justify-between items-center gap-2"}>
              <Field name="email">
                {({ field, form, meta }: any) => (
                  <InputText
                    field={field}
                    form={form}
                    meta={meta}
                    buildInfo={{
                      label: "Title :",
                      type: "title",
                      placeholder: "",
                    }}
                    inputClassName={"w-full border-2 p-1 px-3"}
                    className={
                      "grid grid-cols-2 gap-3 items-center content-center"
                    }
                  />
                )}
              </Field>
              <Field name="artist">
                {({ field, form, meta }: any) => (
                  <InputText
                    field={field}
                    form={form}
                    meta={meta}
                    buildInfo={{
                      label: "Artiste :",
                      type: "artist",
                      placeholder: "",
                    }}
                    inputClassName={"w-full border-2 p-1 px-3"}
                    className={
                      "grid grid-cols-2 gap-3 items-center content-center"
                    }
                  />
                )}
              </Field>
              <Field name="year">
                {({ field, form, meta }: any) => (
                  <InputText
                    field={field}
                    form={form}
                    meta={meta}
                    buildInfo={{
                      label: "Année :",
                      type: "year",
                      placeholder: "",
                    }}
                    inputClassName={"w-full border-2 p-1 px-3"}
                    className={
                      "grid grid-cols-2 gap-3 items-center content-center"
                    }
                  />
                )}
              </Field>
            </div>
            <Button type={"submit"}>Rechercher</Button>
          </Form>
        </Formik>
      </main>
    </>
  );
};

type FormSearchProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface VinylSearchProps {
  title: string;
  artist: string;
  year: string;
}
export default FormSearch;
