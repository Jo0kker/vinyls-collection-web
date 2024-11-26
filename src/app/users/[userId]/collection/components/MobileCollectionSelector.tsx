import { Combobox } from '@headlessui/react'
import { Collection } from '@/types'
import { SpecialCollection } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner, faXmark, faChevronUp, faChevronDown } from '@fortawesome/pro-duotone-svg-icons'
import { useState } from 'react'
import { SortOption, SortDirection } from '../hooks/useCollectionSort'
import { CollectionFilters } from './CollectionFilters'

type MobileCollectionSelectorProps = {
    collections: (Collection | SpecialCollection)[]
    selectedCollection: Collection | SpecialCollection | null
    onSelect: (collection: Collection | SpecialCollection) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    isLoading: boolean
    activeSort: SortOption | null
    direction: SortDirection
    onSortChange: (option: SortOption) => void
    onDirectionChange: (direction: SortDirection) => void
    onReset: () => void
}

function MobileCollectionSelector({ 
    collections,
    selectedCollection,
    onSelect,
    searchQuery,
    onSearchChange,
    isLoading,
    activeSort,
    direction,
    onSortChange,
    onDirectionChange,
    onReset
}: MobileCollectionSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full px-4 sm:px-6 md:hidden">
            <Combobox value={selectedCollection} onChange={onSelect}>
                <div className="relative w-full max-w-[24rem] mx-auto">
                    <div className="relative flex w-full">
                        <Combobox.Input
                            className="w-full py-3 pl-3 pr-16 text-sm border-gray-300 rounded-l-lg shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            onChange={(event) => onSearchChange(event.target.value)}
                            displayValue={(collection: Collection | SpecialCollection) => collection?.name ?? ''}
                            placeholder="Rechercher une collection..."
                            value={searchQuery}
                            onFocus={() => {
                                onSearchChange('')
                                setIsOpen(true)
                            }}
                        />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                        >
                            <FontAwesomeIcon 
                                icon={isOpen ? faChevronUp : faChevronDown} 
                                className="w-4 h-4 text-gray-400"
                            />
                        </button>
                    </div>

                    {isOpen && (
                        <Combobox.Options static className="absolute z-50 w-full mt-1 overflow-auto text-sm bg-white divide-y divide-gray-100 rounded-md shadow-lg max-h-[80vh] ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="sticky top-0 z-10 p-2 bg-white border-b border-gray-100">
                                <CollectionFilters 
                                    activeSort={activeSort}
                                    direction={direction}
                                    onSortChange={onSortChange}
                                    onDirectionChange={onDirectionChange}
                                    onReset={onReset}
                                />
                            </div>

                            {collections.length === 0 ? (
                                <div className="px-4 py-2.5 text-sm text-gray-500">
                                    Aucune collection trouvée
                                </div>
                            ) : (
                                collections.map((collection) => (
                                    <Combobox.Option
                                        key={collection.id}
                                        value={collection}
                                        className={({ active, selected }) =>
                                            `relative cursor-pointer select-none py-3 pl-3 pr-9 
                                            ${active ? 'bg-fuchsia-50' : ''}
                                            ${selected ? 'bg-fuchsia-100 text-fuchsia-900' : ''}
                                            hover:bg-fuchsia-50 transition-colors duration-150`
                                        }
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {({ selected }) => (
                                            <div className="flex items-center justify-between">
                                                <span className={`block truncate ${selected ? 'font-medium text-fuchsia-800' : 'text-gray-900'}`}>
                                                    {collection.name}
                                                </span>
                                                {'vinyls_count' in collection && (
                                                    <span className="text-xs opacity-60">
                                                        {collection.vinyls_count}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
        </div>
    );
}

export default MobileCollectionSelector