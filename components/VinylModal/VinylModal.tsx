import React from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCompactDisc } from '@fortawesome/pro-light-svg-icons';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { InputText } from '@components/InputText';
import { Button } from '@components/Button';

type props = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface VinylSearchProps {
  title: string;
  artist: string;
  year: string;
}

export const VinylModal = ({ modalIsOpen, setModalIsOpen }: props) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModalIsOpen}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className=" flex justify-center min-h-full   p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden min-w-[80%] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:min-w-[40%] p-4">
                <header className="flex justify-between">
                  <div className="">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Ajouter un vinyl dans la collection :</h3>
                    <h4 className="text-base font-semibold leading-6 text-fuchsia-500">Test</h4>
                  </div>
                  <button
                    type="button"
                    className="flex justify-center self-start rounded-full text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setModalIsOpen(false)}>
                    <FontAwesomeIcon icon={faCircleXmark} size="2xl" className={'text-indigo-700 '} />
                  </button>
                </header>
                <main className="flex mt-4">
                  <Formik
                    initialValues={{
                      title: '',
                      artist: '',
                      year: '',
                    }}
                    onSubmit={(values: VinylSearchProps, { setSubmitting }: FormikHelpers<VinylSearchProps>) => {
                      setSubmitting(false);
                    }}>
                    <Form className={'flex flex-col justify-center items-center gap-4   w-full'}>
                      <div className={'flex flex-col justify-between items-center gap-2'}>
                        <Field name="email">
                          {({ field, form, meta }: any) => (
                            <InputText
                              field={field}
                              form={form}
                              meta={meta}
                              buildInfo={{
                                label: 'Title :',
                                type: 'title',
                                placeholder: 'title',
                              }}
                              inputClassName={'w-full border-solid border-2 border-indigo-400 p-1'}
                              className={'grid grid-cols-2 gap-3 items-center content-center'}
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
                                label: 'Artist :',
                                type: 'artist',
                                placeholder: 'artist',
                              }}
                              inputClassName={'w-full border-solid border-2 border-indigo-400 p-1'}
                              className={'grid grid-cols-2 gap-3 items-center content-center'}
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
                                label: 'Year :',
                                type: 'year',
                                placeholder: 'year',
                              }}
                              inputClassName={'w-full border-solid border-2 border-indigo-400 p-1'}
                              className={'grid grid-cols-2 gap-3 items-center content-center'}
                            />
                          )}
                        </Field>
                      </div>
                      <Button type={'submit'}>Rechercher</Button>
                    </Form>
                  </Formik>
                </main>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
