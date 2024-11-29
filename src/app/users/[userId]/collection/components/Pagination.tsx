import { cn } from '@/utils/classNames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-duotone-svg-icons'

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="flex justify-center gap-2 mt-4 mb-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    "p-2 rounded-lg transition-colors",
                    currentPage === 1 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700"
                )}
            >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        currentPage === page
                            ? "bg-fuchsia-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700"
                    )}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    "p-2 rounded-lg transition-colors",
                    currentPage === totalPages 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700"
                )}
            >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
        </div>
    )
}