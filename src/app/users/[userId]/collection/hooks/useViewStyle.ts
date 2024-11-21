'use client'

import { useState, useEffect } from 'react'
import { ViewStyle } from '../types/ViewStyle'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'preferred_view_style'

export const useViewStyle = () => {
    const [viewStyle, setViewStyle] = useState<ViewStyle>(ViewStyle.LIST)

    useEffect(() => {
        // Récupérer le style sauvegardé dans les cookies au chargement
        const savedStyle = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${COOKIE_NAME}=`))
            ?.split('=')[1] as ViewStyle

        if (savedStyle && Object.values(ViewStyle).includes(savedStyle)) {
            setViewStyle(savedStyle)
        }
    }, [])

    const updateViewStyle = (newStyle: ViewStyle) => {
        setViewStyle(newStyle)
        // Sauvegarder dans les cookies avec une expiration de 365 jours
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 365)
        document.cookie = `${COOKIE_NAME}=${newStyle}; expires=${expirationDate.toUTCString()}; path=/`
    }

    return {
        viewStyle,
        setViewStyle: updateViewStyle
    }
}