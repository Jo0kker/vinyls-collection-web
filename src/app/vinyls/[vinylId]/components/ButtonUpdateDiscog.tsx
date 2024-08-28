'use client'

import React from 'react'

import { faRotate } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Tooltip } from 'flowbite-react'
import { useParams } from 'next/navigation'

import updateDiscogVinyl from '@/app/vinyls/[vinylId]/actions/updateDiscogVinyl'

const ButtonUpdateDiscog = () => {
    const params = useParams<{ vinylId: string }>()

    const updateDiscog = () => {
        if (params && params.vinylId) {
            updateDiscogVinyl(params.vinylId)
        }
    }

    return (
        <Tooltip content="Voir sur Discogs">
            <Badge color="red" className="text-black" onClick={updateDiscog}>
                <FontAwesomeIcon icon={faRotate} size="xl" />
                <span className="ml-2">Update data</span>
            </Badge>
        </Tooltip>
    )
}

export default ButtonUpdateDiscog
