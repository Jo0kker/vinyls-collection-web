'use client'

import Link from 'next/link'
import { FaKey, FaUserPlus } from 'react-icons/fa'

export function LoginLinks() {
    return (
        <div className="flex flex-col items-center mb-8 space-y-3">
            <Link 
                href="/forgot-password" 
                className="flex items-center gap-2 text-sm text-gray-600 transition-all duration-200 hover:text-fuchsia-600 hover:scale-105"
            >
                <FaKey className="w-4 h-4" />
                Mot de passe oublié ?
            </Link>
            <Link 
                href="/register" 
                className="flex items-center gap-2 text-sm transition-all duration-200 text-fuchsia-600 hover:text-fuchsia-500 hover:scale-105"
            >
                <FaUserPlus className="w-4 h-4" />
                Créer un compte
            </Link>
        </div>
    )
} 