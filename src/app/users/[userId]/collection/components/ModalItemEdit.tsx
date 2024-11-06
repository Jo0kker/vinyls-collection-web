'use client'

import React, { useEffect, useState } from 'react'

// eslint-disable-next-line import/default
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// eslint-disable-next-line import/default
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// eslint-disable-next-line import/default
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// eslint-disable-next-line import/default
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { Modal } from 'flowbite-react';
import { useSession } from 'next-auth/react'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


import updateCollectionVinyl from '@/app/users/[userId]/collection/actions/updateCollectionVinyl'
import updateSearch from '@/app/users/[userId]/collection/actions/updateSearch'
import updateTrade from '@/app/users/[userId]/collection/actions/updateTrade'
import revalidateCacheClient from '@/components/actions/revalidateCacheClient'
import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import useModalItemEditStore from '@/store/modalItemEditStore';
import { on } from 'events';
// Enregistrer le plugin
registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateType,
);

const ModalItemEdit = () => {
    const { isModalOpen, modalData, collectionType, closeModal, onRefresh } = useModalItemEditStore();
    const [description, setDescription] = useState<string>(modalData?.description || '')
    const [imageIds, setImageIds] = useState<number[]>([])
    const [files, setFiles] = useState<any[]>([])
    const session = useSession()
    
    
    useEffect(() => {
        setDescription(modalData?.description || '')
        if (modalData && 'media' in modalData && modalData?.media) {
            const initialFiles = modalData.media.map((media) => ({
                source: media.file_name,
                options: {
                    type: 'local',
                    metadata: {
                        id: media.id
                    }
                }
            }));
            setFiles(initialFiles);
        }
    }, [modalData])

    const refresh = async () => {
        switch (collectionType) {
            case '-1':
                await revalidateCacheClient({ tag: 'searchVinyls' })
                break
            case '-2':
                await revalidateCacheClient({ tag: 'tradeVinyls' })
                break
            default:
                await revalidateCacheClient({ tag: 'collectionVinyl' })
                break
        }
    }


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
                await updateTrade(modalData.id, { description })
                break
            default:
                await updateCollectionVinyl(modalData.id, {
                    description,
                })
                break

        }
        processClose()
    }

    const processClose = () => {
        setImageIds([])
        setFiles([])
        refresh()
        if (onRefresh) onRefresh()
        closeModal()
    }

    return (
        <>
            {modalData && (
                <Modal show={isModalOpen} onClose={processClose}>
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
                            inputClassName="border-gray-200"
                            className="mb-3"
                        />
                        {collectionType !== '-1' && (
                            <FilePond
                                files={files}
                                onupdatefiles={setFiles}
                                allowMultiple={true}
                                maxFiles={3}
                                allowRevert={false}
                                credits={false}
                                acceptedFileTypes={['image/png', 'image/jpeg']}
                                fileValidateTypeDetectType={(source, type) => new Promise((resolve, reject) => {
                                    // Custom file type detection
                                    resolve(type);
                                })}
                                server={{
                                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                                        if (modalData?.id === undefined) {
                                            return
                                        }

                                        const formData = new FormData();
                                        formData.append(fieldName, file, file.name);
                                        if (collectionType === '-2') {
                                            formData.append('model_type', 'App\\Models\\Trade');
                                        } else {
                                            formData.append('model_type', 'App\\Models\\CollectionVinyl');
                                        }
                                        formData.append('model_id', modalData?.id.toString());

                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/process`, {
                                            method: 'POST',
                                            headers: {
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            },
                                            body: formData,
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                setImageIds([...imageIds, data.id])
                                                load(data.id);
                                            })
                                            .catch(err => error(err.message));

                                    },
                                    load: (source, load, error, progress, abort, headers) => {
                                        fetch(source).then(response => {
                                            if (!response.ok) {
                                                throw new Error('Failed to load the file');
                                            }
                                            return response.blob();
                                        }).then(blob => {
                                            const filename = source.split('/').pop();
                                            const file = new File([blob], filename, { type: blob.type });
                                            load(file);
                                        }).catch(err => {
                                            error(err.message);
                                        })
                                    },
                                    revert: (uniqueFileId, load, error) => {
                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/revert`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                            },
                                            body: JSON.stringify({ id: uniqueFileId })
                                        })
                                            .then(response => {
                                                if (response.ok) {
                                                    const NumberUniqueFileId = parseInt(uniqueFileId)
                                                    const newImageIds = imageIds.filter(id => id !== NumberUniqueFileId)
                                                    setImageIds(newImageIds)
                                                    load();
                                                } else {
                                                    error('Failed to delete the file.');
                                                }
                                            })
                                            .catch(err => error(err.message));
                                    },
                                    restore: (uniqueFileId, load, error) => {
                                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/restore`, {
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
                                    // fetch: (url, load, error, progress, abort, headers) => {
                                    //     console.log('fetch')
                                    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/fetch`, {
                                    //         method: 'GET',
                                    //         headers: {
                                    //             'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                    //         },
                                    //     })
                                    //         .then(response => response.blob())
                                    //         .then(blob => {
                                    //             load(blob);
                                    //         })
                                    //         .catch(err => error(err.message));
                                    // }
                                }}
                                onremovefile={(error, file) => {
                                    if (error) {
                                        throw new Error(error.body);
                                    }
                                    const newFiles = files.filter(f => f.source !== file.serverId);
                                    setFiles(newFiles);

                                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/delete`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + session.data?.user?.access_token,
                                        },
                                        body: JSON.stringify({ file_name: file.source })
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                if (typeof file.source === 'string') {
                                                    const NumberSource = parseInt(file.source)
                                                    const newImageIds = imageIds.filter(id => id !== NumberSource)
                                                    setImageIds(newImageIds)
                                                }
                                            } else {
                                                throw new Error('Failed to delete the file.');
                                            }

                                        })
                                        .catch(err => {
                                            throw new Error(err.message);
                                        });
                                }}
                            />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-between w-full">
                            <Button onClick={processClose} className="mr-2">
                                Annuler
                            </Button>
                            <Button onClick={save} className="px-1 py-2 mb-1 text-white rounded-md bg-fuchsia-900 hover:bg-opacity-80">
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
