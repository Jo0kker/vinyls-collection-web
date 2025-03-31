import { faUser, faEnvelope, faPhone, faCalendar, faCompactDisc, faMusic, faQuoteLeft } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'

type UserPageProps = {
    params: {
        userId: string
    }
}

export default async function UserPage({ params }: UserPageProps) {
    const { data: users } = await fetchAPI('/users/search', {
        method: 'POST',
        body: JSON.stringify({
            search: {
                filters: [
                    {
                        field: "id",
                        operator: "=",
                        value: parseInt(params.userId)
                    }
                ]
            }
        })
    })

    const user = users[0]

    return (
        <div className="flex flex-col px-4 py-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-4 mb-4 text-2xl font-bold">
                <span className="mr-3 text-fuchsia-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Profil de {user.name}</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center gap-8">
                {/* Photo de profil */}
                <div className="relative w-48 h-48">
                    <Image
                        src={prefixImage(user.avatar)}
                        alt={user.name}
                        fill
                        className="object-cover rounded-full"
                    />
                </div>

                {/* Informations principales */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                        <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-fuchsia-500" />
                        <div>
                            <p className="text-sm text-gray-500">Nom complet</p>
                            <p className="font-medium">{user.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-fuchsia-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>

                    {user.phone && (
                        <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                            <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-fuchsia-500" />
                            <div>
                                <p className="text-sm text-gray-500">Téléphone</p>
                                <p className="font-medium">{user.phone}</p>
                            </div>
                        </div>
                    )}

                    {user.birth_date && (
                        <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                            <FontAwesomeIcon icon={faCalendar} className="w-6 h-6 text-fuchsia-500" />
                            <div>
                                <p className="text-sm text-gray-500">Date de naissance</p>
                                <p className="font-medium">{new Date(user.birth_date).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </div>
                    )}

                    {user.audio_equipment && (
                        <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                            <FontAwesomeIcon icon={faMusic} className="w-6 h-6 text-fuchsia-500" />
                            <div>
                                <p className="text-sm text-gray-500">Équipement audio</p>
                                <p className="font-medium">{user.audio_equipment}</p>
                            </div>
                        </div>
                    )}

                    {user.influence && (
                        <div className="flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                            <FontAwesomeIcon icon={faCompactDisc} className="w-6 h-6 text-fuchsia-500" />
                            <div>
                                <p className="text-sm text-gray-500">Influence</p>
                                <p className="font-medium">{user.influence}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Description */}
                {user.description && (
                    <div className="w-full p-6 bg-white border rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5 text-fuchsia-500" />
                            <h2 className="text-lg font-medium text-gray-900">À propos</h2>
                        </div>
                        <p className="text-gray-600 whitespace-pre-line">{user.description}</p>
                    </div>
                )}

                {/* Bouton vers la collection */}
                <Link 
                    href={`/users/${user.id}/collection`}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-fuchsia-600 border border-transparent rounded-md shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                >
                    <FontAwesomeIcon icon={faCompactDisc} className="mr-2" />
                    Voir sa collection
                </Link>
            </div>
        </div>
    )
} 