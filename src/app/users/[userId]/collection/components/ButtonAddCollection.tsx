'use client'

import { useState } from 'react'

import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'flowbite-react'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'

import addCollection from '@/app/users/[userId]/collection/actions/addCollection'
import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import { showToast } from '@/utils/toast'

type ButtonAddCollectionProps = {
    onSuccess?: () => void;
}

export function ButtonAddCollection({ onSuccess }: ButtonAddCollectionProps) {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsOpenModal(true)}
                className="flex flex-row items-center justify-center gap-2"
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>Ajouter une collection</span>
            </Button>
            <Modal show={isOpenModal} size="md" popup onClose={() => setIsOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <Formik
                        initialValues={{
                            collectionName: '',
                            collectionDescription: ''
                        }}
                        validationSchema={Yup.object({
                            collectionName: Yup.string().required(
                                'Le nom de la collection est requis'
                            )
                        })}
                        onSubmit={values => {
                            addCollection(values.collectionName)
                                .then(() => {
                                    showToast({
                                        type: 'success',
                                        message: 'Collection créée avec succès'
                                    })
                                    setIsOpenModal(false)
                                    onSuccess?.()
                                })
                                .catch((error) => {
                                    showToast({
                                        type: 'error',
                                        message: (() => {
                                            const errorMessage = JSON.parse(error.message).message
                                            if (errorMessage === 'The mutate.0.attributes.name has already been taken.') {
                                                return 'Une collection avec ce nom existe déjà'
                                            }
                                            return errorMessage
                                        })()
                                    })
                                })
                        }}
                    >
                        {formik => (
                            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Créer une collection
                                </h3>
                                <InputText
                                    value={formik.values.collectionName}
                                    formikOnChange={formik.handleChange}
                                    name="collectionName"
                                    label="Nom de la collection"
                                    required={true}
                                    inputClassName="border-gray-300 dark:border-gray-700"
                                />
                                <ErrorMessage name="collectionName" />
                                <Button className="w-full" type="submit">
                                    Créer
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}
