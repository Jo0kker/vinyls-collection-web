import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Formik, Form, Field } from 'formik';
import { InputText } from '@components/InputText';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

export default function SlideOvers({
    open,
    setOpen,
    searchVinyl,
    vinyl,
    addVinylToCollection,
}: {
  open: boolean;
  setOpen: any;
  searchVinyl: any;
  vinyl: any;
  addVinylToCollection: any;
}) {
    const [loadingForm, setLoadingForm] = useState(false);

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                          Ajouter un vinyl
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative flex-1 px-4 sm:px-6">
                                                <div className="absolute inset-0 px-4 sm:px-6">
                                                    <Formik
                                                        initialValues={{
                                                            title: '',
                                                            artist: '',
                                                            year: '',
                                                        }}
                                                        onSubmit={(values, { setSubmitting }) => {
                                                            setLoadingForm(true);
                                                            searchVinyl(values).then(() => {
                                                                setLoadingForm(false);
                                                                setSubmitting(false);
                                                            });
                                                        }}
                                                    >
                                                        <Form>
                                                            <Field name="title">
                                                                {({ field, form, meta }: any) => (
                                                                    <InputText
                                                                        field={field}
                                                                        form={form}
                                                                        meta={meta}
                                                                        buildInfo={{
                                                                            label: 'Titre :',
                                                                            type: 'text',
                                                                            placeholder: 'Titre du vinyl',
                                                                        }}
                                                                        className={
                                                                            'flex flex-col lg:flex-row items-center content-center mt-3'
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
                                                                            label: 'Artiste :',
                                                                            type: 'text',
                                                                            placeholder: 'Artiste du vinyl',
                                                                        }}
                                                                        className={
                                                                            'flex flex-col lg:flex-row items-center content-center mt-3'
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
                                                                            label: 'Année :',
                                                                            type: 'number',
                                                                            placeholder: 'Année du vinyl',
                                                                        }}
                                                                        className={
                                                                            'flex flex-col lg:flex-row items-center content-center mt-3'
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                            <div className={'flex justify-center'}>
                                                                <button
                                                                    type="submit"
                                                                    className={
                                                                        'flex flex-col lg:flex-row items-center content-center mt-3 bg-fuchsia-800 text-white px-4 py-2 rounded-md'
                                                                    }
                                                                    disabled={loadingForm}
                                                                >
                                                                    {loadingForm ? (
                                                                        <div className={'animate-spin'}>
                                                                            <FontAwesomeIcon
                                                                                icon={faPlus}
                                                                                className={'h-5 w-5'}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <p className={'text-sm'}>
                                      Rechercher le vinyl
                                                                        </p>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    </Formik>
                                                    <div>
                                                        {vinyl && (
                                                            <div className={'mt-4'}>
                                                                <div className={'flex flex-col gap-2'}>
                                                                    {vinyl.map((v: any) => (
                                                                        <div
                                                                            key={v.id}
                                                                            className={
                                                                                'flex flex-row m-1 border border-gray-300 rounded border-8 hover:bg-gray-400'
                                                                            }
                                                                        >
                                                                            <Image
                                                                                src={v.thumb}
                                                                                alt={v.title}
                                                                                width={100}
                                                                                height={100}
                                                                                className={
                                                                                    'rounded-bl rounded-tl object-cover'
                                                                                }
                                                                            />
                                                                            <div
                                                                                className={
                                                                                    'flex flex-col mx-3 justify-center'
                                                                                }
                                                                            >
                                                                                <h2 className={'text-fuchsia-700'}>
                                                                                    {v.title}
                                                                                </h2>
                                                                                <h3>{v.year}</h3>
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    'flex flex-col mx-3 justify-center items-end flex-grow'
                                                                                }
                                                                            >
                                                                                <button
                                                                                    className={
                                                                                        'bg-fuchsia-700 hover:bg-gray-700 text-white font-bold px-2 rounded'
                                                                                    }
                                                                                    disabled={loadingForm}
                                                                                    onClick={() => {
                                                                                        addVinylToCollection(v.id);
                                                                                    }}
                                                                                >
                                                                                    {loadingForm ? (
                                                                                        <div className={'animate-spin'}>
                                                                                            <FontAwesomeIcon
                                                                                                icon={faPlus}
                                                                                            />
                                                                                        </div>
                                                                                    ) : (
                                                                                        <FontAwesomeIcon icon={faPlus} />
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    );
}
