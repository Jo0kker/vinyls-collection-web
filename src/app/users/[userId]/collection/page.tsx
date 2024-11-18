'use client'

import { faArrowRight, faSearch, faSpinner, faXmark } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Combobox } from '@headlessui/react'

import { getCollectionData } from '@/app/users/[userId]/collection/actions/getCollectionData'
import ButtonAddVinyl from '@/app/users/[userId]/collection/components/ButtonAddVinyl'
import { ButtonDeleteCollection } from '@/app/users/[userId]/collection/components/ButtonDeleteCollection'
import { ButtonEditCollection } from '@/app/users/[userId]/collection/components/ButtonEditCollection'
import { ButtonAddCollection } from '@/app/users/[userId]/collection/components/ButtonAddCollection'
import { CollectionLink } from '@/app/users/[userId]/collection/components/CollectionLink'
import ModalItemEdit from '@/app/users/[userId]/collection/components/ModalItemEdit';
import ModalItemView from '@/app/users/[userId]/collection/components/ModalItemView';
import MobileCollectionSelector from '@/app/users/[userId]/collection/components/MobileCollectionSelector'
import { Collection, User } from '@/types'
import { cn } from '@/utils/classNames'
import { fetchAPI } from '@/utils/fetchAPI'
import { fetchUserData } from '@/utils/fetchUserData'
import { useSession } from 'next-auth/react'
import { EmptyList } from './components/EmptyList'
import { VinylItem } from './components/VinylItem'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCollectionSearch } from './hooks/useCollectionSearch'
import { Loading } from '@/assets/lottie/Loading'
import { CollectionFilters } from '@/app/users/[userId]/collection/components/CollectionFilters'
import { useCollectionSort } from './hooks/useCollectionSort'
import ButtonSyncDiscogs from './components/ButtonSyncDiscogs'


const SPECIAL_COLLECTIONS = {
    WISHLIST: -1,
    TRADES: -2
} as const

export type SpecialCollection = {
    id: typeof SPECIAL_COLLECTIONS[keyof typeof SPECIAL_COLLECTIONS]
    name: string
}

export const specialCollections: SpecialCollection[] = [
    { id: SPECIAL_COLLECTIONS.WISHLIST, name: 'Liste de souhaits' },
    { id: SPECIAL_COLLECTIONS.TRADES, name: 'Liste d\'échanges' }
]

export default function CollectionPage() {
    const params = useParams<{ userId: string }>()
    const userId = params?.userId!
    const session = useSession()
    
    // États
    const [selectedCollection, setSelectedCollection] = useState<Collection | SpecialCollection | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [collectionItems, setCollectionItems] = useState<any[]>([])
    const [ownerData, setOwnerData] = useState<User>({} as User)
    const [isLoading, setIsLoading] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    // Hook de tri des collections
    const { 
        activeSort, 
        direction, 
        setActiveSort, 
        setDirection, 
        getSortParams, 
        resetSort 
    } = useCollectionSort()

    // Hook de recherche des collections
    const {
        collections,
        searchQuery,
        setSearchQuery,
        isLoading: isLoadingCollections,
        searchCollections
    } = useCollectionSearch(userId, getSortParams)

    // Calcul des collections à afficher
    const displayedCollections = searchQuery || activeSort
        ? collections 
        : [...specialCollections, ...collections]

    const isOwner = session?.data?.user?.id === parseInt(userId)

    // Chargement des items de la collection sélectionnée
    const loadCollectionItems = async () => {
        if (!selectedCollection) return

        setIsLoading(true)
        try {
            const response = await getCollectionData(
                parseInt(userId),
                selectedCollection.id,
                currentPage
            )
            setCollectionItems(response.data)
        } catch (error) {
            console.error('Erreur lors du chargement des items:', error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        loadCollectionItems()
    }, [selectedCollection, currentPage, refreshTrigger])

    useEffect(() => {
        if (collections.length > 0 && !selectedCollection) {
            // On sélectionne la première collection spéciale (wishlist) par défaut
            setSelectedCollection(specialCollections[0])
        }
    }, [collections])

    return (
        <div className="flex flex-col py-4 mt-4 bg-white rounded">
            {/* Header */}
            <div className="flex flex-row justify-center px-4 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                {isOwner ? (
                    <h1 className="text-emerald-800">Ma collection</h1>
                ) : (
                    <h1 className="text-emerald-800">Collection de {ownerData.name}</h1>
                )}
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            {/* Mobile Collection Selector */}
            <div className="flex flex-col items-center gap-4 mb-6 md:hidden">
                {isOwner && (
                    <div className="w-full max-w-[24rem]">
                        <ButtonAddCollection onSuccess={() => searchCollections(searchQuery, getSortParams())} />
                    </div>
                )}
                <MobileCollectionSelector
                    collections={displayedCollections}
                    selectedCollection={selectedCollection}
                    onSelect={setSelectedCollection}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isLoading={isLoadingCollections}
                    activeSort={activeSort}
                    direction={direction}
                    onSortChange={setActiveSort}
                    onDirectionChange={setDirection}
                    onReset={resetSort}
                />
            </div>

            {/* Desktop Navigation */}
            <div className="flex flex-col md:flex-row md:gap-4">
                <nav className="hidden w-56 gap-2 px-4 overflow-x-auto md:mx-0 md:flex md:flex-col md:p-4 md:border-r md:border-fuchsia-100">
                    {isOwner && <ButtonSyncDiscogs />}
                    {isOwner && <ButtonAddCollection onSuccess={() => searchCollections(searchQuery, getSortParams())} />}
                    
                    {/* Champ de recherche desktop */}
                    <div className="relative mb-4">
                        <Combobox value={selectedCollection} onChange={setSelectedCollection}>
                            <div className="relative w-full">
                                <Combobox.Input
                                    className="w-full py-2 pl-3 pr-16 text-sm border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    displayValue={(collection: Collection | SpecialCollection) => collection?.name ?? ''}
                                    placeholder="Rechercher une collection..."
                                    value={searchQuery}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                            type="button"
                                        >
                                            <FontAwesomeIcon 
                                                icon={faXmark} 
                                                className="w-4 h-4 text-gray-400"
                                            />
                                        </button>
                                    )}
                                    {isLoadingCollections ? (
                                        <FontAwesomeIcon 
                                            icon={faSpinner} 
                                            className="w-4 h-4 text-gray-400 animate-spin"
                                        />
                                    ) : (
                                        <FontAwesomeIcon 
                                            icon={faSearch} 
                                            className="w-4 h-4 text-gray-400"
                                        />
                                    )}
                                </div>
                            </div>
                        </Combobox>
                    </div>

                    {/* Ajout des filtres en version desktop */}
                    <div className="mb-4">
                        <CollectionFilters 
                            activeSort={activeSort}
                            direction={direction}
                            onSortChange={setActiveSort}
                            onDirectionChange={setDirection}
                            onReset={resetSort}
                        />
                    </div>

                    {/* Liste des collections */}
                    {isLoadingCollections ? (
                        <div className="flex items-center justify-center py-4">
                            <Loading className="w-8 opacity-40" />
                        </div>
                    ) : (
                        displayedCollections.map(collection => (
                            <button
                                key={collection.id}
                                onClick={() => setSelectedCollection(collection)}
                                className={`text-left px-4 py-2 rounded flex justify-between items-center ${
                                    selectedCollection?.id === collection.id 
                                    ? 'bg-fuchsia-600 text-white' 
                                    : 'hover:bg-fuchsia-50 text-gray-700 hover:text-fuchsia-900'
                                }`}
                            >
                                {collection.name}
                                {'vinyls_count' in collection && (
                                    <span className="text-xs opacity-60">
                                        {collection.vinyls_count}
                                    </span>
                                )}
                            </button>
                        ))
                    )}
                </nav>

                {/* Collection Content */}
                <div className="flex flex-col flex-1">
                    {isLoading && !selectedCollection ? (
                        <div className="flex items-center justify-center h-[300px]">
                            <Loading className="w-10 opacity-40" />
                        </div>
                    ) : (
                        <>
                            {/* Collection Actions */}
                            {isOwner && selectedCollection && (
                                <div className="flex flex-row justify-end gap-2 mb-4 mr-4">
                                    <ButtonAddVinyl 
                                        collectionId={selectedCollection.id} 
                                        onSuccess={() => {
                                            searchCollections(searchQuery, getSortParams())
                                            loadCollectionItems()
                                        }}
                                    />
                                    {selectedCollection.id > 0 && (
                                        <>
                                            <ButtonEditCollection collection={selectedCollection as Collection} />
                                            <ButtonDeleteCollection
                                                collectionId={selectedCollection.id}
                                                userId={parseInt(userId)}
                                            />
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Collection Items */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-full col-span-full">
                                        <Loading className="w-10 opacity-40" />
                                    </div>
                                ) : collectionItems.length === 0 ? (
                                    <div className="col-span-full">
                                        <EmptyList />
                                    </div>
                                ) : (
                                    collectionItems.map(item => (
                                        <VinylItem
                                            key={item.id}
                                            item={item}
                                            collectionId={selectedCollection?.id}
                                            isOwner={isOwner}
                                            onDelete={() => {
                                                searchCollections(searchQuery, getSortParams())
                                                loadCollectionItems()
                                            }}
                                            onRefresh={loadCollectionItems}
                                        />
                                    ))
                                )}
                            </div>
                            <ModalItemEdit />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
