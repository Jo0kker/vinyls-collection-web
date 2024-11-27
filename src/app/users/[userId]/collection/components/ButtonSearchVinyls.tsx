'use client'

import { Tooltip } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons'

interface ButtonSearchVinylsProps {
    userId: string
    onOpen: () => void
}

export function ButtonSearchVinyls({ userId, onOpen }: ButtonSearchVinylsProps) {
    return (
        <div className="flex items-center">
            <Tooltip content="Recherche avancée">
                <button
                    onClick={onOpen}
                    className="inline-flex items-center p-2 text-white rounded-md bg-fuchsia-700 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" color='white' />
                </button>
            </Tooltip>
        </div>
    )
}