import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faSort, 
    faSortAlphaDown, 
    faCalendarDays, 
    faCompactDisc, 
    faXmark,
    faCaretUp,
    faCaretDown
} from '@fortawesome/pro-duotone-svg-icons'
import { SortDirection, SortOption } from '../hooks/useCollectionSort'
import { cn } from '@/utils/classNames'

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

    const renderSortButton = (option: SortOption, icon: any, title: string) => {
        const isActive = activeSort === option
        return (
            <button
                onClick={() => handleSort(option)}
                className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors relative group',
                    isActive
                        ? 'bg-fuchsia-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700'
                )}
                title={title}
            >
                <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                {isActive && (
                    <FontAwesomeIcon 
                        icon={direction === 'asc' ? faCaretUp : faCaretDown} 
                        className={cn(
                            "w-3 h-3 absolute -right-1 -top-1",
                            "bg-white text-fuchsia-600 rounded-full"
                        )}
                    />
                )}
                {!isActive && (
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <FontAwesomeIcon 
                            icon={faCaretUp}
                            className="w-3 h-3 text-gray-600"
                        />
                    </div>
                )}
            </button>
        )
    }

    return (
        <div className="flex flex-wrap gap-2">
            {renderSortButton('alpha', faSortAlphaDown, 'Tri alphabétique')}
            {renderSortButton('date', faCalendarDays, 'Tri par date de création')}
            {renderSortButton('count', faCompactDisc, 'Tri par nombre de vinyls')}

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
