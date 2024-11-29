import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortAlphaDown, faCalendarDays, faCompactDisc, faXmark } from '@fortawesome/pro-duotone-svg-icons'
import { SortDirection, SortOption } from '../hooks/useCollectionSort'

type CollectionFiltersProps = {
    activeSort: SortOption | null
    direction: SortDirection
    onSortChange: (option: SortOption) => void
    onDirectionChange: (direction: SortDirection) => void
    onReset: () => void
}

export const CollectionFilters = ({ 
    activeSort,
    direction,
    onSortChange,
    onDirectionChange,
    onReset
}: CollectionFiltersProps) => {
    const handleSort = (option: SortOption) => {
        if (activeSort === option) {
            onDirectionChange(direction === 'asc' ? 'desc' : 'asc')
        } else {
            onSortChange(option)
            onDirectionChange('asc')
        }
    }

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => handleSort('alpha')}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors
                    ${activeSort === 'alpha' 
                        ? 'bg-fuchsia-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700'}`}
                title="Tri alphabétique"
            >
                <FontAwesomeIcon icon={faSortAlphaDown} className="w-4 h-4" />
            </button>

            <button
                onClick={() => handleSort('date')}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors
                    ${activeSort === 'date' 
                        ? 'bg-fuchsia-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700'}`}
                title="Tri par date de création"
            >
                <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />
            </button>

            <button
                onClick={() => handleSort('count')}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors
                    ${activeSort === 'count' 
                        ? 'bg-fuchsia-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700'}`}
                title="Tri par nombre de vinyls"
            >
                <FontAwesomeIcon icon={faCompactDisc} className="w-4 h-4" />
            </button>

            {activeSort && (
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                    title="Réinitialiser le tri"
                >
                    <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}
