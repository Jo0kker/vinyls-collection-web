'use client'

import { useState } from 'react'

import { faCircleCheck, faInfo, faXmark } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie, setCookie } from 'cookies-next'
import { Modal } from 'flowbite-react'

import { cn } from '@/utils/classNames'

export default function HelperModal() {
    let initialShowHelper = true
    const helperModalCookie = getCookie('helperModal')

    if (helperModalCookie === 'false') {
        initialShowHelper = false
    }
    const [openModal, setOpenModal] = useState(initialShowHelper)
    const [showHelper, setShowHelper] = useState(true)

    const showModal = () => {
        setOpenModal(true)
    }

    const hideHelperModal = (e: any) => {
        e.stopPropagation()
        setShowHelper(false)
        setCookie('helperModal', 'false')
    }

    const iconCheck = () => {
        return <FontAwesomeIcon icon={faCircleCheck} color="green" className="mr-2" />
    }

    return (
        <>
            <div
                className={cn('fixed bottom-24 right-8 z-20 m-4 md:bottom-8 md:right-10')}
                hidden={!showHelper}
            >
                <button
                    onClick={showModal}
                    className="absolute flex h-8 w-8 items-center justify-center rounded-full border-2 border-fuchsia-500 border-opacity-30 bg-white shadow-xl shadow-fuchsia-500/50 md:h-10 md:w-10"
                >
                    <FontAwesomeIcon icon={faInfo} color="black" />
                </button>
                <button
                    onClick={hideHelperModal}
                    className="absolute -right-9 -top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-red-500 border-opacity-30 bg-white shadow-xl shadow-red-500/50 md:-right-12 md:-top-3 md:h-6 md:w-6"
                >
                    <FontAwesomeIcon icon={faXmark} color="black" />
                </button>
            </div>
            <Modal
                dismissible
                show={openModal}
                onClose={() => {
                    setOpenModal(false)
                    setCookie('helperModal', 'false')
                }}
            >
                <Modal.Header>Bienvenue sur Vinyls-collection!</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col items-center">
                        <p className="mb-4 text-center text-gray-700">
                            Créez votre collection de Vinyls en ligne
                        </p>
                        <ul className="list-inside text-gray-700">
                            <li>
                                {iconCheck()}
                                Créez facilement et rapidement votre collection en ligne.
                            </li>
                            <li>
                                {iconCheck()}
                                Indiquez les Vinyls que vous recherchez.
                            </li>
                            <li>
                                {iconCheck()}
                                Visualisez en un coup d'oeil votre collection.
                            </li>
                            <li>
                                {iconCheck()}
                                Mettez à jour votre collection au fil de vos trouvailles.
                            </li>
                            <li>
                                {iconCheck()}
                                Imprimez votre collection ou vos recherches.
                            </li>
                            <li>
                                {iconCheck()}
                                Consultez les collections des autres collectionneurs.
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
