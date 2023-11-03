'use client'

import React, { useState } from 'react'

import { faPlus } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Tooltip } from 'flowbite-react'

const ButtonAddVinyl = ({ collectionId }: { collectionId: number }) => {
    const [isOpen, setIsOpen] = useState(false)

    const steps = [
        { id: 'Step 1', name: 'Job details', status: 'current' },
        { id: 'Step 2', name: 'Application form', status: 'upcoming' },
        { id: 'Step 3', name: 'Preview', status: 'upcoming' }
    ]

    return (
        <>
            <Tooltip content="Ajouter un vinyls" placement="top" className="mr-1">
                <button
                    className="mr-1 inline-flex items-center rounded-md border px-2 py-2 hover:bg-emerald-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Tooltip>
            <Modal show={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <nav aria-label="Progress">
                        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                            {steps.map(step => (
                                <li key={step.name} className="md:flex-1">
                                    {step.status === 'complete' ? (
                                        <div className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                            <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    ) : step.status === 'current' ? (
                                        <div
                                            className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                                            aria-current="step"
                                        >
                                            <span className="text-sm font-medium text-indigo-600">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    ) : (
                                        <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                            <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
        </>
    )
}

export default ButtonAddVinyl
