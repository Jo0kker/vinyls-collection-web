'use client'

import React, { useEffect, useState } from 'react'

import { Modal } from 'flowbite-react';
import { useSession } from 'next-auth/react'
import { FilePond, registerPlugin } from 'react-filepond';

import updateSearch from '@/app/users/[userId]/collection/[collectionId]/actions/updateSearch'
import updateTrade from '@/app/users/[userId]/collection/[collectionId]/actions/updateTrade'
import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import useModalStore from '@/store/modalStore';

const ModalItemEdit = () => {
    const { isModalOpen, modalData, collectionType, closeModal } = useModalStore();
    const [description, setDescription] = useState<string>(modalData?.description || '')
    const session = useSession()
    
    
    useEffect(() => {
        setDescription(modalData?.description || '')
    }, [modalData])



    /**
     * For the collectionType
     * -1: Wishlist (Recherches)
     * -2: Trades (Échanges)
     * other: Collection
     */
    const save = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (!modalData) {
            return
        }

        // Save the data
        switch (collectionType) {
            case '-1':
                await updateSearch(modalData.id, {
                    description,
                })
                break
            case '-2':
                await updateTrade(modalData.id, {
                    description,
                })
                break
            default:
                console.log('updateCollection')
                // await updateCollection(modalData.id, {})
                break

        }


        closeModal()
    }

    return (
        <>
            {modalData && (
                <Modal show={isModalOpen} onClose={closeModal}>
                    <Modal.Header>{modalData.vinyl.title}</Modal.Header>
                    <Modal.Body>
                        <h3 className="mb-3">
                            Vous pouvez spécifier des informations propres à votre exemplaire
                        </h3>
                        <InputText
                            value={description}
                            setValue={setDescription}
                            name="description"
                            label="Description"
                            className="mb-3"
                        />
                        {collectionType !== '-1' && (
                            <FilePond
                                allowMultiple={true}
                                maxFiles={3}
                                server={{
                                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                        const formData = new FormData();
                                        formData.append(fieldName, file, file.name);

                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process`, {
                                            method: 'POST',
                                            headers: {
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            },
                                            body: formData,
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                load(data);
                                            })
                                            .catch(err => error(err.message));
                                    },
                                    revert: (uniqueFileId, load, error) => {
                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revert`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            },
                                            body: JSON.stringify({ id: uniqueFileId })
                                        })
                                            .then(response => {
                                                if (response.ok) {
                                                    load();
                                                } else {
                                                    error('Failed to delete the file.');
                                                }
                                            })
                                            .catch(err => error(err.message));
                                    },
                                    restore: (uniqueFileId, load, error) => {
                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restore`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            },
                                            body: JSON.stringify({ id: uniqueFileId })
                                        })
                                            .then(response => {
                                                if (!response.ok) {
                                                    throw new Error('Network response was not ok');
                                                }
                                                return response.blob();
                                            })
                                            .then(blob => {
                                                // Créer un objet File à partir du Blob
                                                const file = new File([blob], 'restored_file', { type: blob.type });
                                                load(file);
                                            })
                                            .catch(err => error(err.message));
                                    },
                                    load: (source, load, error, progress, abort, headers) => {
                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/load/${source}`, {
                                            method: 'GET',
                                            headers: {
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            }
                                        })
                                            .then(response => {
                                                if (!response.ok) {
                                                    throw new Error('Failed to load the file');
                                                }
                                                return response.blob();
                                            })
                                            .then(blob => {
                                                load(blob);
                                            })
                                            .catch(err => {
                                                error(err.message);
                                            });
                                    },
                                    fetch: (url, load, error, progress, abort, headers) => {
                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch`, {
                                            method: 'GET',
                                            headers: {
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            },
                                        })
                                            .then(response => response.blob())
                                            .then(blob => {
                                                load(blob);
                                            })
                                            .catch(err => error(err.message));
                                    }
                                }}
                            />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-between w-full">
                            <Button onClick={closeModal} className="mr-2">
                                Annuler
                            </Button>
                            <Button onClick={save} className="mb-1 rounded-md bg-fuchsia-900 px-1 py-2 text-white hover:bg-opacity-80">
                                Enregistrer
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default ModalItemEdit
