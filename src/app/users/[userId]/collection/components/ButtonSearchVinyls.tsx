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
        <Tooltip content="Recherche avancée">
            <button
                onClick={onOpen}
                className="inline-flex items-center px-2 py-2 mr-1 border rounded-md hover:bg-fuchsia-600 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2"
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </Tooltip>
    )
}