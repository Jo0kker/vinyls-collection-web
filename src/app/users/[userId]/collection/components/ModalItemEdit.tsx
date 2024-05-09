'use client'


import { Modal } from 'flowbite-react';

import { Button } from '@/components/atom/Button'
import { InputText } from '@/components/atom/InputText'
import useModalStore from '@/store/modalStore';

const ModalItemEdit = () => {
    const { isModalOpen, modalData, closeModal } = useModalStore();

    return (
        <>
            {modalData && (
                <Modal show={isModalOpen} onClose={closeModal}>
                    <Modal.Header>{modalData.vinyl.title}</Modal.Header>
                    <Modal.Body>
                        <h3>
                            Vous pouvez spécifier des informations propres à votre exemplaire
                        </h3>
                        <InputText value={modalData.description ?? ''} name="description" label="Description" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeModal}>I accept</Button>
                        <Button color="gray" onClick={closeModal}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default ModalItemEdit
