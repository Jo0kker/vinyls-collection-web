'use client'

import { faArrowRight, faSearch, faSpinner, faXmark, faUser } from '@fortawesome/pro-duotone-svg-icons'
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
import ButtonImportDiscogs from './components/ButtonImportDiscogs'
import { ViewStyle } from './types/ViewStyle'
import { ViewStyleButtons } from './components/ViewStyleButtons'
import { useViewStyle } from './hooks/useViewStyle'
import { Pagination } from './components/Pagination'
import { ButtonSearchVinyls } from './components/ButtonSearchVinyls'
import { SearchVinylsModal } from './components/SearchVinylsModal'
import { SPECIAL_COLLECTIONS, SpecialCollection } from './constants';

const specialCollections: SpecialCollection[] = [
    { id: SPECIAL_COLLECTIONS.ALL, name: 'Toutes les collections' },
    { id: SPECIAL_COLLECTIONS.WISHLIST, name: 'Liste de souhaits' },
    { id: SPECIAL_COLLECTIONS.TRADES, name: 'Liste d\'échanges' },
];

export default function CollectionPage() {
    const params = useParams<{ userId: string }>()
    const userId = params?.userId!
    const session = useSession()
    
    // États
    const [selectedCollection, setSelectedCollection] = useState<Collection | SpecialCollection | null>(null)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const [collectionItems, setCollectionItems] = useState<any[]>([])
    const [ownerData, setOwnerData] = useState<User>({} as User)
    const [isLoading, setIsLoading] = useState(true)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const { viewStyle, setViewStyle } = useViewStyle()
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 24
    })

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
    const loadCollectionItems = async (page: number = pagination.currentPage) => {
        if (!selectedCollection) return

        setIsLoading(true)
        try {
            if (selectedCollection.id === SPECIAL_COLLECTIONS.ALL) {
                const response = await fetchAPI('/collectionVinyl/search', {
                    method: 'POST',
                    body: JSON.stringify({
                        search: {
                            scopes: [{ name: "uniqueVinyls" }],
                            includes: [
                                {relation: "vinyl"},
                                {relation: "collection"},
                                {relation: "collection.user"}
                            ],
                            filters: [{field: "user_id", value: parseInt(userId)}],
                            page,
                            per_page: pagination.perPage
                        }
                    })
                })
                setCollectionItems(response.data)
                setPagination({
                    currentPage: response.current_page,
                    totalPages: response.last_page,
                    totalItems: response.total,
                    perPage: response.per_page
                })
            } else {
                const response = await getCollectionData(
                    parseInt(userId),
                    selectedCollection.id,
                    page
                )
                setCollectionItems(response.data)
                setPagination({
                    currentPage: response.current_page,
                    totalPages: response.last_page,
                    totalItems: response.total,
                    perPage: response.per_page
                })
            }
        } catch (error) {
            console.error('Erreur lors du chargement des items:', error)
        }
        setIsLoading(false)
    }

    // Effet pour gérer le changement de collection et la pagination
    useEffect(() => {
        if (selectedCollection) {
            loadCollectionItems(1)
        }
    }, [selectedCollection])

    // Effet pour gérer le changement de page
    useEffect(() => {
        if (selectedCollection && pagination.currentPage > 1) {
            loadCollectionItems(pagination.currentPage)
        }
    }, [pagination.currentPage])

    // Effet pour gérer le rafraîchissement
    useEffect(() => {
        if (selectedCollection) {
            loadCollectionItems(pagination.currentPage)
        }
    }, [refreshTrigger])

    // Effet pour la sélection par défaut
    useEffect(() => {
        if (!selectedCollection && collections.length > 0) {
            setSelectedCollection(specialCollections[0])
        }
    }, [collections])

    // Chargement initial des données utilisateur
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const userData = await fetchUserData(parseInt(userId))
                setOwnerData(userData)
            } catch (error) {
                console.error('Erreur lors du chargement des données utilisateur:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadInitialData()
    }, [userId])

    // Fonction pour changer de collection
    const handleCollectionChange = (collection: Collection | SpecialCollection) => {
        setSelectedCollection(collection)
    }

    // Fonction pour changer de page
    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }))
    }

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
                {isOwner ? (
                    <div className="w-full max-w-[24rem]">
                        <ButtonImportDiscogs onSuccess={() => searchCollections(searchQuery, getSortParams())} />
                        <ButtonAddCollection onSuccess={() => searchCollections(searchQuery, getSortParams())} />
                    </div>
                ) : (
                    <div className="w-full max-w-[24rem]">
                        <Link
                            href={`/users/${userId}`}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Voir le profil
                        </Link>
                    </div>
                )}
                <MobileCollectionSelector
                    collections={displayedCollections}
                    selectedCollection={selectedCollection}
                    onSelect={handleCollectionChange}
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
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden md:flex-row md:gap-4">
                <nav className="flex-shrink-0 hidden w-56 gap-2 px-4 overflow-y-auto md:mx-0 md:flex md:flex-col md:p-4 md:border-r md:border-fuchsia-100">
                    {isOwner ? (
                        <>
                            <ButtonImportDiscogs onSuccess={() => searchCollections(searchQuery, getSortParams())} />
                            <ButtonAddCollection onSuccess={() => searchCollections(searchQuery, getSortParams())} />
                        </>
                    ) : (
                        <Link
                            href={`/users/${userId}`}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Voir le profil
                        </Link>
                    )}
                    
                    {/* Champ de recherche desktop */}
                    <div className="relative mb-4">
                        <Combobox value={selectedCollection} onChange={handleCollectionChange}>
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
                <div className="flex flex-col flex-1 overflow-hidden">
                    {isLoading && !selectedCollection ? (
                        <div className="flex items-center justify-center h-[300px]">
                            <Loading className="w-10 opacity-40" />
                        </div>
                    ) : (
                        <>
                            {/* Collection Actions */}
                            {isOwner && selectedCollection && selectedCollection.id !== SPECIAL_COLLECTIONS.ALL && (
                                <div className="flex flex-row justify-end gap-2 mr-4">
                                    <ButtonAddVinyl 
                                        collectionId={selectedCollection.id} 
                                        onSuccess={() => {
                                            searchCollections(searchQuery, getSortParams())
                                            loadCollectionItems()
                                        }}
                                    />
                                    {selectedCollection.id > 0 && (
                                        <>
                                            <ButtonEditCollection 
                                                collection={selectedCollection as Collection} 
                                                onSuccess={() => searchCollections(searchQuery, getSortParams())}
                                            />
                                            <ButtonDeleteCollection
                                                collectionId={selectedCollection.id}
                                                userId={parseInt(userId)}
                                                onSuccess={() => {
                                                    // Revenir à "Toutes les collections"
                                                    setSelectedCollection(specialCollections[0])
                                                    // Forcer un rechargement des données
                                                    setRefreshTrigger(prev => prev + 1)
                                                    // Rafraîchir la liste des collections
                                                    searchCollections(searchQuery, getSortParams())
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Collection Items */}
                            <div className="flex flex-row items-center justify-between m-1">
                                <div className="flex flex-row items-center gap-2">
                                    <ViewStyleButtons viewStyle={viewStyle} onViewStyleChange={setViewStyle} />
                                </div>
                                <ButtonSearchVinyls 
                                    userId={userId}
                                    onOpen={() => setIsSearchModalOpen(true)}
                                />
                            </div>

                            <div className={cn(
                                'overflow-y-auto p-2',
                                viewStyle === ViewStyle.DETAILS 
                                    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3'
                                    : cn(
                                        'grid gap-3',
                                        viewStyle === ViewStyle.GRID 
                                            ? 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' 
                                            : 'grid-cols-1'
                                    )
                            )}>
                                {isLoading ? (
                                    <div className="col-span-full flex justify-center items-center min-h-[400px]">
                                        <Loading className="w-32 h-32" />
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
                                            viewStyle={viewStyle}
                                        />
                                    ))
                                )}
                            </div>
                            <ModalItemEdit />
                            <ModalItemView />
                            
                            {collectionItems.length > 0 && pagination.totalPages > 1 && (
                                <Pagination
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>    
            </div>
            <SearchVinylsModal
                userId={userId}
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </div>
    )
}
