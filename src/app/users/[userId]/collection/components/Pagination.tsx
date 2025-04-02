import { cn } from '@/utils/classNames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-duotone-svg-icons'

const PER_PAGE_OPTIONS = [10, 25, 50, 100]

interface PaginationProps {
    currentPage: number
    totalPages: number
    perPage: number
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
}

export const Pagination = ({
    currentPage,
    totalPages,
    perPage,
    onPageChange,
    onPerPageChange
}: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    const visiblePages = pages.slice(startPage - 1, endPage)

    return (
        <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                        'p-2 rounded-full hover:bg-fuchsia-100 transition-colors',
                        currentPage === 1 && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-3 py-1 transition-colors rounded hover:bg-fuchsia-100"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-2">...</span>}
                    </>
                )}

                {visiblePages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            'px-3 py-1 rounded transition-colors',
                            currentPage === page
                                ? 'bg-fuchsia-600 text-white'
                                : 'hover:bg-fuchsia-100'
                        )}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-2">...</span>}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="px-3 py-1 transition-colors rounded hover:bg-fuchsia-100"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                        'p-2 rounded-full hover:bg-fuchsia-100 transition-colors',
                        currentPage === totalPages && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Afficher</span>
                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                    className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                >
                    {PER_PAGE_OPTIONS.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span className="text-sm text-gray-600">par page</span>
            </div>
        </div>
    )
}